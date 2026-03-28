import { NextResponse } from "next/server";
import { getOnChainAgent, formatOnChainAgent } from "@/lib/server-contracts";
import { onChainAgentToDto } from "@/lib/agent-dto";

export async function GET(
  _req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
    const id = BigInt(agent_id);
    const [owner, uri, pricePerHour, active] = await getOnChainAgent(id);
    const agent = formatOnChainAgent(Number(id), owner, uri, pricePerHour, active);
    return NextResponse.json(onChainAgentToDto(agent));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
}
