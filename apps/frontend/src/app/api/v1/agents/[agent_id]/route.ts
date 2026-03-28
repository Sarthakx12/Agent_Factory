import { NextResponse } from "next/server";
import { db, AgentsTable } from "@repo/db";
import { eq } from "drizzle-orm";
import { agentRowToDto } from "@/lib/agent-dto";

export async function GET(
  _req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
    const rows = await db
      .select()
      .from(AgentsTable)
      .where(eq(AgentsTable.id, Number(agent_id)));
    if (rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(agentRowToDto(rows[0]!));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load agent" }, { status: 500 });
  }
}
