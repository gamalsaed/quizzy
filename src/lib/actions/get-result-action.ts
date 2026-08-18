"use server";

import { prisma } from "../prisma_client";

export async function getResultAction(code: string, id: string | undefined) {
  try {
    const result = await prisma.gameSession.findFirst({
      where: {
        code: Number(code),

        OR: [
          {
            hostId: id,
          },
          {
            players: {
              some: {
                id: id,
              },
            },
          },
        ],
      },

      include: {
        quiz: {
          include: {
            questions: {
              orderBy: {
                order: "asc",
              },
              include: {
                options: {
                  orderBy: {
                    order: "asc",
                  },
                },
              },
            },
          },
        },

        players: {
          include: {
            answers: {
              include: {
                option: true,
                question: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    throw new Error("حدث خطاء في الخادم");
  }
}
