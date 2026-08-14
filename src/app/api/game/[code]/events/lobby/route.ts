import { prisma } from "@/lib/prisma_client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendPlayers = async () => {
        const session = await prisma.gameSession.findUnique({
          where: {
            code: Number(code),
          },
          select: {
            players: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        const data = {
          players: session?.players ?? [],
        };

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
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
