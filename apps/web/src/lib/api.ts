import type {
  QuoteRequest,
  QuoteResponse,
  ErrorResponse,
} from "../types/quote";
import { API_CONFIG } from "./constants";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: ErrorResponse,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends ApiError {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, response: ErrorResponse) {
    super(message, 400, response);
    this.name = "ValidationError";
  }
}

const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || "http://localhost:3000";
};
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new NetworkError("Request timeout. Please try again.");
    }
    throw error;
  }
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchQuote(
  request: QuoteRequest,
): Promise<QuoteResponse> {
  const url = `${getApiBaseUrl()}/quote`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= API_CONFIG.retryAttempts; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, API_CONFIG.timeout);
      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;

        if (response.status === 400) {
          throw new ValidationError(
            errorData.message || "Invalid request",
            errorData,
          );
        }

        if (response.status >= 500) {
          throw new ApiError(
            "Server error. Please try again later.",
            response.status,
            errorData,
          );
        }

        throw new ApiError(
          errorData.message || "Request failed",
          response.status,
          errorData,
        );
      }

      const data = (await response.json()) as QuoteResponse;
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");

      if (error instanceof ValidationError) {
        throw error;
      }

      if (attempt < API_CONFIG.retryAttempts) {
        console.warn(
          `Request failed (attempt ${attempt + 1}), retrying...`,
          error,
        );
        await sleep(API_CONFIG.retryDelay);
        continue;
      }
    }
  }

  if (lastError) {
    if (lastError instanceof NetworkError) {
      throw new NetworkError(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
    throw lastError;
  }

  throw new NetworkError("Request failed. Please try again.");
}
