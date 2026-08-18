"use client";

import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChangeGameStatusAction } from "@/lib/actions/change-game-status";
import { useRouter } from "next/navigation";

export interface WaitingCardProps {
  code: string;
  canStart?: boolean;
  className?: string;
}
// Chat Gpt
function PlayersIllustration() {
  return (
    <svg
      viewBox="0 0 200 165"
      role="img"
      aria-label="رسم توضيحي لثلاثة لاعبين"
      className="h-40 w-full"
    >
      <circle cx="100" cy="95" r="62" className="fill-muted" />

      <g className="fill-violet-600">
        <circle cx="55" cy="68" r="17" />
        <path d="M32 132v-14a23 23 0 0 1 46 0v14z" />
      </g>

      <g className="fill-teal-500">
        <circle cx="145" cy="68" r="17" />
        <path d="M122 132v-14a23 23 0 0 1 46 0v14z" />
      </g>

      <g className="fill-rose-500">
        <circle cx="100" cy="60" r="21" />
        <path d="M70 140v-19a30 30 0 0 1 60 0v19z" />
      </g>

      <path
        d="M28 62q4 11 15 15-11 4-15 15-4-11-15-15 11-4 15-15z"
        className="fill-amber-400"
      />
      <circle
        cx="176"
        cy="55"
        r="5"
        className="fill-none stroke-violet-500"
        strokeWidth="2"
      />
      <circle
        cx="182"
        cy="120"
        r="4"
        className="fill-none stroke-teal-500"
        strokeWidth="2"
      />
    </svg>
  );
}

export function WaitingCard({
  code,
  canStart = true,
  className,
}: WaitingCardProps) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => ChangeGameStatusAction(code, "RUNNING"),
    onSuccess: () => {
      router.push(`/host/${code}/running`);
    },
  });

  return (
    <section
      dir="rtl"
      className={cn(
        "flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border bg-card p-6 shadow-sm",
        className,
      )}
    >
      <div className="animate-pulse [animation-duration:2.5s]">
        <PlayersIllustration />
      </div>

      <h2 className="text-center text-lg font-extrabold tracking-tight">
        في انتظار باقي اللاعبين...
      </h2>

      <div className="h-px w-full bg-border" />

      <Button
        type="button"
        size="lg"
        disabled={!canStart || isPending}
        onClick={() => mutate()}
        className="w-full gap-2 rounded-2xl py-6 text-lg font-bold"
      >
        {isPending ? "جاري البدء..." : "ابدأ اللعبة"}
        <Rocket className="size-5" />
      </Button>
    </section>
  );
}
