"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/appkit";
// Side-effect import: initialises AppKit modal (must run before any UI)
import "@/lib/appkit";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
