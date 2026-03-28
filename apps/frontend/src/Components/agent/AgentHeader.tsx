import { RetroBadge } from "@/Components/ui/RetroBadge";
import { GlitchText } from "@/Components/ui/GlitchText";
import type { Agent } from "@/lib/api";
import { shortAddress } from "@/lib/utils";

export function AgentHeader({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-3">
      <GlitchText className="text-2xl">{agent.name}</GlitchText>
      <div className="flex flex-wrap items-center gap-2">
        <RetroBadge>{agent.category}</RetroBadge>
        {agent.providers.map((provider) => (
          <RetroBadge key={provider} className="border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
            {provider}
          </RetroBadge>
        ))}
        <span className="text-xs text-[var(--text-dim)]">Owner: {shortAddress(agent.owner)}</span>
      </div>
    </div>
  );
}
