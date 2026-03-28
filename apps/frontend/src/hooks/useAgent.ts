"use client";

import { useQuery } from "@tanstack/react-query";
import { getAgentById } from "@/lib/api";

export function useAgent(id: string) {
  return useQuery({
    queryKey: ["agent", id],
    queryFn: () => getAgentById(id),
    enabled: Boolean(id),
  });
}
