import { Star } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

const POINTS = [5, 10, 15, 20];

export function PointsSelect({ currentQuestion }: { currentQuestion: number }) {
  const { control } = useFormContext();

  return (
    <Field>
      <FieldLabel className="flex items-center gap-2 font-bold text-navy">
        <Star className="size-4 text-main" />
        النقاط
      </FieldLabel>

      <Controller
        name={`questions.${currentQuestion}.points`}
        control={control}
        defaultValue={5}
        render={({ field }) => (
          <Select
            value={String(field.value ?? 5)}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <SelectTrigger
              ref={field.ref}
              onBlur={field.onBlur}
              className="h-14 w-full rounded-2xl border-border text-base text-navy shadow-sm"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {POINTS.map((p) => (
                <SelectItem key={p} value={String(p)} className="text-base">
                  {p} نقاط
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}
