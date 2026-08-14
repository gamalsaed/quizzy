import LobbyClient from "./_components/lobby-client";

export default async function page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <div>
      <LobbyClient code={code} />
    </div>
  );
}
