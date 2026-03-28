import { NextResponse } from "next/server";
import {
  publicClient,
  parsePublishLogs,
  getOnChainAgent,
  formatOnChainAgent,
} from "@/lib/server-contracts";
import { onChainAgentToDto } from "@/lib/agent-dto";

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

    const event = parsePublishLogs(receipt.logs);
    if (!event || event.eventName !== "AgentPublished") {
      return NextResponse.json(
        { error: "AgentPublished event not found in tx" },
        { status: 400 },
      );
    }

    const { id } = event.args;

    // Re-read from contract to confirm
    const [owner, uri, pricePerHour, active] = await getOnChainAgent(id);
    const agent = formatOnChainAgent(Number(id), owner, uri, pricePerHour, active);

    return NextResponse.json(onChainAgentToDto(agent), { status: 201 });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Publish failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
