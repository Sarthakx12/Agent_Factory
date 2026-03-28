"use client";
import Link from "next/link";
import { useState } from "react";

const agents = [
  { id: 1, name: "Weather Dao", category: "DATA", desc: "Real-time on-chain weather oracle. Aggregates meteorological feeds with verifiable data integrity and tamper-proof consensus.", price: "0.03", rating: "4.9", tasks: "54K" },
  { id: 2, name: "Code\nReview Pro", category: "ENGINEERING", desc: "Automated PR reviews with security scanning, best practices enforcement, and detailed inline comments. Supports JS, TS, Python, Rust, Go, Solidity.", price: "0.05", rating: "4.9", tasks: "12K" },
  { id: 3, name: "Pitch\nCoach", category: "CONTENT", desc: "AI-powered pitch deck advisor that analyzes slide structure, narrative flow, and investor appeal with actionable feedback.", price: "0.04", rating: "4.8", tasks: "8.1K" },
  { id: 4, name: "Draft\nAnalyzer", category: "LEGAL", desc: "Contract and legal document analysis. Identifies risk clauses, ambiguities, and non-standard terms across any jurisdiction.", price: "0.08", rating: "4.7", tasks: "3.2K" },
  { id: 5, name: "SQL\nWizard", category: "DATA", desc: "Natural language to optimized SQL. Works across PostgreSQL, MySQL, BigQuery, and Snowflake with auto-indexing suggestions.", price: "0.02", rating: "4.8", tasks: "29K" },
  { id: 6, name: "Travel\nPlanner", category: "LIFESTYLE", desc: "End-to-end trip planning with real-time availability, budget optimization, and preference-based routing across 190 countries.", price: "0.01", rating: "4.6", tasks: "71K" },
];

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const categories = ["ALL", "DATA", "ENGINEERING", "CONTENT", "LEGAL", "LIFESTYLE"];
  const filteredAgents = activeFilter === "ALL" ? agents : agents.filter(a => a.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>MARKETPLACE</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      <div style={{ padding: "0 48px 48px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header Area */}
        <div style={{
          paddingBottom: 40,
          marginBottom: 40,
          borderBottom: "1px solid var(--border)",
          display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 56, fontStyle: "italic", lineHeight: 1, color: "var(--ink)", marginBottom: 16 }}>Available Agents</h1>
            <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }}>{agents.length} active protocols verified on-chain. Filter by category or search by capabilities.</p>
          </div>
          <Link href="/publish" className="tall-pill-black" style={{ height: 40, width: "auto", padding: "0 24px", borderRadius: 30, textDecoration: "none" }}>+ PUBLISH</Link>
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: "6px 16px",
                fontSize: 10,
                fontFamily: "var(--mono)",
                letterSpacing: "0.05em",
                borderRadius: 30,
                background: activeFilter === cat ? "var(--ink)" : "transparent",
                color: activeFilter === cat ? "var(--bg)" : "var(--ink)",
                border: activeFilter === cat ? "1px solid var(--ink)" : "1px solid var(--border)",
                cursor: "pointer",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filteredAgents.map((agent, i) => (
            <Link href={`/agents/${agent.id}`} key={agent.id} style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                height: "100%",
                border: "1px solid var(--border)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s",
                background: "#fff"
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--ink)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 12 }}>{agent.category}</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.1 }}>{agent.name.replace("\n", " ")}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 32, flex: 1, color: "var(--ink-mid)", fontSize: 11, lineHeight: 1.6, fontFamily: "var(--mono)" }}>{agent.desc}</div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                  fontSize: 10,
                  fontFamily: "var(--mono)",
                  color: "var(--muted)"
                }}>
                  <span>{agent.price} MON/HR</span>
                  <span style={{ color: "var(--ink)" }}>{agent.tasks} TASKS</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
