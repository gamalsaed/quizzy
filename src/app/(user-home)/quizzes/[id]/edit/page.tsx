import { prisma } from "@/lib/prisma_client";
import QuizForm from "../../_components/quiz-form";
import { updateQuizAction } from "@/lib/actions/update-quiz.action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },

    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
  return (
    <QuizForm
      defaultValues={{
        title: quiz?.title || "",
        id: quiz?.id || "",
        questions: quiz?.questions || [],
      }}
      action={updateQuizAction}
    />
  );
}
