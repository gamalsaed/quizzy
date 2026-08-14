"use client";

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export interface AddQuestionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function AddQuestionButton({
  label = "إضافة سؤال",
  className,

  ...props
}: AddQuestionButtonProps) {
  return (
    <button
      type="button"
      dir="rtl"
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-main/50 bg-transparent p-4 text-sm font-semibold text-main transition-colors",
        "hover:border-main hover:bg-main/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Plus className="size-4" strokeWidth={2.5} />
      {label}
    </button>
  );
}
