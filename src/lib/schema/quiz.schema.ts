// lib/schemas/quiz.ts
import { z } from "zod";

export const optionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "نص الخيار مطلوب"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "يجب إدخال نص السؤال"),
  options: z.array(optionSchema).min(2, "يجب إضافة خيارين إجابة على الأقل"),
  timeLimitSec: z.number().int().positive(),
  points: z.number().int().positive(),
});

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "يجب إدخال عنوان الاختبار"),
  questions: z.array(questionSchema).min(1, "يجب إضافة سؤال واحد على الأقل"),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;
export type OptionFormValues = z.infer<typeof optionSchema>;
