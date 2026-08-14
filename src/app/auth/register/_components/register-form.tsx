"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, signUpType } from "@/lib/schema/signup.schema";
import { useSignUp } from "@/lib/Hooks/use-signup";

import { Mail, User } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { MainInput } from "@/shared/components/main-input";
import { PasswordInput } from "@/shared/components/pass-input";

export default function RegisterForm() {
  // useSignUp => Custom hook
  const { mutate, isPending, error } = useSignUp();

  // React Hook Form
  const { register, handleSubmit, formState } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
  });

  // Form Handler
  const submithandler = (data: signUpType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submithandler)}>
      <FieldGroup>
        <Field>
          <FieldLabel className="text-navy font-bold" dir="ltr">
            الاسم
          </FieldLabel>
          <MainInput
            hasError={formState.errors.name && true}
            {...register("name")}
            placeholder="ادخل اسمك"
            Icon={User}
          />
          <FieldError className="text-left">
            {formState.errors.name?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel className="text-navy font-bold" dir="ltr">
            البريد الالكتروني
          </FieldLabel>
          <MainInput
            hasError={formState.errors.email && true}
            {...register("email")}
            placeholder="ادخل بريدك الالكتروني"
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
            {...register("password")}
            placeholder="ادخل كلمة المرور"
          />
          <FieldError className="text-left">
            {formState.errors.password?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel className="text-navy font-bold" dir="ltr">
            تأكيد كلمة المرور
          </FieldLabel>
          <PasswordInput
            {...register("rePassword")}
            placeholder="اعد ادخال كلمة المرور"
          />
          <FieldError className="text-left">
            {formState.errors.rePassword?.message}
          </FieldError>
        </Field>
      </FieldGroup>

      <Button className="my-5" type="submit" disabled={isPending}>
        {isPending ? "جاري انشاء الحساب..." : "انشاء حساب"}
      </Button>
      {error && (
        <div className="text-destructive text-center">
          {error.message || "حدث خطأ، برجاء المحاولة مرة اخرى"}
        </div>
      )}

      <div className="mt-5 text-center">
        <span>لديك حساب بالفعل؟ </span>
        <Link href="/auth/login" className="text-main">
          <span>تسجيل الدخول</span>
        </Link>
      </div>
    </form>
  );
}
