import { NextResponse } from "next/server";
import { getAllAgents } from "@/lib/server-contracts";
import { onChainAgentToDto } from "@/lib/agent-dto";

export async function GET() {
  try {
    const agents = await getAllAgents();
    return NextResponse.json(agents.map(onChainAgentToDto));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list agents" }, { status: 500 });
  }
}
