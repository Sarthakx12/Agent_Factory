import { defineChain } from "viem";

export const monadTestnet = defineChain({
  id: 41454,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://testnet.monad.xyz" },
  },
  testnet: true,
});
