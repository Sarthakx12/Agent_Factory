import { NextResponse } from "next/server";
import { db, AgentsTable } from "@repo/db";
import { agentRowToDto } from "@/lib/agent-dto";

export async function GET() {
  try {
    const rows = await db.select().from(AgentsTable);
    return NextResponse.json(rows.map(agentRowToDto));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list agents" }, { status: 500 });
  }
}
