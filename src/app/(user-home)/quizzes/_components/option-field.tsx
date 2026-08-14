"use client";

import { Input } from "@/components/ui/input";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";

interface MyInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  index: number;
  isCorrect: boolean;
  currentQuestion: number;
  handleCorrection: (index: number) => void;
}

export const FieldOption = forwardRef<HTMLInputElement, MyInputProps>(
  (
    { label, isCorrect, currentQuestion, handleCorrection, index, ...props },
    ref,
  ) => {
    return (
      <Field
        className={cn(
          "border rounded-2xl hover:bg-green-50 transition-colors duration-200 cursor-pointer p-4",
          isCorrect === true && "bg-green-100",
        )}
        onClick={() => handleCorrection(index)}
      >
        <FieldLabel>{label}</FieldLabel>
        <Input ref={ref} {...props} />
      </Field>
    );
  },
);
