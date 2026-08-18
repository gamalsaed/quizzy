"use client";

import { Medal, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SecondPlaceCardProps {
  name: string;
  score: number;
  className?: string;
}

export function SecondPlaceCard({
  name,
  score,
  className,
}: SecondPlaceCardProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        "relative max-sm:col-span-3 mx-auto w-full max-w-[280px] pt-5",
        className,
      )}
    >
      <Card
        className="
          relative overflow-hidden
          rounded-3xl
          border border-blue-300/70
          bg-gradient-to-b
          from-[#22244f]
          via-[#17183d]
          to-[#0d0e2b]
          px-5 pb-6 pt-6
          text-white
          shadow-[0_0_35px_rgba(96,165,250,0.2)]
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-14 size-36 -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
        </div>

        {/* Medal */}
        <div className="absolute left-4 top-4">
          <div
            className="
              relative flex size-12 items-center justify-center
              rounded-full
              border-4 border-blue-100
              bg-gradient-to-br
              from-blue-100
              via-blue-300
              to-blue-500
              shadow-[0_0_18px_rgba(147,197,253,0.45)]
            "
          >
            <Medal className="absolute size-14 text-blue-200" />

            <span className="relative z-10 text-lg font-black text-white">
              2
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar */}
          <div
            className="
              flex size-24 items-center justify-center
              rounded-full
              border-4 border-blue-100
              bg-gradient-to-br
              from-blue-200
              via-blue-400
              to-indigo-500
              shadow-[0_0_25px_rgba(96,165,250,0.45)]
            "
          >
            <UserRound
              className="size-16 fill-blue-50 text-blue-50"
              strokeWidth={1.2}
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-black">{name}</h2>

          {/* Score */}
          <div className="mt-2 text-center">
            <p
              className="
                bg-gradient-to-b
                from-blue-100
                via-blue-300
                to-blue-400
                bg-clip-text
                text-4xl
                font-black
                text-transparent
              "
            >
              {score.toLocaleString()}
            </p>

            <p className="mt-1 text-sm font-bold text-blue-50">نقطة</p>
          </div>
        </div>
      </Card>

      {/* Podium */}
      <div
        className="
          mx-auto h-4 w-[92%]
          rounded-b-[50%] rounded-t-lg
          border-x border-b border-blue-200
          bg-gradient-to-b
          from-blue-100
          via-blue-300
          to-indigo-500
          shadow-[0_7px_20px_rgba(96,165,250,0.3)]
        "
      />
    </div>
  );
}
