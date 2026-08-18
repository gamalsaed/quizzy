import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Timer, Users } from "lucide-react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface PlayerLobbyProps {
  code: string;
  currentPlayers?: number;
  hostName?: string;
}
type Player = {
  id: string;
  name: string;
};

type IncomingDataType = {
  players: Player[];
  hoster: string;
  status: string;
};

export default function PlayerLobby({ code, hostName }: PlayerLobbyProps) {
  const [resolvedUrl, setResolvedUrl] = useState("");
  const session = useSession();
  const [incomingData, setIncomingData] = useState<IncomingDataType>({
    players: [],
    hoster: "",
    status: "",
  });

  useEffect(() => {
    setResolvedUrl(`${window.location.origin}?code=${code}`);
  }, [code]);
  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/lobby`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setIncomingData({
        players: data.players,
        hoster: data.hoster,
        status: data.status,
      });
    };
    return () => eventSource.close();
  }, [code]);
  return (
    <div
      dir="rtl"
      className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-light px-4 py-10"
    >
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="شعار Quizzy"
              width={40}
              height={40}
              priority
              className="size-9 rounded-xl object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tight text-navy">
              Quizzy
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-extrabold tracking-tight text-navy">
              أنت في غرفة اللعبة
            </h1>
            <p className="text-sm text-muted-foreground">
              {incomingData.hoster
                ? `بانتظار بدء اللعبة بواسطة ${incomingData.hoster}`
                : "بانتظار بدء اللعبة بواسطة المضيف"}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-3xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-right">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-main/10 text-main">
              <Timer className="size-6 animate-pulse animation-duration-[2.5s]" />
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-muted-foreground">
                كود اللعبة
              </span>
              <span
                dir="ltr"
                className="select-all font-mono text-5xl font-extrabold tracking-[0.15em] text-main"
              >
                {code}
              </span>
            </div>

            <p className="max-w-[16rem] text-sm text-muted-foreground">
              شارك هذا الكود مع أصدقائك للانضمام
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative p-3">
              <span className="pointer-events-none absolute inset-0">
                <span className="absolute right-0 top-0 size-6 rounded-tr-xl border-r-4 border-t-4 border-main" />
                <span className="absolute left-0 top-0 size-6 rounded-tl-xl border-l-4 border-t-4 border-main" />
                <span className="absolute bottom-0 right-0 size-6 rounded-br-xl border-b-4 border-r-4 border-main" />
                <span className="absolute bottom-0 left-0 size-6 rounded-bl-xl border-b-4 border-l-4 border-main" />
              </span>

              <QRCodeSVG
                value={resolvedUrl ?? code}
                size={130}
                level="M"
                marginSize={0}
                bgColor="transparent"
                fgColor="currentColor"
                className="text-foreground"
              />
            </div>
          </div>
        </div>

        {/* اللاعبون المنضمون */}
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <h2 className="flex items-center gap-2 text-base font-bold text-navy">
            <Users className="size-5 text-main" />
            اللاعبون المنضمون
          </h2>

          <span
            dir="ltr"
            className="rounded-full bg-main/10 px-6 py-2 text-lg font-extrabold text-main"
          >
            {incomingData.players.length}
          </span>

          <p className="animate-pulse text-sm text-muted-foreground">
            بانتظار المزيد من اللاعبين...
          </p>
        </div>
      </div>
    </div>
  );
}
