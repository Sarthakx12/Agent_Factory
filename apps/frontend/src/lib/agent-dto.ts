import type { OnChainAgent } from "@/lib/server-contracts";
import type { Agent } from "@/lib/api";

export function onChainAgentToDto(agent: OnChainAgent): Agent {
  return {
    id: agent.id,
    name: agent.name,
    category: agent.category,
    owner: agent.owner,
    description: agent.description,
    pricePerHour: Number(agent.pricePerHour),
    totalRentals: 0, // will be enriched by event logs when needed
    providers: [],
    tools: [],
    onChainId: String(agent.id),
    storagePath: agent.uri,
    active: agent.active,
  };
}
