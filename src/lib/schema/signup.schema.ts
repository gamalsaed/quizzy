import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(6, {
      error: "ادخل اسمك الكامل",
    }),

    email: z.string().email({
      error: "البريد الالكتروني غير صالح",
    }),

    password: z
      .string()
      .min(8, {
        error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      })
      .regex(/[a-z]/, {
        error: "كلمة المرور يجب أن تحتوي على حرف صغير",
      })
      .regex(/[A-Z]/, {
        error: "كلمة المرور يجب أن تحتوي على حرف كبير",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        error: "كلمة المرور يجب أن تحتوي على رمز خاص",
      }),

    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["rePassword"],
  });

export type signUpType = z.infer<typeof signUpSchema>;
