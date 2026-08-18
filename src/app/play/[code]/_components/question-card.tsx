"use client";

import { Clock, Info, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnswerQuestionAction } from "@/lib/actions/answer-question.action";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { formatTime } from "@/lib/formatTime";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuestionCardProps {
  title?: string;
  time?: number;
  sessionId: string;
  questionNumber?: number;
  totalQuestions?: number;
  options: QuestionOption[];
  points?: number;
  questionId: string;
  isCorrecting: boolean;
  parent?: "dashboard" | "player" | "result";
}

const OPTION_COLORS = [
  "bg-violet-600",
  "bg-amber-400",
  "bg-teal-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-orange-500",
] as const;

const LETTERS = "ABCDEF";

export function QuestionCard({
  title,
  time,
  questionNumber,
  sessionId,
  totalQuestions,
  options,
  points = 100,
  questionId,
  isCorrecting = false,
  parent,
}: QuestionCardProps) {
  const isUrgent = time! <= 5;
  const userSession = useSession();
  const [answer, setAnswer] = useState<string | null>(null);
  const playerId = userSession?.data?.user.id;

  const { mutate } = useMutation({
    mutationFn: ({
      playerId,
      qId,
      optionId,
      sessionId,
    }: {
      playerId: string;
      qId: string;
      optionId: string | null;
      sessionId: string;
    }) => AnswerQuestionAction(playerId, qId, optionId, sessionId),
  });

  const autoSubmittedRef = useRef(false);

  useEffect(() => {
    if (
      time === 0 &&
      answer === null &&
      playerId &&
      !autoSubmittedRef.current &&
      !isCorrecting
    ) {
      autoSubmittedRef.current = true;
      mutate({
        playerId,
        qId: questionId,
        optionId: null,
        sessionId,
      });
    }
  }, [time, answer, playerId, questionId, mutate]);

  useEffect(() => {
    autoSubmittedRef.current = false;
  }, [questionId]);

  function selectOption(optionId: string) {
    if (!isCorrecting) {
      setAnswer(optionId);
      if (!userSession.data?.user.id) return;
      mutate({
        playerId: userSession.data.user.id,
        qId: questionId,
        optionId,
        sessionId,
      });
    }
  }

  return (
    <section
      dir="rtl"
      className={cn(
        "flex  flex-col gap-6 rounded-3xl  w-2/3 max-md:w-3/4 max-sm:w-full max-sm:mx-3 border bg-card p-6 shadow-sm",
        isCorrecting && "w-full mb-5",
        parent === "dashboard" && "h-full",
      )}
    >
      {time && questionNumber && totalQuestions && points && (
        <header className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">
            السؤال{" "}
            <span className="font-bold text-foreground">{questionNumber}</span>{" "}
            من {totalQuestions}
          </span>

          <span
            aria-live={isUrgent ? "assertive" : "off"}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 font-bold tabular-nums transition-colors",
              isUrgent
                ? "animate-pulse bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary",
            )}
          >
            <Clock className="size-4" />
            <span dir="ltr">{formatTime(time)}</span>
          </span>

          <span className="flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1.5 text-sm font-semibold">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {points} نقطة
          </span>
        </header>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-balance text-2xl font-extrabold leading-relaxed">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">اختر إجابة واحدة فقط</p>
      </div>

      <ul className="flex flex-col gap-3">
        {options &&
          options.map((option, index) => {
            return (
              <li key={option.id}>
                <button
                  type="button"
                  disabled={answer !== null || isCorrecting ? true : false}
                  aria-pressed={answer === option.id}
                  onClick={() => selectOption(option.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl border bg-background p-3 text-right transition-all",
                    "hover:border-primary/40 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border disabled:hover:shadow-none",
                    (answer === option.id &&
                      "border-primary bg-primary/5 ring-2 ring-primary") ||
                      (option.isCorrect &&
                        "border-primary bg-primary/5 ring-2 ring-primary"),
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-9  shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                      OPTION_COLORS[index % OPTION_COLORS.length],
                    )}
                  >
                    {LETTERS[index] ?? index + 1}
                  </span>

                  <span className="min-w-0 flex-1 font-medium">
                    {option.text}
                  </span>
                </button>
              </li>
            );
          })}
      </ul>
      {!isCorrecting && (
        <footer className="flex items-center justify-center gap-2 rounded-2xl bg-primary/5 p-3 text-xs text-primary">
          <Info className="size-4 shrink-0" />
          سيتم الانتقال تلقائياً للسؤال التالي عند انتهاء الوقت
        </footer>
      )}
    </section>
  );
}
