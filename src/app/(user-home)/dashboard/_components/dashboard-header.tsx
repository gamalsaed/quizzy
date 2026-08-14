// components/dashboard-header.tsx
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SignOutButton } from "./signout-button";

export async function DashboardHeader() {
  // Server Session
  const session = await getServerSession(authOptions);

  // Var
  const name = session?.user?.name ?? "";

  return (
    <header className=" rounded-tr-3xl rounded-tl-3xl border border-border bg-card px-6 py-3 shadow-sm">
      <div className="flex flex-row-reverse items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-navy">Quizzy</span>

          <Image
            src="/images/logo.png"
            alt="Quizzy"
            width={80}
            height={80}
            priority
          />
        </Link>

        <h1 className="hidden text-xl font-bold text-navy md:block">
          لوحة الـ Quizzes
        </h1>

        <div className="flex flex-row-reverse items-center gap-10">
          <div className="flex items-center gap-3 flex-row-reverse">
            <span className="hidden text-sm font-medium text-navy sm:inline">
              أهلًا {name}
            </span>

            <Avatar className="size-10 border-2 border-main">
              <AvatarFallback className="bg-main/10 text-main font-bold">
                {name.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
          </div>

          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
