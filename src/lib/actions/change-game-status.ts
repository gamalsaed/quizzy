"use server";

import { prisma } from "../prisma_client";

export async function ChangeGameStatusAction(
  code: string,
  status: "RUNNING" | "LOBBY" | "FINISHED",
) {
  try {
    const updatedSession = await prisma.gameSession.update({
      where: { code: Number(code) },
      data: {
        status: status,
      },
    });
    return updatedSession;
  } catch (err) {
    throw new Error("حدث خطاء في الخادم");
  }
}
