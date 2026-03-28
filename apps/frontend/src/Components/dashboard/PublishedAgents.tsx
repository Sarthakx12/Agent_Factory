import type { Agent } from "@/lib/api";
import { AgentGrid } from "@/Components/marketplace/AgentGrid";

export function PublishedAgents({ agents }: { agents: Agent[] }) {
  return <AgentGrid agents={agents} />;
}
