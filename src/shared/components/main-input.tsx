"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type"
> {
  hasError?: boolean;
  Icon: LucideIcon;
  containerClassName?: string;
}

export const MainInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      containerClassName,
      hasError = false,
      disabled,
      Icon,
      placeholder = "Enter your password",
      ...props
    },
    ref,
  ) {
    return (
      <div
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "flex h-11 w-full items-center gap-2 rounded-lg border bg-white px-3",
          "border-slate-200 transition-colors",
          "focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200",
          hasError &&
            "border-red-400 focus-within:border-red-500 focus-within:ring-red-100",
          disabled && "cursor-not-allowed bg-slate-50 opacity-60",
          containerClassName,
        )}
      >
        <input
          ref={ref}
          dir="ltr"
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="current-password"
          className={cn(
            "h-full w-full bg-transparent text-sm text-slate-900 outline-none",
            "placeholder:text-slate-400 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        <Icon className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
      </div>
    );
  },
);
