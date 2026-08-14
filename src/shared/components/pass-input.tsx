"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type"
> {
  hasError?: boolean;
  startIcon?: React.ReactNode;
  containerClassName?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  {
    className,
    containerClassName,
    hasError = false,
    disabled,
    startIcon,
    placeholder = "Enter your password",
    ...props
  },
  ref,
) {
  const [isVisible, setIsVisible] = React.useState(false);

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
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        disabled={disabled}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        className={cn(
          "shrink-0 rounded-sm text-slate-400 transition-colors",
          "hover:text-slate-600 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-slate-400",
          "disabled:cursor-not-allowed",
        )}
      >
        {isVisible ? (
          <EyeOff className="size-4" aria-hidden="true" />
        ) : (
          <Eye className="size-4" aria-hidden="true" />
        )}
      </button>
      <input
        dir="ltr"
        ref={ref}
        type={isVisible ? "text" : "password"}
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
      {startIcon ?? (
        <Lock className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
      )}
    </div>
  );
});
