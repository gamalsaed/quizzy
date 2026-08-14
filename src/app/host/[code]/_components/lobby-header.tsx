"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ChangeGameStatusAction } from "@/lib/actions/change-game-status";

export function LobbyHeader({ code }: { code: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => ChangeGameStatusAction(code, "FINISHED"),
  });

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            كويز
          </span>
          <Image
            src="/images/quiz-question.png"
            alt="شعار كويز"
            width={40}
            height={40}
            priority
            className="size-9 object-contain"
          />
        </Link>

        <Button
          onClick={() => mutate()}
          type="button"
          variant="outline"
          className="gap-2 rounded-lg"
        >
          <LogOut className="size-4" />
          خروج
        </Button>
      </div>
    </header>
  );
}
