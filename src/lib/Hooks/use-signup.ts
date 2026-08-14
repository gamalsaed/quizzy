"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpAction } from "../actions/sign-up.action";
import { signUpType } from "../schema/signup.schema";

export function useSignUp() {
  // Router
  const router = useRouter();

  // Mutation
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: signUpType) => {
      // Server Action
      const res = await signUpAction(values);
      return res;
    },
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  return {
    mutate,
    error,
    isPending,
  };
}
