import React from "react";
import GameRunning from "./_components/game-running";
export default async function page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return <GameRunning code={code} />;
}
