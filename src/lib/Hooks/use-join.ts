// lib/Hooks/use-join.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JoinType } from "@/lib/schema/join.schema";

export function useJoin() {
  // Router
  const router = useRouter();
  // Mutation
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: JoinType) => {
      // Next Auth
      const res = await signIn("guest", {
        code: values.code,
        clientToken: values.clientToken,
        redirect: false,
      });

      if (res?.error) throw new Error("INVALID_CODE");
      return res;
    },
    onSuccess: (_, values) => {
      router.push(`/play/${values.code}`);
      router.refresh();
    },
  });

  return { mutate, error, isPending };
}
