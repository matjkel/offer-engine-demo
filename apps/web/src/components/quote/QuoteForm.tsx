import { useAppForm } from "@/hooks/form";
import { useStore } from "@tanstack/react-form";
import {
  AMOUNT_CONFIG,
  CREDIT_BAND_OPTIONS,
  PROCEDURE_OPTIONS,
  US_STATES,
} from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertCircle } from "lucide-react";
import { QuoteFormData, quoteFormSchema } from "@/lib/validation";
interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function QuoteForm({
  onSubmit,
  isLoading = false,
  error = null,
}: QuoteFormProps) {
  const form = useAppForm({
    defaultValues: {
      amount: AMOUNT_CONFIG.default,
      creditBand: "",
      state: "",
      procedure: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = quoteFormSchema.safeParse(value);
        if (!result.success) {
          return "Please correct the errors above";
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value as QuoteFormData);
      } catch (err) {
        console.error("Form submission error:", err);
      }
    },
  });

  const isDirty = useStore(form.store, (state) => state.isDirty);

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <form.AppField
          name="amount"
          children={(field) => (
            <field.SliderField
              label="Amount"
              min={AMOUNT_CONFIG.min}
              max={AMOUNT_CONFIG.max}
              step={AMOUNT_CONFIG.step}
            />
          )}
        />
        <form.AppField name="creditBand">
          {(field) => (
            <field.SelectField
              label="Credit Score"
              required
              options={CREDIT_BAND_OPTIONS}
              type="string"
            />
          )}
        </form.AppField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form.AppField name="state">
            {(field) => (
              <field.SelectField
                label="State"
                required
                type="string"
                options={US_STATES}
              />
            )}
          </form.AppField>
          <form.AppField name="procedure">
            {(field) => (
              <field.SelectField
                label="Procedure"
                required
                options={PROCEDURE_OPTIONS}
                type="string"
              />
            )}
          </form.AppField>
        </div>

        <div className="pt-4">
          <form.AppForm>
            <form.SubmitButton
              label="Get Financing Offers"
              disabled={isLoading || !isDirty}
              className="w-full text-lg py-6"
            />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}
