"use client";

import { useState } from "react";
import { PublishedAgents } from "@/Components/dashboard/PublishedAgents";
import { RentedAgents } from "@/Components/dashboard/RentedAgents";
import { StatsOverview } from "@/Components/dashboard/StatsOverview";
import { GlitchText } from "@/Components/ui/GlitchText";
import { useDashboard } from "@/hooks/useDashboard";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [tab, setTab] = useState<"published" | "rented">("published");
  const { data } = useDashboard();
  const published = data?.published ?? [];
  const rented = data?.rented ?? [];
  const revenue = published.reduce((acc, item) => acc + item.pricePerHour * item.totalRentals, 0);

  return (
    <div className="space-y-6">
      <GlitchText>Dashboard</GlitchText>
      <StatsOverview publishedCount={published.length} rentedCount={rented.length} revenue={revenue} />
      <div className="flex gap-2">
        <button
          className={cn("rounded border px-3 py-2 text-xs uppercase tracking-[0.14em]", tab === "published" ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)]" : "border-[var(--grid-line)]")}
          onClick={() => setTab("published")}
        >
          Published
        </button>
        <button
          className={cn("rounded border px-3 py-2 text-xs uppercase tracking-[0.14em]", tab === "rented" ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)]" : "border-[var(--grid-line)]")}
          onClick={() => setTab("rented")}
        >
          Rented
        </button>
      </div>
      {tab === "published" ? <PublishedAgents agents={published} /> : <RentedAgents agents={rented} />}
    </div>
  );
}
