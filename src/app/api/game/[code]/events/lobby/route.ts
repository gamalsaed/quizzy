import { prisma } from "@/lib/prisma_client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let oldState = "";
      const sendPlayers = async () => {
        const session = await prisma.gameSession.findUnique({
          where: {
            code: Number(code),
          },
          select: {
            status: true,
            players: {
              select: {
                id: true,
                name: true,
              },
            },
            quiz: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        let newState = JSON.stringify(session);

        const data = {
          players: session?.players ?? [],
          hoster: session?.quiz.user.name ?? null,
          status: session?.status ?? null,
        };

        if (newState !== oldState) {
          oldState = newState;
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        }
      };

      await sendPlayers();

      const interval = setInterval(() => {
        sendPlayers();
      }, 1000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
