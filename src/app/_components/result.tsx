"use client";

import Image from "next/image";
import { FirstPlaceCard } from "./first-place-card";
import { SecondPlaceCard } from "./secound-place";
import { ThirdPlaceCard } from "./third-place";
import { ResultsTable } from "./result-table";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getResultAction } from "@/lib/actions/get-result-action";
import { useParams } from "next/navigation";
import { QuestionCard } from "../play/[code]/_components/question-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlayerScore } from "@/lib/get-player-score";
import Loading from "../loading";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Result({ userId }: { userId: string }) {
  const { code } = useParams();
  const { data } = useQuery({
    queryKey: [`result ${code}`],
    queryFn: () => getResultAction(code as string, userId),
  });
  const playersResult = data ? getPlayerScore(data?.players as any) : [];

  if (playersResult === undefined || playersResult?.length === 0)
    return <Loading />;

  return (
    <div className="h-dvh  overflow-auto px-5 pt-20">
      <Image
        src="/images/result-bg.png"
        alt="Quizzy"
        fill
        priority
        className=" absolute z-0 "
      />
      <div className="relative z-10  text-white w-full overflow-auto  flex justify-center items-center flex-col">
        <div className="flex flex-col items-center">
          {" "}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]">
            انتهت اللعبة!
          </h1>
          <p className="mt-1 text-sm sm:text-base font-medium text-slate-200/90 flex items-center gap-1.5">
            شكراً لمشاركتك
            <span role="img" aria-label="party">
              🎉
            </span>
          </p>
        </div>
        <div className=" grid w-full h-full max-w-4xl grid-cols-3 justify-center max-sm:grid-cols-1 max-sm:items-center items-end gap-2">
          {playersResult.length > 1 && (
            <SecondPlaceCard
              name={playersResult[1].name}
              score={playersResult[1].score}
            />
          )}

          <div
            className={cn(
              "w-full!  mx-auto flex justify-center ",
              playersResult.length === 1 && "col-span-3",
            )}
          >
            {playersResult.length > 0 && (
              <FirstPlaceCard
                name={playersResult[0].name}
                score={playersResult[0].score}
              />
            )}
          </div>
          {playersResult.length > 2 && (
            <ThirdPlaceCard
              name={playersResult[2].name}
              score={playersResult[2].score}
            />
          )}
          {playersResult.length > 3 && (
            <ResultsTable players={playersResult.slice(3)} />
          )}

          <h1 className="text-3xl col-span-3 text-center my-10 sm:text-4xl font-extrabold text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]">
            الاجاتبات
          </h1>
          <ScrollArea className="h-96 col-span-3 text-navy w-full p-5 flex flex-col  rounded-2xl">
            {data &&
              data?.quiz.questions.map((question) => {
                return (
                  <QuestionCard
                    key={question.id}
                    questionId={question.id}
                    title={question.text}
                    options={question.options}
                    isCorrecting={true}
                    sessionId={code as string}
                  />
                );
              })}
          </ScrollArea>
          <div className="col-span-3 mb-10 mx-auto">
            <Link href="/">
              <Button
                variant="outline"
                className="h-14 mb-10 cursor-pointer rounded-2xl border-violet-400/60 bg-transparent px-8 text-base font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.08)] hover:bg-violet-500/10 hover:text-white hover:border-violet-300"
              >
                <Home className="size-5" />
                العودة إلى القائمة
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
