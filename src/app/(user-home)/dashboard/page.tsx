import { DashboardHeader } from "./_components/dashboard-header";
import { CreateQuizCard } from "./_components/create-quiz-card";
import { prisma } from "@/lib/prisma_client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { QuizCard } from "./_components/quiz-card";

export default async function page() {
  const session = await getServerSession(authOptions);
  const quizes = await prisma.quiz.findMany({
    where: { userId: session?.user.id },
    include: {
      questions: true,
    },
  });

  return (
    <div className="p-0 m-0">
      <div className=" h-dvh  p-4  rounded-3xl max-h-dvh overflow-hidden  relative z-10">
        <DashboardHeader />
        <div
          className="bg-card mb-24 px-6 h-[calc(100%-80px)] overflow-auto no-scrollbar rounded-b-3xl py-3
             border-border grid gap-5 content-start
             grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]"
          dir="ltr"
        >
          <CreateQuizCard />
          {quizes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionsCount={quiz.questions.length}
              createdAt={quiz.createdAt}
              updatedAt={quiz.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
