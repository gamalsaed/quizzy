"use client";

import { X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface QuestionItemProps {
  index: number;
  title: string;
  isActive: boolean;
  hasError?: boolean;
  onSelect: (index: number) => void;
}

export function QuestionItem({
  index,
  title,
  isActive,
  hasError = false,
  onSelect,
}: QuestionItemProps) {
  const { control } = useFormContext();
  const { remove, fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div
      dir="rtl"
      className={cn(
        "flex items-center gap-2 rounded-xl border bg-card p-2 transition-colors",
        isActive
          ? "border-main bg-main/5 shadow-sm"
          : "border-border hover:border-muted-foreground/25 hover:bg-accent/40",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-current={isActive ? "true" : undefined}
        className="flex min-w-0 flex-1 text-white items-center gap-2 rounded-lg p-2 text-right outline-none  focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Question Number */}
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums transition-colors",
            isActive
              ? "bg-main text-main-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {index + 1}
        </span>

        {hasError && (
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full bg-destructive"
          />
        )}

        <span
          className={cn(
            "line-clamp-2 min-w-0 flex-1 text-sm leading-relaxed",
            isActive ? "font-medium text-foreground" : "text-muted-foreground",
          )}
        >
          {title}
        </span>
      </button>

      <button
        type="button"
        onClick={() => fields.length > 1 && remove(index)}
        className=" rounded-md p-1.5 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-red-500 cursor-pointer"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
