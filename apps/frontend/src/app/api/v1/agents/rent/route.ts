import { NextResponse } from "next/server";
import { formatEther } from "viem";
import { db, RentalsTable, AgentsTable } from "@repo/db";
import { eq, sql } from "drizzle-orm";
import { publicClient, parseRentLogs } from "@/lib/server-contracts";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { tx_hash?: string };
    const { tx_hash } = body;

    if (!tx_hash) {
      return NextResponse.json({ error: "tx_hash is required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(RentalsTable)
      .where(eq(RentalsTable.tx_hash, tx_hash));
    if (existing.length > 0) {
      return NextResponse.json(existing[0]!, { status: 200 });
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

    const { agentId, renter, payment, expiresAt: expiresAtSec } = event.args;
    const onChainAgentId = Number(agentId);

    const block = await publicClient.getBlock({ blockNumber: receipt.blockNumber });
    const startedAt = new Date(Number(block.timestamp) * 1000);
    const expiresAt = new Date(Number(expiresAtSec) * 1000);
    const paymentStr = formatEther(payment);

    const agentRows = await db
      .select()
      .from(AgentsTable)
      .where(eq(AgentsTable.on_chain_id, String(onChainAgentId)));
    if (agentRows.length === 0) {
      return NextResponse.json({ error: "Agent not found in DB" }, { status: 404 });
    }

    const agentRow = agentRows[0]!;

    const rental = await db
      .insert(RentalsTable)
      .values({
        agent_id: agentRow.id,
        renter,
        expires_at: expiresAt,
        tx_hash,
        payment_amount: paymentStr,
        claimed: false,
        started_at: startedAt,
      })
      .returning();

    await db
      .update(AgentsTable)
      .set({ total_rentals: sql`${AgentsTable.total_rentals} + 1` })
      .where(eq(AgentsTable.id, agentRow.id));

    return NextResponse.json(rental[0]!, { status: 201 });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Rent indexing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
