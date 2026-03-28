"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { AgentGrid } from "@/Components/marketplace/AgentGrid";
import { CategoryFilter } from "@/Components/marketplace/CategoryFilter";
import { SearchBar } from "@/Components/marketplace/SearchBar";
import { GlitchText } from "@/Components/ui/GlitchText";
import { LoadingSkeleton } from "@/Components/ui/LoadingSkeleton";
import { NeonDivider } from "@/Components/ui/NeonDivider";
import { useAgents } from "@/hooks/useAgents";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { data, isLoading } = useAgents();

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((agent) => {
      const matchesCategory = category === "all" || agent.category === category;
      const matchesQuery = agent.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, data, query]);

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <GlitchText className="font-[var(--font-orbitron)] text-4xl">Monad Agent Marketplace</GlitchText>
        <p className="max-w-3xl text-sm tracking-[0.08em] text-[var(--text-dim)]">
          Mission control for rentable AI agents. Publish with MON, discover instantly, execute in real time.
        </p>
        <NeonDivider />
      </motion.section>
      <section className="space-y-4">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter active={category} onChange={setCategory} />
      </section>
      {isLoading ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-44 rounded-xl" />
          ))}
        </section>
      ) : (
        <AgentGrid agents={filtered} />
      )}
      {!isLoading && filtered.length === 0 && (
        <p className="text-sm text-[var(--text-dim)]">No agents found for the current filter.</p>
      )}
    </div>
  );
}
