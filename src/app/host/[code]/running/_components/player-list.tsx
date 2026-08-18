import { Player } from "@/generated/prisma/client";

interface PlayersListCardProps {
  players: Player[];
}

function PositionBadge({ position }: { position: number }) {
  const styles: Record<number, string> = {
    1: "bg-amber-400 text-white",
    2: "bg-neutral-300 text-white",
    3: "bg-orange-500 text-white",
  };

  return (
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        styles[position] ?? "bg-neutral-100 text-neutral-500"
      }`}
    >
      {position}
    </div>
  );
}

export default function PlayersListCard({ players }: PlayersListCardProps) {
  return (
    <div className="w-full h-full max-w-sm rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between px-1 pb-3">
        <h2 className="text-sm font-bold text-neutral-900">
          PLAYERS ({players.length})
        </h2>
      </div>

      <div className="max-h-80 space-y-1 overflow-y-auto pr-1">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-neutral-50"
          >
            <PositionBadge position={index + 1} />
            <span className="flex-1 text-sm font-medium text-neutral-800">
              {player.name}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
