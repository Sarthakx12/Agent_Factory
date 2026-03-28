import { NextResponse } from "next/server";
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

    // Check on-chain rental status — single source of truth
    const onChainOk = await isRentalActive(
      BigInt(agent_id),
      renter as `0x${string}`,
    );

    if (!onChainOk) {
      return NextResponse.json(
        { error: "No active rental on-chain" },
        { status: 403 },
      );
    }

    // TODO: plug in real agent execution logic here
    const output = `Agent #${agent_id} processed: "${input}"`;

    return NextResponse.json({ output });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Run failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
