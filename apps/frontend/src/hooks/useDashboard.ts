"use client";

import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/lib/api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const agents = await getAgents();
      const published = agents;
      const rented = agents.slice(0, 1);
      return { published, rented };
    },
  });
}
