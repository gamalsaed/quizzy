import { Clock } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

const DURATIONS = [20, 30, 40, 50, 60];

export function DurationSelect({
  currentQuestion,
}: {
  currentQuestion: number;
}) {
  const { control } = useFormContext();

  return (
    <Field>
      <FieldLabel className="flex items-center gap-2 font-bold text-navy">
        <Clock className="size-4 text-main" />
        المدة
      </FieldLabel>

      <Controller
        name={`questions.${currentQuestion}.timeLimitSec`}
        control={control}
        defaultValue={20}
        render={({ field }) => (
          <Select
            value={String(field.value ?? 20)}
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
              {DURATIONS.map((d) => (
                <SelectItem key={d} value={String(d)} className="text-base">
                  {d} ثانية
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}
