import Link from "next/link";
import { RetroBadge } from "@/Components/ui/RetroBadge";
import { RetroButton } from "@/Components/ui/RetroButton";
import { RetroCard } from "@/Components/ui/RetroCard";
import type { Agent } from "@/lib/api";
import { shortAddress } from "@/lib/utils";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <RetroCard className="h-full">
      <div className="mb-3 flex items-center justify-between">
        <RetroBadge>{agent.category}</RetroBadge>
        <span className="text-[11px] text-[var(--text-dim)]">{agent.pricePerHour} MON/hr</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.08em]">{agent.name}</h3>
      <p className="mb-3 text-sm text-[var(--text-dim)]">{agent.description}</p>
      <p className="mb-4 text-[11px] text-[var(--text-dim)]">Owner: {shortAddress(agent.owner)}</p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[var(--neon-amber)]">{agent.totalRentals} rentals</span>
        <Link href={`/agent/${agent.id}`}>
          <RetroButton>View Details</RetroButton>
        </Link>
      </div>
    </RetroCard>
  );
}
