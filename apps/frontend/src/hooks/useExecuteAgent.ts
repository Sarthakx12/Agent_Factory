"use client";

import { useMutation } from "@tanstack/react-query";
import { runAgent } from "@/lib/api";

export function useExecuteAgent(id: string, renter: string | undefined) {
  return useMutation({
    mutationFn: (input: string) => {
      if (!renter) throw new Error("Connect wallet to run agent");
      return runAgent(id, input, renter);
    },
  });
}
