"use client";

import { useMutation } from "@tanstack/react-query";
import { registerPublishedAgent, type RegisterPublishBody } from "@/lib/api";

export function usePublish() {
  return useMutation({
    mutationFn: (payload: RegisterPublishBody) => registerPublishedAgent(payload),
  });
}
