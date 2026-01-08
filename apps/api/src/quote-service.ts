import type {
  ApprovedOffer,
  DeclinedOffer,
  Lender,
  Offer,
  QuoteRequest,
} from "./types.ts";

export function calculateMonthlyPayment(
  principal: number,
  aprPercent: number,
  termMonths: number,
): number {
  if (aprPercent === 0) {
    return principal / termMonths;
  }

  const monthlyRate = aprPercent / 12 / 100;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, termMonths);
  const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  return Math.round(monthlyPayment * 100) / 100;
}

export function evaluateLender(request: QuoteRequest, lender: Lender): Offer {
  const declineReasons: string[] = [];

  for (const rule of lender.rules) {
    switch (rule.type) {
      case "maxAmount":
        if (request.amount > (rule.value as number)) {
          declineReasons.push(rule.reasonCode);
        }
        break;

      case "allowedCreditBands":
        if (!(rule.value as string[]).includes(request.creditBand)) {
          declineReasons.push(rule.reasonCode);
        }
        break;

      case "disallowedProcedures":
        if ((rule.value as string[]).includes(request.procedure)) {
          declineReasons.push(rule.reasonCode);
        }
        break;

      case "allowedStates":
        if (!(rule.value as string[]).includes(request.state)) {
          declineReasons.push(rule.reasonCode);
        }
        break;
    }
  }

  if (declineReasons.length > 0) {
    const declined: DeclinedOffer = {
      lender: lender.name,
      approved: false,
      reasonCodes: declineReasons,
    };
    return declined;
  }

  const apr = lender.aprByCreditBand[request.creditBand];


  if (apr === undefined) {
    const declined: DeclinedOffer = {
      lender: lender.name,
      approved: false,
      reasonCodes: ["DECLINE_CREDIT"],
    };
    return declined;
  }

  const monthlyPayment = calculateMonthlyPayment(
    request.amount,
    apr,
    lender.termMonths,
  );

  const approved: ApprovedOffer = {
    lender: lender.name,
    approved: true,
    apr,
    termMonths: lender.termMonths,
    monthlyPayment,
    reasonCodes: lender.successReasonCodes,
  };

  return approved;
}
