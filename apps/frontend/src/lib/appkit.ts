import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { monadTestnet } from "@/lib/monad-chain";
import type { AppKitNetwork } from "@reown/appkit/networks";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_PROJECT_ID_HERE";

// Cast the custom chain so AppKit accepts it
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  monadTestnet as unknown as AppKitNetwork,
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "agent.market",
    description: "The first autonomous intelligence marketplace on Monad.",
    url: "https://agent.market",
    icons: ["https://agent.market/favicon.ico"],
  },
  themeMode: "light",
  themeVariables: {
    // Match the brutalist monochrome palette
    "--w3m-accent": "#111111",
    "--w3m-color-mix": "#111111",
    "--w3m-color-mix-strength": 0,
    "--w3m-font-family": "Menlo, Monaco, Consolas, 'Courier New', monospace",
    "--w3m-border-radius-master": "4px",
  },
  features: {
    analytics: false,
    email: false,
    socials: [],
  },
});
