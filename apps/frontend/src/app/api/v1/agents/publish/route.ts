import { NextResponse } from "next/server";
import { formatEther, parseEther } from "viem";
import { db, AgentsTable } from "@repo/db";
import { eq } from "drizzle-orm";
import {
  publicClient,
  parsePublishLogs,
  getOnChainAgent,
} from "@/lib/server-contracts";
import { agentRowToDto } from "@/lib/agent-dto";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      tx_hash?: string;
      name?: string;
      category?: string;
      price_per_hr?: number | string;
      storage_path?: string;
    };

    const { tx_hash, name, category, price_per_hr, storage_path } = body;

    if (!tx_hash) {
      return NextResponse.json({ error: "tx_hash is required" }, { status: 400 });
    }
    if (!name || !category || price_per_hr === undefined || price_per_hr === "") {
      return NextResponse.json(
        { error: "name, category, and price_per_hr are required" },
        { status: 400 },
      );
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

    const { id, agentOwner, uri, pricePerHour } = event.args;
    const onChainId = String(id);

    const existing = await db
      .select()
      .from(AgentsTable)
      .where(eq(AgentsTable.on_chain_id, onChainId));
    if (existing.length > 0) {
      return NextResponse.json(agentRowToDto(existing[0]!), { status: 200 });
    }

    const onChainAgent = await getOnChainAgent(id);
    const chainOwner = onChainAgent[0];
    if (chainOwner.toLowerCase() !== agentOwner.toLowerCase()) {
      return NextResponse.json({ error: "On-chain owner mismatch" }, { status: 400 });
    }

    const path = storage_path ?? uri;
    const priceFromChain = formatEther(pricePerHour);
    const rawPrice =
      typeof price_per_hr === "string" ? price_per_hr : String(price_per_hr);
    let expectedWei: bigint;
    try {
      expectedWei = parseEther(rawPrice);
    } catch {
      return NextResponse.json(
        { error: "Invalid price_per_hr" },
        { status: 400 },
      );
    }
    if (expectedWei !== pricePerHour) {
      return NextResponse.json(
        { error: "price_per_hr does not match on-chain pricePerHour" },
        { status: 400 },
      );
    }

    const inserted = await db
      .insert(AgentsTable)
      .values({
        on_chain_id: onChainId,
        owner: agentOwner,
        storage_path: path,
        name,
        category,
        price_per_hr: priceFromChain,
      })
      .returning();

    return NextResponse.json(agentRowToDto(inserted[0]!), { status: 201 });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Publish failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
