"use client";

import { useEffect, useState } from "react";
import { LobbyHeader } from "./lobby-header";
import { PlayersList } from "./lobby-player";
import { JoinGameCard } from "./lobby-join";
import { WaitingCard } from "./lobby-waiting";
import Image from "next/image";

type Player = {
  id: string;
  name: string;
};

export default function LobbyClient({ code }: { code: string }) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/lobby`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setPlayers(data.players);
    };

    return () => {
      eventSource.close();
    };
  }, [code]);

  return (
    <div className="h-dvh overflow-hidden">
      <Image
        src="/images/lobby-bg.png"
        alt="Quizzy"
        fill
        priority
        className=" absolute z-0"
      />
      <div className="relative h-3/4 max-lg:h-full max-lg:pb-28 z-10">
        <LobbyHeader code={code} />
        <div className="flex h-full m-5 overflow-auto no-scrollbar max-lg:flex-wrap justify-center items-center gap-10">
          <PlayersList players={players} />
          <JoinGameCard code={code} />
          <WaitingCard code={code} />
        </div>
      </div>
    </div>
  );
}
