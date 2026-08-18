"use client";

import { Crown, Medal, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FirstPlaceCardProps {
  name: string;
  score: number;
  className?: string;
}

export function FirstPlaceCard({
  name,
  score,
  className,
}: FirstPlaceCardProps) {
  return (
    <div
      className={cn(
        "relative max-sm:col-span-3 w-full  max-w-80 pt-10",
        className,
      )}
    >
      {/* Crown */}
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-2xl" />

          <Crown
            className="relative size-20 fill-yellow-400 text-yellow-300 drop-shadow-[0_0_18px_rgba(250,204,21,0.8)]"
            strokeWidth={1.6}
          />
        </div>
      </div>

      <Card
        className="
          relative overflow-hidden
          border-2 border-yellow-400/80
          bg-gradient-to-b
          from-[#2d2038]
          via-[#1c1429]
          to-[#120c20]
          px-6 pb-8 pt-14
          text-white
          shadow-[0_0_45px_rgba(234,179,8,0.18)]
        "
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-20 size-52 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

          <div
            className="
              absolute left-1/2 top-20
              h-40 w-40
              -translate-x-1/2
              bg-[radial-gradient(circle,rgba(250,204,21,0.22)_0%,transparent_70%)]
            "
          />
        </div>

        {/* First place medal */}
        <div className="absolute left-5 top-5">
          <div
            className="
              relative flex size-14 items-center justify-center
              rounded-full
              border-4 border-yellow-300
              bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500
              shadow-[0_0_20px_rgba(250,204,21,0.45)]
            "
          >
            <Medal className="absolute size-16 text-yellow-300" />

            <span className="relative z-10 text-xl font-black text-white">
              1
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar */}
          <div
            className="
              relative flex size-32 items-center justify-center
              rounded-full
              border-4 border-yellow-300
              bg-gradient-to-br
              from-yellow-300
              via-amber-400
              to-yellow-600
              shadow-[0_0_35px_rgba(250,204,21,0.45)]
            "
          >
            <div className="absolute inset-2 rounded-full bg-yellow-100/20" />

            <UserRound
              className="relative size-20 fill-yellow-50 text-yellow-100"
              strokeWidth={1.2}
            />
          </div>

          {/* Name */}
          <h2 className="mt-6 text-3xl font-black tracking-tight">{name}</h2>

          {/* Score */}
          <div className="mt-5 text-center">
            <p
              className="
                bg-gradient-to-b
                from-yellow-200
                via-yellow-400
                to-amber-500
                bg-clip-text
                text-5xl
                font-black
                tracking-tight
                text-transparent
              "
            >
              {score.toLocaleString()}
            </p>

            <p className="mt-2 text-lg font-bold text-yellow-50">نقطة</p>
          </div>
        </div>
      </Card>

      {/* Podium */}
      <div
        className="
          mx-auto h-6 w-[94%]
          rounded-b-[50%] rounded-t-xl
          border-x-2 border-b-2 border-yellow-300
          bg-gradient-to-b
          from-yellow-300
          via-amber-400
          to-yellow-600
          shadow-[0_8px_25px_rgba(250,204,21,0.35)]
        "
      />
    </div>
  );
}
