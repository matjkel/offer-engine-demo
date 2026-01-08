export type CreditBand = "A" | "B" | "C" | "D";

export interface QuoteRequest {
  amount: number;
  creditBand: CreditBand;
  state: string;
  procedure: string;
}

export interface ApprovedOffer {
  lender: string;
  approved: true;
  apr: number;
  termMonths: number;
  monthlyPayment: number;
  reasonCodes: string[];
}

export interface DeclinedOffer {
  lender: string;
  approved: false;
  reasonCodes: string[];
}

export type Offer = ApprovedOffer | DeclinedOffer;

export interface QuoteResponse {
  offers: Offer[];
}

export interface ErrorResponse {
  error: string;
  message: string;
}
