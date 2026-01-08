import { useState } from "react";
import type { Offer } from "@/types/quote";
import { OfferCard } from "./OfferCard";
import { Button } from "../ui/Button";
import { ArrowUpDown } from "lucide-react";
import { LoadingResults } from "./LoadingResults";

interface OfferResultsProps {
  offers: Offer[];
  isLoading?: boolean;
}

type SortOption = "default" | "apr" | "payment";

export function OfferResults({ offers, isLoading = false }: OfferResultsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const approvedOffers = offers.filter((offer) => offer.approved);
  const declinedOffers = offers.filter((offer) => !offer.approved);

  const sortedApprovedOffers = [...approvedOffers].sort((a, b) => {
    if (!a.approved || !b.approved) return 0;

    if (sortBy === "apr") {
      return a.apr - b.apr;
    }
    if (sortBy === "payment") {
      return a.monthlyPayment - b.monthlyPayment;
    }
    return 0;
  });

  if (isLoading) {
    return <LoadingResults />;
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-lg font-medium">No results yet</p>
        <p className="text-sm mt-2">
          Fill out the form and submit to see financing offers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {approvedOffers.length > 1 && (
        <div className="flex gap-2 items-center justify-end">
          <span className="text-sm text-slate-600">Sort by:</span>
          <Button
            variant={sortBy === "default" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("default")}
          >
            Default
          </Button>
          <Button
            variant={sortBy === "apr" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("apr")}
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            APR
          </Button>
          <Button
            variant={sortBy === "payment" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("payment")}
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Payment
          </Button>
        </div>
      )}

      {approvedOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-700">
            Approved Offers ({approvedOffers.length})
          </h2>
          <div className="space-y-4">
            {sortedApprovedOffers.map((offer) => (
              <OfferCard key={offer.lender} offer={offer} />
            ))}
          </div>
        </div>
      )}

      {declinedOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-700">
            Declined Offers ({declinedOffers.length})
          </h2>
          <div className="space-y-4">
            {declinedOffers.map((offer) => (
              <OfferCard key={offer.lender} offer={offer} />
            ))}
          </div>
        </div>
      )}

      {approvedOffers.length === 0 && declinedOffers.length > 0 && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-lg font-medium">No approved offers available</p>
          <p className="text-sm mt-2">
            Try adjusting your criteria to see more options
          </p>
        </div>
      )}
    </div>
  );
}
