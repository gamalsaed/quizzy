// _components/header/quiz-title-input.tsx
"use client";

import { useRef } from "react";
import { Pencil } from "lucide-react";
import { useFormContext, useFormState } from "react-hook-form";
import type { QuizFormValues } from "@/lib/schema/quiz.schema";

export function QuizTitleInput() {
  // Form Context
  const { register, control } = useFormContext<QuizFormValues>();

  // Form State
  const { errors } = useFormState({ control, name: "title" });

  // useRef
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full max-w-md">
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5
          shadow-sm transition-colors
          focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100
          ${errors.title ? "border-red-400" : "border-slate-200"}`}
      >
        <input
          {...register("title")}
          aria-label="عنوان الاختبار"
          aria-invalid={!!errors.title}
          placeholder="اسم الاختبار"
          className="min-w-0 flex-1 bg-transparent text-center text-base font-semibold
                     text-slate-800 outline-none
                     placeholder:font-normal placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.select()}
          aria-label="تعديل الاسم"
          className="shrink-0 rounded-md p-1 text-slate-400 transition-colors
                     hover:bg-slate-50 hover:text-violet-600"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      {errors.title && (
        <p className="mt-1 text-center text-xs text-red-600">
          {errors.title.message}
        </p>
      )}
    </div>
  );
}
