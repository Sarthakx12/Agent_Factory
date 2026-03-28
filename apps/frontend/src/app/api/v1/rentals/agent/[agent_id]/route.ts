import { NextResponse } from "next/server";
import { db, RentalsTable } from "@repo/db";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
    const rentals = await db
      .select()
      .from(RentalsTable)
      .where(eq(RentalsTable.agent_id, Number(agent_id)));
    return NextResponse.json(rentals);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list rentals" }, { status: 500 });
  }
}
