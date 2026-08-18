import { UserRound } from "lucide-react";

type PlayerResult = {
  name: string;
  score: number;
};

interface ResultsTableProps {
  players: PlayerResult[];
}

export function ResultsTable({ players }: ResultsTableProps) {
  return (
    <div
      dir="rtl"
      className="mx-auto mt-10 w-full max-w-5xl col-span-3 rounded-2xl border border-violet-500/50 bg-[#120d2b]/80 p-4 text-white shadow-[0_0_30px_rgba(124,58,237,0.15)] backdrop-blur-sm
      "
    >
      {/* Header */}
      <div className="grid grid-cols-3 px-4 pb-3 text-sm text-violet-300">
        <span className="text-right">المركز</span>
        <span className="text-center">اللاعب</span>
        <span className="text-left">النقاط</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1">
        {players.map((player, index) => {
          const rank = index + 4;

          return (
            <div
              key={`${player.name}-${rank}`}
              className="
                grid grid-cols-3 items-center
                rounded-xl
                px-4 py-3
                transition-colors
                hover:bg-white/[0.05]
              "
            >
              {/* Rank */}
              <div className="flex justify-start">
                <span
                  className="
                    flex min-w-10 items-center justify-center
                    rounded-full
                    bg-violet-500/25
                    px-3 py-1
                    font-bold
                    text-violet-100
                  "
                >
                  {rank}
                </span>
              </div>

              {/* Player */}
              <div className="flex items-center justify-center gap-3">
                <div
                  className="
                    flex size-8 items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-violet-400
                    to-indigo-600
                  "
                >
                  <UserRound
                    className="size-5 fill-white text-white"
                    strokeWidth={1.3}
                  />
                </div>

                <span className="font-semibold">{player.name}</span>
              </div>

              {/* Score */}
              <span
                dir="ltr"
                className="text-left text-lg font-bold tabular-nums"
              >
                {player.score.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
