import { useMutation } from "@tanstack/react-query";
import { LoginType } from "@/lib/schema/login.schema";
import { signIn } from "next-auth/react";
import { queryClient } from "@/components/providers/react_query";
import { useRouter } from "next/navigation";

export function useLogin() {
  // Router
  const router = useRouter();

  // Mutation
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: LoginType) => {
      // Next Auth
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res?.error) throw new Error("INVALID_CREDENTIALS");
      return res;
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/dashboard");
    },
  });

  return {
    mutate,
    error,
    isPending,
  };
}
