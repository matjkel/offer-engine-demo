import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuoteForm } from "../components/quote/QuoteForm";
import { OfferResults } from "../components/quote/OfferResults";
import { fetchQuote, NetworkError, ValidationError } from "../lib/api";
import type { QuoteFormData } from "../lib/validation";
import type { QuoteResponse } from "../types/quote";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
});

function QuotePage() {
  const [results, setResults] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: QuoteFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchQuote({
        amount: data.amount,
        creditBand: data.creditBand,
        state: data.state,
        procedure: data.procedure,
      });

      setResults(response);
    } catch (err) {
      console.error("Quote request failed:", err);

      if (err instanceof NetworkError) {
        setError(err.message);
      } else if (err instanceof ValidationError) {
        setError(`Validation error: ${err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Dental Financing Quote Engine
          </h1>
          <p className="text-lg text-slate-600">
            Get instant financing offers from multiple lenders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Your Information
              </h2>
              <QuoteForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Financing Offers
              </h2>
              <OfferResults
                offers={results?.offers || []}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-slate-500">
          <p>Results are estimates and subject to lender approval</p>
        </div>
      </div>
    </div>
  );
}
