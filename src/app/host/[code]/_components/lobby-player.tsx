"use client";

import { Users } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Player {
  id: string;
  name: string;
}

const PLAYER_COLORS = [
  { avatar: "bg-violet-500", card: "bg-violet-50 dark:bg-violet-500/10" },
  { avatar: "bg-rose-500", card: "bg-rose-50 dark:bg-rose-500/10" },
  { avatar: "bg-blue-500", card: "bg-blue-50 dark:bg-blue-500/10" },
  { avatar: "bg-teal-500", card: "bg-teal-50 dark:bg-teal-500/10" },
  { avatar: "bg-amber-400", card: "bg-amber-50 dark:bg-amber-400/10" },
  { avatar: "bg-fuchsia-500", card: "bg-fuchsia-50 dark:bg-fuchsia-500/10" },
] as const;

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return PLAYER_COLORS[Math.abs(hash) % PLAYER_COLORS.length];
}

function getInitial(name: string) {
  return [...name.trim()][0] ?? "؟";
}

const pluralRules = new Intl.PluralRules("ar-EG");

function playersLabel(count: number) {
  switch (pluralRules.select(count)) {
    case "zero":
      return "مفيش لاعبين";
    case "one":
      return "لاعب واحد";
    case "two":
      return "لاعبان";
    case "few":
      return `${count} لاعبين`;
    default:
      return `${count} لاعباً`;
  }
}

export function PlayersList({ players }: { players: Player[] }) {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-4 rounded-3xl max-h-3/5 border bg-card p-4 overflow-auto shadow-sm"
    >
      <header className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Users className="size-5 text-primary" />
          اللاعبون
        </h2>

        <span
          aria-live="polite"
          className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
        >
          <Users className="size-3.5" />
          {playersLabel(players.length)}
        </span>
      </header>

      {players.length === 0 ? (
        <p className="animate-pulse py-10 text-center text-sm text-muted-foreground">
          في انتظار انضمام اللاعبين...
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {players.map((player) => {
            const color = getColor(player.id);

            return (
              <li
                key={player.id}
                className={cn(
                  "flex items-center gap-2 rounded-2xl p-2 duration-300 animate-in fade-in zoom-in-95",
                  color.card,
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white",
                    color.avatar,
                  )}
                >
                  {getInitial(player.name)}
                </span>

                <span className="truncate text-sm font-semibold">
                  {player.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
