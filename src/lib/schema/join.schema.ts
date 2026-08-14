import { z } from "zod";

export const joinSchema = z.object({
  code: z
    .string()
    .length(4, "الكود لازم يكون 4 أرقام")
    .regex(/^\d+$/, "أرقام فقط"),
});

export type JoinType = z.infer<typeof joinSchema>;
