import { createFormHook } from "@tanstack/react-form";

import {
  SelectField,
  SubmitButton,
  SliderField,
} from "@/components/FormComponents";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    SelectField,
    SliderField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
