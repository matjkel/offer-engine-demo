import type { CreditBand } from "../types/quote";

export const CREDIT_BAND_OPTIONS = [
  {
    value: "A" as CreditBand,
    label: "Excellent (720-850)",
    ficoRange: "720-850",
  },
  { value: "B" as CreditBand, label: "Good (660-719)", ficoRange: "660-719" },
  { value: "C" as CreditBand, label: "Fair (620-659)", ficoRange: "620-659" },
  { value: "D" as CreditBand, label: "Poor (300-619)", ficoRange: "300-619" },
] as const;

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const;

export const PROCEDURE_OPTIONS = [
  { value: "general", label: "General Dentistry" },
  { value: "implants", label: "Dental Implants" },
  { value: "ortho", label: "Orthodontics" },
] as const;

export const AMOUNT_CONFIG = {
  min: 1000,
  max: 50000,
  step: 500,
  default: 10000,
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retryAttempts: 1,
  retryDelay: 1000,
} as const;

export const REASON_CODE_LABELS: Record<string, string> = {
  OK_AMOUNT: "Amount Approved",
  OK_CREDIT: "Credit Approved",
  OK_PROCEDURE: "Procedure Approved",
  OK_STATE: "State Approved",
  DECLINE_AMOUNT: "Amount Too High",
  DECLINE_CREDIT: "Credit Not Qualified",
  DECLINE_PROCEDURE: "Procedure Not Covered",
  DECLINE_STATE: "State Not Serviced",
} as const;
