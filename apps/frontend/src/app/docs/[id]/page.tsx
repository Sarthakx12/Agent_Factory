"use client";

import { use } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { GlitchText } from "@/Components/ui/GlitchText";
import { RetroButton } from "@/Components/ui/RetroButton";
import { RetroCard } from "@/Components/ui/RetroCard";

export default function DocsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const curl = `curl -X POST http://localhost:3000/api/v1/agents/${id}/run -H "Content-Type: application/json" -d '{"input":"Hello","renter":"0xYourAddress"}'`;

  const copy = async () => {
    await navigator.clipboard.writeText(curl);
    toast.success("cURL copied");
  };

  return (
    <div className="space-y-6">
      <GlitchText>API Docs: Agent {id}</GlitchText>
      <RetroCard className="space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">Endpoint</p>
        <code className="block rounded bg-black/40 p-3 text-sm text-[var(--neon-cyan)]">
          POST /api/v1/agents/{id}/run
        </code>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">Request Example</p>
        <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-[var(--neon-amber)]">{curl}</pre>
        <RetroButton onClick={copy}>
          <Copy size={14} className="mr-2" />
          Copy cURL
        </RetroButton>
      </RetroCard>
    </div>
  );
}
