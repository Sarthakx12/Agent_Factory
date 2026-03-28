"use client";

import { parseEther } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { ESCROW_ADDRESS, escrowAbi } from "@/lib/contracts";
import { registerRental } from "@/lib/api";

export function useRent() {
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();

  const rent = async (
    onChainAgentId: bigint,
    hours: number,
    pricePerHour: number,
  ) => {
    const value = parseEther(String(pricePerHour * hours));
    const hash = await writeContractAsync({
      address: ESCROW_ADDRESS,
      abi: escrowAbi,
      functionName: "rent",
      args: [onChainAgentId, BigInt(hours)],
      value,
    });
    if (publicClient) {
      await publicClient.waitForTransactionReceipt({ hash });
    }
    await registerRental(hash);
    return hash;
  };

  return { rent, isPending };
}
