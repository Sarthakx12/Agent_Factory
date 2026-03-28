import { RetroCard } from "@/Components/ui/RetroCard";

export function StatsOverview({
  publishedCount,
  rentedCount,
  revenue,
}: {
  publishedCount: number;
  rentedCount: number;
  revenue: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <RetroCard>
        <p className="text-xs uppercase text-[var(--text-dim)]">Published Agents</p>
        <p className="text-2xl text-[var(--neon-cyan)]">{publishedCount}</p>
      </RetroCard>
      <RetroCard>
        <p className="text-xs uppercase text-[var(--text-dim)]">Active Rentals</p>
        <p className="text-2xl text-[var(--neon-cyan)]">{rentedCount}</p>
      </RetroCard>
      <RetroCard>
        <p className="text-xs uppercase text-[var(--text-dim)]">Revenue</p>
        <p className="text-2xl text-[var(--neon-amber)]">{revenue.toFixed(3)} MON</p>
      </RetroCard>
    </div>
  );
}
