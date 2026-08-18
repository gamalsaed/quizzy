"use client";

import { joinSchema, JoinType } from "@/lib/schema/join.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJoin } from "@/lib/Hooks/use-join";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getClientToken } from "@/lib/get-client-token";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function JoinForm() {
  const { mutate, isPending, error } = useJoin();
  const searchParams = useSearchParams();
  const searchCode = searchParams.get("code");
  const userSession = useSession();
  const { control, handleSubmit, formState } = useForm<JoinType>({
    resolver: zodResolver(joinSchema),
    defaultValues: { code: searchCode || "", clientToken: getClientToken() },
  });

  const hasError = !!formState.errors.code || !!error;

  const submithandler = (data: JoinType) => {
    const clientToken = getClientToken();

    mutate({ code: data.code, clientToken });
  };

  useEffect(() => {
    const clientToken = getClientToken();
    if (searchCode && !userSession) mutate({ code: searchCode, clientToken });
  }, [searchCode]);

  return (
    <form onSubmit={handleSubmit(submithandler)} className="mt-10">
      <Field>
        <div className="flex max-sm:flex-col items-center gap-4" dir="ltr">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={4}
                value={field.value}
                onChange={field.onChange}
                onComplete={handleSubmit(submithandler)}
                disabled={isPending}
                containerClassName={hasError ? "animate-shake" : ""}
              >
                <InputOTPGroup className="gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className={`h-20 w-20 max-sm:h-14 max-sm:w-14 rounded-2xl border-2 text-4xl max-sm:text-2xl font-bold shadow-sm ${
                        hasError ? "border-destructive" : "border-input"
                      }`}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="h-20 max-w-52 max-sm:h-16 rounded-2xl px-8 text-2xl font-bold"
          >
            {isPending ? "جاري الدخول..." : "دخول"}
            <ArrowLeft className="mr-2 size-5" />
          </Button>
        </div>

        {hasError && (
          <div className="mt-3 flex items-center justify-center gap-2 text-destructive">
            <AlertCircle className="size-4" />
            <span>{formState.errors.code?.message ?? "الكود ده مش موجود"}</span>
          </div>
        )}
      </Field>
    </form>
  );
}
