// components/sign-out-button.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="border-destructive/40 cursor-pointer text-destructive hover:bg-destructive/5 hover:text-destructive"
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">تسجيل الخروج</span>
    </Button>
  );
}
