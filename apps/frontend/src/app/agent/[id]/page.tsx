"use client";

import { useState } from "react";
import Link from "next/link";
import { useAgent } from "@/hooks/useAgent";
import { useParams } from "next/navigation";

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { data: agent, isLoading } = useAgent(id);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (isLoading) {
    return (
      <div style={{ padding: "48px 48px", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>
        Loading agent telemetry...
      </div>
    );
  }

  if (!agent) {
    return (
      <div style={{ padding: "48px 48px", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>
        Agent not found.{" "}
        <Link href="/agents" style={{ color: "var(--ink)" }}>← Back to marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/agents" style={{ color: "var(--muted)" }}>MARKETPLACE</Link>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{agent.name.toUpperCase()}</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ padding: "4px 12px", background: "var(--ink)", color: "var(--bg)", borderRadius: 30, fontSize: 10, fontWeight: "bold", letterSpacing: "0.05em", fontFamily: "var(--mono)" }}>
              ACTIVE PROTOCOL
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)" }}>
              ID: {agent.onChainId ?? agent.id}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 80, marginBottom: 24, fontStyle: "italic", lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>
            {agent.name}
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-mid)", marginBottom: 64, maxWidth: 700, fontFamily: "var(--mono)" }}>
            {agent.description ?? "No description provided."}
          </p>

          {/* Meta Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 64 }}>
            {[
              { label: "COST PER HR", value: `${agent.pricePerHour} MON`, highlight: true },
              { label: "BUILT BY", value: agent.owner ? `${agent.owner.slice(0, 6)}...${agent.owner.slice(-4)}` : "—" },
              { label: "CATEGORY", value: agent.category },
              { label: "TOTAL RENTALS", value: String(agent.totalRentals) },
            ].map((meta) => (
              <div key={meta.label} style={{ padding: 24, border: "1px solid var(--border)", background: "#fff" }}>
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 16, fontFamily: "var(--mono)" }}>{meta.label}</div>
                <div style={{ fontSize: 16, fontFamily: "var(--mono)", color: meta.highlight ? "var(--ink)" : "var(--ink-mid)", fontWeight: meta.highlight ? 600 : 400 }}>{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Tools */}
          {agent.tools && agent.tools.length > 0 && (
            <div style={{ padding: 48, border: "1px solid var(--border)", background: "#fff" }}>
              <div style={{ marginBottom: 16, fontSize: 12, letterSpacing: "0.05em", color: "var(--ink)", fontFamily: "var(--mono)" }}>TOOLS</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {agent.tools.map((tool) => (
                  <span key={tool} style={{ padding: "4px 12px", border: "1px solid var(--border)", fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-mid)" }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chat Widget */}
      {isChatOpen && (
        <div style={{ position: "fixed", bottom: 110, right: 48, width: 480, height: 600, border: "1px solid var(--border)", background: "#fff", display: "flex", flexDirection: "column", zIndex: 100, boxShadow: "0 24px 64px rgba(0,0,0,0.1)" }}>
          <div style={{ borderBottom: "1px solid var(--border)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.05em" }}>EXECUTION PLAYGROUND</span>
            <button onClick={() => setIsChatOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: 24, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }}>
            Connect wallet to execute this agent.
          </div>
          <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border)" }}>
            <textarea rows={2} placeholder="Enter command or task..." style={{ width: "100%", padding: "12px 16px", fontSize: 12, fontFamily: "var(--mono)", border: "1px solid var(--border)", background: "transparent", outline: "none", resize: "none" }} />
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{ position: "fixed", bottom: 48, right: 48, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", border: isChatOpen ? "1px solid var(--ink)" : "none", cursor: "pointer", zIndex: 100, color: isChatOpen ? "var(--ink)" : "var(--bg)", background: isChatOpen ? "var(--bg)" : "var(--ink)", transition: "transform 0.2s" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
