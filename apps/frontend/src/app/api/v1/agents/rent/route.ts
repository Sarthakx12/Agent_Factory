import { NextResponse } from "next/server";
import { formatEther } from "viem";
import { publicClient, parseRentLogs } from "@/lib/server-contracts";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { tx_hash?: string };
    const { tx_hash } = body;

    if (!tx_hash) {
      return NextResponse.json({ error: "tx_hash is required" }, { status: 400 });
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx_hash as `0x${string}`,
    });

    if (receipt.status !== "success") {
      return NextResponse.json(
        { error: "Transaction failed on-chain" },
        { status: 400 },
      );
    }

    const event = parseRentLogs(receipt.logs);
    if (!event || event.eventName !== "AgentRented") {
      return NextResponse.json(
        { error: "AgentRented event not found in tx" },
        { status: 400 },
      );
    }

    const { agentId, renter, payment, expiresAt, duration } = event.args;

    return NextResponse.json(
      {
        agentId: Number(agentId),
        renter,
        duration: String(duration),
        payment: formatEther(payment),
        expiresAt: Number(expiresAt),
        txHash: tx_hash,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Rent indexing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
