import { NextResponse } from "next/server";
import { db, RentalsTable, AgentsTable } from "@repo/db";
import { and, desc, eq, sql } from "drizzle-orm";
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

    const dup = await db
      .select()
      .from(RentalsTable)
      .where(eq(RentalsTable.claim_tx_hash, tx_hash));
    if (dup.length > 0) {
      return NextResponse.json(dup[0]!, { status: 200 });
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
    const onChainId = String(agentId);

    const agentRows = await db
      .select()
      .from(AgentsTable)
      .where(eq(AgentsTable.on_chain_id, onChainId));
    if (agentRows.length === 0) {
      return NextResponse.json({ error: "Agent not found in DB" }, { status: 404 });
    }

    const agentRow = agentRows[0]!;
    if (Number(agent_id) !== agentRow.id) {
      return NextResponse.json(
        { error: "agent_id does not match on-chain agent" },
        { status: 400 },
      );
    }

    if (agentRow.owner.toLowerCase() !== publisher.toLowerCase()) {
      return NextResponse.json(
        { error: "Publisher does not match agent owner" },
        { status: 400 },
      );
    }

    const renterLc = renter.toLowerCase();
    const pending = await db
      .select()
      .from(RentalsTable)
      .where(
        and(
          eq(RentalsTable.agent_id, agentRow.id),
          sql`lower(${RentalsTable.renter}) = ${renterLc}`,
          eq(RentalsTable.claimed, false),
        ),
      )
      .orderBy(desc(RentalsTable.id))
      .limit(1);

    if (pending.length === 0) {
      return NextResponse.json(
        { error: "No unclaimed rental found for this renter" },
        { status: 404 },
      );
    }

    const row = pending[0]!;
    const now = new Date();
    if (row.expires_at > now) {
      return NextResponse.json(
        { error: "Rental has not expired yet" },
        { status: 400 },
      );
    }

    const [updated] = await db
      .update(RentalsTable)
      .set({ claimed: true, claim_tx_hash: tx_hash })
      .where(eq(RentalsTable.id, row.id))
      .returning();

    return NextResponse.json(updated!, { status: 200 });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Claim indexing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
