"use server";

import { prisma } from "../prisma_client";

export async function NextQuestionAction(code: string) {
  try {
    const session = await prisma.gameSession.findUnique({
      where: { code: Number(code) },
      select: {
        currentQuestion: true,
        quiz: {
          select: {
            questions: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!session) {
      throw new Error("الجلسة غير موجودة");
    }

    const nextQuestion = session.currentQuestion + 1;
    const isLastQuestion = nextQuestion >= session.quiz.questions.length;
    if (isLastQuestion) return;
    const updatedSession = await prisma.gameSession.update({
      where: { code: Number(code) },
      data: {
        currentQuestion: nextQuestion,
        questionStartedAt: new Date(),
      },
    });

    return updatedSession;
  } catch (err) {
    throw new Error("حدث خطاء في الخادم");
  }
}
