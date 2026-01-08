import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { evaluateLender } from "./quote-service.js";
import {
  ErrorResponseSchema,
  QuoteRequestSchema,
  QuoteResponseSchema,
} from "./schemas.js";
import type {
  LendersConfig,
  QuoteRequest,
  QuoteResponse,
  ErrorResponse,
} from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  await app.register(rateLimit, { global: true, max: 60, timeWindow: 1000 });

  let lendersConfig: LendersConfig;
  try {
    const lendersPath = join(__dirname, "..", "lenders.json");
    const lendersData = await readFile(lendersPath, "utf-8");
    lendersConfig = JSON.parse(lendersData);
    app.log.info(
      `Loaded ${lendersConfig.lenders.length} lenders from configuration`,
    );
  } catch (error) {
    app.log.error({ err: error }, "Failed to load lenders.json");
    process.exit(1);
  }

  app.post<{ Body: QuoteRequest; Reply: QuoteResponse | ErrorResponse }>(
    "/quote",
    {
      schema: {
        body: QuoteRequestSchema,
        response: {
          200: QuoteResponseSchema,
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const quoteRequest: QuoteRequest = {
        amount: request.body.amount,
        creditBand: request.body.creditBand,
        state: request.body.state.toUpperCase(),
        procedure: request.body.procedure.toLowerCase(),
      };

      try {
        const offers = lendersConfig.lenders.map((lender) =>
          evaluateLender(quoteRequest, lender),
        );

        const response: QuoteResponse = {
          offers,
        };

        return reply.send(response);
      } catch (error) {
        app.log.error({ err: error }, "Error processing quote");
        return reply.status(500).send({
          error: "Internal server error",
          message: "Failed to process quote request",
        });
      }
    },
  );

  return app;
}

if (process.argv[1] === __filename) {
  try {
    const app = await buildServer();
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
