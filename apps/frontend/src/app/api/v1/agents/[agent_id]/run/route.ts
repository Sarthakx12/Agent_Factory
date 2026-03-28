import { NextResponse } from "next/server";
import { db, RentalsTable, AgentsTable } from "@repo/db";
import { eq, and, gt, sql } from "drizzle-orm";
import { isRentalActive } from "@/lib/server-contracts";

export async function POST(
  req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
    const body = (await req.json()) as { input?: string; renter?: string };
    const { input, renter } = body;

    if (!input?.trim()) {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }
    if (!renter) {
      return NextResponse.json({ error: "renter is required" }, { status: 400 });
    }

    const agentRows = await db
      .select()
      .from(AgentsTable)
      .where(eq(AgentsTable.id, Number(agent_id)));
    if (agentRows.length === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const onChainId = agentRows[0]!.on_chain_id;
    if (!onChainId) {
      return NextResponse.json(
        { error: "Agent has no on-chain ID" },
        { status: 400 },
      );
    }

    const onChainOk = await isRentalActive(
      BigInt(onChainId),
      renter as `0x${string}`,
    );

    if (!onChainOk) {
      return NextResponse.json(
        { error: "No active rental on-chain" },
        { status: 403 },
      );
    }

    const dbRental = await db
      .select()
      .from(RentalsTable)
      .where(
        and(
          eq(RentalsTable.agent_id, Number(agent_id)),
          eq(RentalsTable.renter, renter),
          gt(RentalsTable.expires_at, new Date()),
        ),
      );

    if (dbRental.length === 0) {
      return NextResponse.json(
        { error: "No active rental in database" },
        { status: 403 },
      );
    }

    const output = `Agent #${agent_id} processed: "${input}"`;

    await db
      .update(RentalsTable)
      .set({ calls_made: sql`${RentalsTable.calls_made} + 1` })
      .where(eq(RentalsTable.id, dbRental[0]!.id));

    return NextResponse.json({ output });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Run failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
