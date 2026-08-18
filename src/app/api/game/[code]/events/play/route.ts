import { prisma } from "@/lib/prisma_client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const getGameSession = async () => {
        const session = await prisma.gameSession.findUnique({
          where: { code: Number(code) },
          select: {
            questionStartedAt: true,
            currentQuestion: true,
            players: true,
            answers: true,
            id: true,
            quiz: {
              select: {
                id: true,
                title: true,

                questions: {
                  orderBy: {
                    order: "asc",
                  },
                  select: {
                    id: true,
                    text: true,
                    timeLimitSec: true,
                    points: true,
                    order: true,

                    options: {
                      select: {
                        id: true,
                        text: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        const currentQuestion =
          session?.quiz.questions[session.currentQuestion];
        if (session && currentQuestion) {
          const startedAt = new Date(session?.questionStartedAt!).getTime();
          const now = Date.now();

          const elapsed = now - startedAt;
          const questionTime = currentQuestion.timeLimitSec * 1000;
          const remainingTime = Math.max(
            Math.ceil((questionTime - elapsed) / 1000),
            0,
          );

          const data = {
            id: session.id,
            answersCount: session.answers.length,
            players: session.players,
            quiz: {
              id: session.quiz.id,
              title: session.quiz.title,
            },

            numberOfQuestions: session?.quiz.questions.length,
            isQuizEnded:
              session?.quiz.questions.length - 1 === session.currentQuestion &&
              remainingTime === 0,
            currentQuestion: {
              index: session.currentQuestion,
              id: currentQuestion.id,
              text: currentQuestion.text,
              timeLimitSec: currentQuestion.timeLimitSec,
              points: currentQuestion.points,

              options: currentQuestion.options.map((option) => ({
                id: option.id,
                text: option.text,
              })),
            },

            timer: {
              remainingTime,
              isTimeUp: remainingTime === 0,
            },
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        }
      };

      await getGameSession();

      const interval = setInterval(() => {
        getGameSession();
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
