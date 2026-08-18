"use server";

import { prisma } from "../prisma_client";

export async function AnswerQuestionAction(
  playerId: string,
  questionId: string,
  optionId: string | null,
  sessionId: string,
) {
  try {
    const answer = await prisma.answer.upsert({
      where: {
        playerId_questionId_sessionId: {
          playerId,
          questionId,
          sessionId,
        },
      },

      create: {
        playerId,
        questionId,
        optionId,
        sessionId,
      },

      update: {
        optionId,
      },
    });
    return answer;
  } catch (err) {
    throw new Error("حدث خطاء في الخادم");
  }
}
