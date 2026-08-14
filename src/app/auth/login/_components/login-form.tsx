"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginType } from "@/lib/schema/login.schema";
import { useLogin } from "@/lib/Hooks/use-login";

import { Mail } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { MainInput } from "@/shared/components/main-input";
import { PasswordInput } from "@/shared/components/pass-input";

export default function LoginForm() {
  // useLogin => Custom Hook
  const { mutate, isPending, error } = useLogin();

  // React Hook Form
  const { register, handleSubmit, formState, control } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form Handler
  const submithandler = (data: LoginType) => {
    mutate({ email: data.email, password: data.password });
    if (!error) localStorage.setItem("rememberMe", `${data.rememberMe}`);
  };

  return (
    <form onSubmit={handleSubmit(submithandler)}>
      <FieldGroup>
        <Field>
          <FieldLabel className="text-navy font-bold" dir="ltr">
            البريد الالكتروني
          </FieldLabel>
          <MainInput
            hasError={formState.errors.email && true}
            {...register("email")}
            placeholder="ادخل بريك الالكتروني"
            Icon={Mail}
          />
          <FieldError className="text-left">
            {formState.errors.email?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel className="text-navy font-bold" dir="ltr">
            كلمة المرور
          </FieldLabel>
          <PasswordInput
            hasError={formState.errors.password && true}
            {...register("password")}
            placeholder="ادخل كلمة المرور"
          />
          <FieldError className="text-left">
            {formState.errors.email?.message}
          </FieldError>
        </Field>
      </FieldGroup>
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => {
          return (
            <div className="flex items-center gap-2 mt-5" dir="ltr">
              <Checkbox
                id="rememberMe"
                onCheckedChange={field.onChange}
                checked={field.value}
              />
              <label htmlFor="rememberMe">تذكرني</label>
            </div>
          );
        }}
      />

      <Button className="my-5" type="submit" disabled={isPending}>
        {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>
      {error && (
        <span className=" text-destructive">
          خطاء في البريد الالكتروني او كلمة المرور
        </span>
      )}

      <div className="mt-5 text-center">
        <span>ليس لديك حساب؟ </span>
        <Link href="/auth/register" className="text-main">
          <span>انشاء حساب</span>
        </Link>
      </div>
    </form>
  );
}
