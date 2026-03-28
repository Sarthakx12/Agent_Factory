import type { Agent } from "@/lib/api";
import { RetroCard } from "@/Components/ui/RetroCard";
import { GaugeTimer } from "@/Components/ui/GaugeTimer";

export function RentedAgents({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {agents.map((agent) => (
        <RetroCard key={agent.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase">{agent.name}</p>
            <p className="text-xs text-[var(--text-dim)]">{agent.category}</p>
          </div>
          <GaugeTimer progress={64} />
        </RetroCard>
      ))}
    </div>
  );
}
