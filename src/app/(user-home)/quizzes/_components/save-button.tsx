// save-button.tsx
"use client";

import { Play } from "lucide-react";
import { useFormContext, useFormState } from "react-hook-form";
import type { QuizFormValues } from "@/lib/schema/quiz.schema";

export function SaveButton({ isPending }: { isPending: boolean }) {
  // Form Context
  const { control } = useFormContext<QuizFormValues>();

  // Form State
  const { isDirty, isSubmitting } = useFormState({ control });

  return (
    <button
      type="submit"
      disabled={!isDirty || isSubmitting || isPending}
      className="flex items-center gap-2 rounded-xl border border-slate-200
                 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700
                 transition-colors hover:border-violet-300 hover:text-violet-700
                 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Play className="h-4 w-4" />
      {isSubmitting || isPending ? "جاري الحفظ…" : "حفظ"}
    </button>
  );
}
