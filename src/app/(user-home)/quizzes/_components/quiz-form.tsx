"use client";

import { useForm, FormProvider } from "react-hook-form";
import { QuizFormValues, quizSchema } from "@/lib/schema/quiz.schema";
import QuizHeader from "./quiz-header";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionForm from "./question-form";
import { useState } from "react";
import { QuestionList } from "./question-list";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createQuizAction } from "@/lib/actions/create-quiz.action";

export default function QuizForm({
  defaultValues,
  action,
}: {
  defaultValues: QuizFormValues;
  action: (data: QuizFormValues, id: string) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // Session
  const { data: session } = useSession();

  // Router
  const router = useRouter();

  // React Hook Form
  const Form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues,
  });

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: QuizFormValues) => {
      if (!session?.user?.id) throw new Error("UNAUTHENTICATED");
      return action(data, session.user.id);
    },
    onSuccess: () => {
      router.replace("/dashboard");
    },
  });

  // Form Handler
  const onSubmit = (data: QuizFormValues) => mutate(data);
  const handleSelect = (index: number) => {
    setCurrentQuestion(index);
  };
  return (
    <FormProvider {...Form}>
      <form
        className=" h-dvh p-4  rounded-3xl max-h-dvh overflow-hidden max-sm:overflow-auto  relative z-10"
        onSubmit={Form.handleSubmit(onSubmit)}
      >
        <QuizHeader isPending={isPending} />
        <div
          className="bg-card px-6 h-[calc(100%-80px)] gap-5 overflow-auto no-scrollbar rounded-b-3xl py-3 flex max-sm:flex-col"
          dir="ltr"
        >
          <QuestionList
            handleSelect={handleSelect}
            currentQuestion={currentQuestion}
          />
          <QuestionForm
            currentQuestion={currentQuestion}
            key={currentQuestion}
          />
        </div>
      </form>
    </FormProvider>
  );
}
