import { NextResponse } from "next/server";
import { getAgentRentedEvents } from "@/lib/server-contracts";

export async function GET(
  _req: Request,
  context: { params: Promise<{ agent_id: string }> },
) {
  try {
    const { agent_id } = await context.params;
    const rentals = await getAgentRentedEvents(BigInt(agent_id));
    return NextResponse.json(rentals);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list rentals" }, { status: 500 });
  }
}
