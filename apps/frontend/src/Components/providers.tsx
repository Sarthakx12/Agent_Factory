"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";
import { type ReactNode, useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { monadTestnet, wagmiConfig } from "@/lib/wagmi";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "demo-project-id";

const metadata = {
  name: "AgentFactory",
  description: "Retro-futuristic marketplace for AI agents",
  url: "https://agentfactory.local",
  icons: [],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [monadTestnet],
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [monadTestnet],
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
