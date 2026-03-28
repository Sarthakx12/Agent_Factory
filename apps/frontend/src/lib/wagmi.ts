import { createConfig, http } from "wagmi";
import { monadTestnet } from "@/lib/monad-chain";

export { monadTestnet } from "@/lib/monad-chain";

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http("https://testnet.monad.xyz"),
  },
});
