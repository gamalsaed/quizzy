"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvicer } from "./react_query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvicer>{children}</QueryProvicer>
    </SessionProvider>
  );
}
