"use server";

import { prisma } from "@/lib/prisma_client";

export async function getPlayerSessionAction(playerId: string) {
  const sessions = await prisma.gameSession.findMany({
    where: { players: { some: { id: playerId } } },
  });
  if (!sessions) {
    return [];
  }
  const statuses = sessions.map((session) => session.status) || [];

  if (statuses?.includes("LOBBY")) {
    return sessions[statuses.indexOf("LOBBY")];
  }

  return undefined;
}
