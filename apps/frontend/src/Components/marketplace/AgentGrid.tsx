import type { Agent } from "@/lib/api";
import { AgentCard } from "./AgentCard";

export function AgentGrid({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
