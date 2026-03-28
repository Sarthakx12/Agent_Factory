"use client";

import { usePublicClient, useWriteContract } from "wagmi";
import { ESCROW_ADDRESS, escrowAbi } from "@/lib/contracts";
import { claimRental } from "@/lib/api";

/**
 * Publisher claims escrowed MON after a rental ends (on-chain + DB index).
 */
export function useClaimRental(dbAgentId: string) {
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();

  const claim = async (onChainAgentId: bigint, renterAddress: `0x${string}`) => {
    const hash = await writeContractAsync({
      address: ESCROW_ADDRESS,
      abi: escrowAbi,
      functionName: "claimRental",
      args: [onChainAgentId, renterAddress],
    });
    if (publicClient) {
      await publicClient.waitForTransactionReceipt({ hash });
    }
    await claimRental(dbAgentId, hash);
    return hash;
  };

  return { claim, isPending };
}
