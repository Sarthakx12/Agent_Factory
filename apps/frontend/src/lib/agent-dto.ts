import { AgentsTable } from "@repo/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { Agent } from "@/lib/api";

export type AgentRow = InferSelectModel<typeof AgentsTable>;

export function agentRowToDto(row: AgentRow): Agent {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    owner: row.owner,
    description: undefined,
    pricePerHour: Number(row.price_per_hr),
    totalRentals: row.total_rentals,
    providers: [],
    tools: [],
    onChainId: row.on_chain_id ?? undefined,
    storagePath: row.storage_path,
  };
}
