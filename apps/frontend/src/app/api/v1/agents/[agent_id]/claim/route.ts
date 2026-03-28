import { NextResponse } from "next/server";
import { publicClient, parseClaimLogs } from "@/lib/server-contracts";

export async function POST(
  req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
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

    const event = parseClaimLogs(receipt.logs);
    if (!event || event.eventName !== "RentalClaimed") {
      return NextResponse.json(
        { error: "RentalClaimed event not found in tx" },
        { status: 400 },
      );
    }

    const { agentId, renter, publisher } = event.args;

    // Verify the agent_id matches
    if (String(agentId) !== agent_id) {
      return NextResponse.json(
        { error: "agent_id does not match on-chain event" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      agentId: Number(agentId),
      renter,
      publisher,
      txHash: tx_hash,
    });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Claim indexing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
