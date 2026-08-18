"use server";

import { prisma } from "@/lib/prisma_client";
import { redirect } from "next/navigation";

function generateGameCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function createGameSessionAction(quizId: string, hostId: string) {
  let code = generateGameCode();

  let existingSession = await prisma.gameSession.findUnique({
    where: { code },
  });

  while (existingSession) {
    code = generateGameCode();

    existingSession = await prisma.gameSession.findUnique({
      where: { code },
    });
  }

  const gameSession = await prisma.gameSession.create({
    data: {
      quizId,
      code,
      hostId,
    },
  });

  redirect(`/host/${gameSession.code}`);
}
