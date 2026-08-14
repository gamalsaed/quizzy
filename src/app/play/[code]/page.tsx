import PlayerSteps from "./_components/player-steps";

export default async function page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <div>
      <PlayerSteps code={code} />
    </div>
  );
}
