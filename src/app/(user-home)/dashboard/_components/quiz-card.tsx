"use client";

import Link from "next/link";
import { CalendarDays, ListChecks, MoreVertical, Play } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createGameSessionAction } from "@/lib/actions/create-session.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface QuizCardProps {
  id: string;
  title: string;
  questionsCount: number;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: Date | string) {
  return dateFormatter.format(new Date(value));
}

export function QuizCard({
  id,
  title,
  questionsCount,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
  className,
}: QuizCardProps) {
  const isEdited = Boolean(updatedAt);
  const displayDate = formatDate(updatedAt ?? createdAt);

  const { mutate, isPending } = useMutation({
    mutationFn: (quizId: string) => createGameSessionAction(quizId),
  });

  return (
    <article
      dir="rtl"
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground"
              >
                <MoreVertical className="size-4" />
                <span className="sr-only">خيارات الاختبار</span>
              </Button>
            }
          />
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem onSelect={() => onEdit?.(id)}>
              <Link href={`/quizzes/${id}/edit`}>تعديل</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => onDelete?.(id)}
            >
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground">
          {title}
        </h3>

        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ListChecks className="size-4 shrink-0" />
            {questionsCount} أسئلة
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" />
            {isEdited ? "آخر تعديل" : "تم الإنشاء"}: {displayDate}
          </span>
        </div>
      </div>

      <Button
        size="lg"
        nativeButton={false}
        className="w-full gap-2 rounded-xl text-base"
        onClick={() => mutate(id)}
        disabled={isPending}
        render={
          <Link href={`/quiz/${id}/host`}>
            شغّل
            <Play className="size-4 fill-current" />
          </Link>
        }
      />
    </article>
  );
}
