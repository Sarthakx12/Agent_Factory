import { NextResponse } from "next/server";
import { getAgentRentedByUser } from "@/lib/server-contracts";

export async function GET(
  _req: Request,
  context: { params: Promise<{ address: string }> },
) {
  try {
    const { address } = await context.params;
    const rentals = await getAgentRentedByUser(address as `0x${string}`);
    return NextResponse.json(rentals);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list rentals" }, { status: 500 });
  }
}
