"use server";

import { prisma } from "../prisma_client";
import { QuizFormValues, quizSchema } from "../schema/quiz.schema";
export async function createQuizAction(data: QuizFormValues, userId: string) {
  // Validation
  const parsed = quizSchema.safeParse(data);

  if (!parsed.success) throw new Error("بيانات غير صالحة");

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        userId,

        questions: {
          create: data.questions.map((question, questionIndex) => ({
            text: question.text,
            timeLimitSec: question.timeLimitSec,
            points: question.points,
            order: questionIndex,

            options: {
              create: question.options.map((option, optionIndex) => ({
                text: option.text,
                isCorrect: option.isCorrect,
                order: optionIndex,
              })),
            },
          })),
        },
      },
    });
    return quiz;
  } catch (err) {
    throw new Error("خطاء في الخادم حاول مرة اخري لاحقا");
  }
}
