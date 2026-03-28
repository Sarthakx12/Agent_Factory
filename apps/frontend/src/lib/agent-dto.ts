import type { Agent } from "@/lib/api";

// Minimal inline type to avoid @repo/db dependency
export type AgentRow = {
  id: number;
  on_chain_id: string | null;
  owner: string;
  storage_path: string;
  name: string;
  category: string;
  price_per_hr: string | number;
  total_rentals: number;
};

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
