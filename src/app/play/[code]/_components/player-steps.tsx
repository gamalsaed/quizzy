"use client";

import { useEffect, useState } from "react";
import PlayerLobby from "./player-lobby";
import PlayerGame from "./player-game";
import Loading from "@/app/loading";

type GameSession = {
  id: string;
  code: string;
  status: "LOBBY" | "RUNNING" | "FINISHED";
  currentQuestion: number;
};
export default function PlayerSteps({ code }: { code: string }) {
  const [gameSession, setGameSession] = useState<GameSession>();
  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/play`);
    eventSource.onmessage = (event) => {
      const session = JSON.parse(event.data);
      setGameSession(session);
    };
    return () => {
      eventSource.close();
    };
  }, [code]);
  if (!gameSession) return <Loading />;

  if (gameSession?.status === "LOBBY")
    return <PlayerLobby code={code} hostName="Gamal" />;

  if (gameSession?.status === "RUNNING") return <PlayerGame />;
  if (gameSession?.status === "FINISHED") return <div>Game Ended</div>;
}
