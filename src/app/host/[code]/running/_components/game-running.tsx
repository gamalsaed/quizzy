"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NextQuestionAction } from "@/lib/actions/next-question.action";
import { ChangeGameStatusAction } from "@/lib/actions/change-game-status";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StatsRow from "./starts-row";
import { QuestionCard } from "@/app/play/[code]/_components/question-card";
import { Player } from "@/generated/prisma/client";
import PlayersListCard from "./player-list";
import Loading from "@/app/loading";
import { Button } from "@base-ui/react/button";
import { Square, SkipForward, SkipBack, Loader2 } from "lucide-react";
type data = {
  quiz: {
    id: string;
    title: string;
  };
  answersCount: number;
  players: Player[];
  numberOfQuestions: number;
  isQuizEnded: boolean;
  currentQuestion: {
    index: number;
    id: string;
    text: string;
    timeLimitSec: number;
    points: number;

    options: {
      id: string;
      text: string;
    }[];
  };

  timer: {
    remainingTime: number;
    isTimeUp: boolean;
  };
};

export default function GameRunning({ code }: { code: string }) {
  const [gameSession, setGameSession] = useState<data>();
  const router = useRouter();
  const { mutate: nextQuestion, isPending: isNextPending } = useMutation({
    mutationFn: () => NextQuestionAction(code),
  });

  const { mutate: changeGameStatus, isPending: isEndPending } = useMutation({
    mutationFn: ({
      code,
      status,
    }: {
      code: string;
      status: "LOBBY" | "RUNNING" | "FINISHED";
    }) => ChangeGameStatusAction(code, status),
    onSuccess: () => {
      router.replace(`/host/${code}/result`);
    },
  });

  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/play`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setGameSession(data);
    };

    return () => eventSource.close();
  }, [code]);

  useEffect(() => {
    if (gameSession?.timer.isTimeUp) {
      nextQuestion();
    }
  }, [gameSession]);

  useEffect(() => {
    if (gameSession?.isQuizEnded) {
      changeGameStatus({ code, status: "FINISHED" });
    }
  }, [gameSession?.isQuizEnded]);

  if (gameSession) {
    return (
      <div className="h-dvh overflow-auto">
        <Image
          src="/images/lobby-bg.png"
          alt="Quizzy"
          fill
          priority
          className=" absolute z-0"
        />
        <div className="h-full flex justify-center   items-center flex-col">
          <div className="w-3/4 z-30 p-10 rounded-2xl bg-white flex flex-col items-center justify-center">
            <StatsRow
              QuestionValue={`${gameSession?.currentQuestion.index! + 1} / ${gameSession?.numberOfQuestions}`}
              TimeValue={`${gameSession?.timer.remainingTime}`}
              AnswersValue={`${gameSession?.answersCount} / ${gameSession?.numberOfQuestions! * gameSession?.players.length!}`}
              UsersValue={`${gameSession?.players.length}`}
            />
            <div className="relative w-full h-fit z-20 flex flex-row-reverse gap-5">
              <QuestionCard
                key={gameSession?.currentQuestion.id}
                questionId={gameSession?.currentQuestion.id!}
                title={gameSession?.currentQuestion.text}
                options={gameSession?.currentQuestion.options!}
                isCorrecting={true}
                sessionId={code as string}
                parent="dashboard"
              />
              <PlayersListCard players={gameSession.players} />
            </div>
            <div className="flex gap-10 mt-10" dir="ltr">
              <button
                type="button"
                disabled={isEndPending}
                onClick={() => changeGameStatus({ code, status: "FINISHED" })}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEndPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Square className="h-4 w-4 fill-white" />
                )}
                End Question
              </button>

              <button
                type="button"
                disabled={isNextPending}
                onClick={() => nextQuestion()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Next Question
                {isNextPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SkipForward className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
