import { z } from "zod";
import { AMOUNT_CONFIG } from "./constants";

export const quoteFormSchema = z.object({
  amount: z
    .number()
    .min(
      AMOUNT_CONFIG.min,
      `Amount must be at least $${AMOUNT_CONFIG.min.toLocaleString()}`,
    )
    .max(
      AMOUNT_CONFIG.max,
      `Amount must not exceed $${AMOUNT_CONFIG.max.toLocaleString()}`,
    ),
  creditBand: z.enum(["A", "B", "C", "D"], {
    message: "Please select a credit band",
  }),
  state: z.string().length(2, "Please select a state"),
  procedure: z.enum(["general", "implants", "ortho"], {
    message: "Please select a procedure",
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
