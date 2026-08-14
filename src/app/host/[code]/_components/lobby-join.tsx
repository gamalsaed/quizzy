"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function JoinGameCard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setResolvedUrl(`${window.location.origin}?code=${code}`);
  }, [code]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      dir="rtl"
      className="flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border bg-card p-6 shadow-sm"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-main text-main-foreground">
        <Users className="size-6 text-white" />
      </span>

      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          انضم إلى اللعبة
        </h2>
        <p className="text-sm text-muted-foreground">
          امسح الرمز أو ادخل الكود
        </p>
      </div>

      <div className="relative p-3">
        <span className="pointer-events-none absolute inset-0">
          <span className="absolute right-0 top-0 size-6 rounded-tr-xl border-r-4 border-t-4 border-main" />
          <span className="absolute left-0 top-0 size-6 rounded-tl-xl border-l-4 border-t-4 border-main" />
          <span className="absolute bottom-0 right-0 size-6 rounded-br-xl border-b-4 border-r-4 border-main" />
          <span className="absolute bottom-0 left-0 size-6 rounded-bl-xl border-b-4 border-l-4 border-main" />
        </span>

        {resolvedUrl ? (
          <QRCodeSVG
            value={resolvedUrl}
            size={180}
            level="M"
            marginSize={0}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-foreground"
          />
        ) : (
          <div className="size-[180px] animate-pulse rounded-lg bg-muted" />
        )}
      </div>

      <div className="h-px w-full border-t border-dashed" />

      <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-muted/60 p-2 pr-5">
        <span
          dir="ltr"
          className="select-all font-mono text-4xl font-extrabold tracking-[0.15em] text-main"
        >
          {code}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="size-10 shrink-0 rounded-xl text-main hover:bg-main/10"
        >
          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
          <span className="sr-only">
            {copied ? "تم نسخ الكود" : "نسخ الكود"}
          </span>
        </Button>
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? "تم نسخ الكود" : ""}
      </span>
    </section>
  );
}
