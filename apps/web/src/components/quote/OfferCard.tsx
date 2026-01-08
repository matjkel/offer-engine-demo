import type { Offer } from "@/types/quote";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";
import { ReasonCodeBadge } from "./ReasonCodeBadge";

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  if (offer.approved) {
    return (
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-shrink-0">
              <div className="text-sm font-medium text-slate-500 mb-1">Lender</div>
              <div className="text-2xl font-bold text-slate-900">{offer.lender}</div>
            </div>
            <div className="flex gap-8 flex-wrap">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">APR</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {offer.apr}%
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Term</div>
                <div className="text-3xl font-bold text-slate-900">
                  {offer.termMonths}
                  <span className="text-lg font-normal text-slate-500 ml-1">months</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Monthly Payment
                </div>
                <div className="text-4xl font-bold text-green-600">
                  $
                  {offer.monthlyPayment.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-green-200">
            {offer.reasonCodes.map((code) => (
              <ReasonCodeBadge key={code} code={code} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-200 bg-red-50/30">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-shrink-0">
            <div className="text-sm font-medium text-slate-500 mb-1">Lender</div>
            <div className="text-2xl font-bold text-slate-900">{offer.lender}</div>
            <div className="text-sm font-semibold text-red-600 mt-1">Not Approved</div>
          </div>

          <div className="flex-1">
            <div className="text-sm font-medium text-slate-500 mb-2">
              Reason{offer.reasonCodes.length > 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap gap-2">
              {offer.reasonCodes.map((code) => (
                <ReasonCodeBadge key={code} code={code} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
