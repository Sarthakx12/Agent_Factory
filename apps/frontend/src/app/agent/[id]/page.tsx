"use client";

import { use } from "react";
import { AgentExecutor } from "@/Components/agent/AgentExecutor";
import { AgentHeader } from "@/Components/agent/AgentHeader";
import { RentPanel } from "@/Components/agent/RentPanel";
import { RentalStatus } from "@/Components/agent/RentalStatus";
import { RetroCard } from "@/Components/ui/RetroCard";
import { useAgent } from "@/hooks/useAgent";

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: agent, isLoading } = useAgent(id);

  if (isLoading) return <p>Loading agent telemetry...</p>;
  if (!agent) return <p>Agent not found.</p>;

  return (
    <div className="space-y-6">
      <AgentHeader agent={agent} />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <RetroCard className="space-y-3">
          <p className="text-sm text-[var(--text-dim)]">{agent.description}</p>
          <p className="text-xs uppercase text-[var(--text-dim)]">Tools</p>
          <ul className="list-disc pl-5 text-sm">
            {(agent.tools ?? []).map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <AgentExecutor id={id} />
        </RetroCard>
        <div className="space-y-4">
          <RentPanel onChainId={agent.onChainId} pricePerHour={agent.pricePerHour} />
          <RentalStatus progress={72} />
        </div>
      </div>
    </div>
  );
}
