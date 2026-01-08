import { useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Loader2 } from "lucide-react";

import { useFieldContext, useFormContext } from "@/hooks/form-context";
import { useState } from "react";

export interface SubmitButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  label,
  className,
  disabled,
}: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.canSubmit]}
      children={([isSubmitting, canSubmit]) => (
        <Button
          disabled={isSubmitting || !canSubmit || disabled}
          type="submit"
          className={className}
        >
          {label}
          {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      )}
    />
  );
};

export type SelectFieldProps<TType extends "string" | "number" = "string"> = {
  label: string;
  options: readonly {
    value: TType extends "string" ? string : number;
    label: string;
  }[];
  type: TType;
  required?: boolean;
};

export const SelectField = <TType extends "string" | "number" = "string">({
  label,
  options,
  required,
  type,
}: SelectFieldProps<TType>) => {
  const field = useFieldContext<string | number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        value={field.state.value?.toString() ?? ""}
        onValueChange={(value: string) => {
          field.handleChange(type === "number" ? Number(value) : value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select a ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={`${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {field.state.meta.isTouched && errors.length > 0 && (
        <p className="text-sm text-red-600">{errors.join(", ")}</p>
      )}
    </div>
  );
};

export const SliderField = ({
  label,
  min,
  max,
  step,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
}) => {
  const field = useFieldContext<number>();
  const [sliderValue, setSliderValue] = useState([field.state.value]);
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={field.name} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
        <span className="text-lg font-bold text-indigo-600">
          ${field.state.value.toLocaleString()}
        </span>
      </div>
      <Slider
        value={sliderValue}
        onValueChange={(value: number[]) => {
          setSliderValue(value);
          field.handleChange(value[0] ?? min);
        }}
        min={min}
        max={max}
        step={step}
        className="py-4"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>${min.toLocaleString()}</span>
        <span>${max.toLocaleString()}</span>
      </div>
      {field.state.meta.isTouched && errors.length > 0 && (
        <p className="text-sm text-red-600">{errors.join(", ")}</p>
      )}
    </div>
  );
};
