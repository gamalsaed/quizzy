import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ error: "البريد الالكتروني غير صالح" }),
  password: z.string().min(1, {error: "برجاء ادخال كلمة المرور"}),
  rememberMe: z.boolean().optional(),
});

export type LoginType = z.infer<typeof loginSchema>;
