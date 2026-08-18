"use client";

import { useEffect, useState } from "react";
import PlayerLobby from "./player-lobby";
import PlayerGame from "./player-game";
import Loading from "@/app/loading";
import Result from "@/app/_components/result";
type GameSession = {
  id: string;
  code: string;
  status: "LOBBY" | "RUNNING" | "FINISHED";
  currentQuestion: number;
};
export default function PlayerSteps({
  code,
  userId,
}: {
  code: string;
  userId: string;
}) {
  const [gameSession, setGameSession] = useState<GameSession>();
  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/lobby`);
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

  if (gameSession?.status === "RUNNING") return <PlayerGame code={code} />;
  if (gameSession?.status === "FINISHED") return <Result userId={userId} />;
}
