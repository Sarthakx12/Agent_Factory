"use client";
import Link from "next/link";

const agents = [
  { id: 1, name: "Weather Dao", category: "DATA", desc: "Real-time on-chain weather oracle. Aggregates meteorological feeds with verifiable data integrity and tamper-proof consensus.", price: "0.03", rating: "4.9", tasks: "54K" },
  { id: 2, name: "Code\nReview Pro", category: "ENGINEERING", desc: "Automated PR reviews with security scanning, best practices enforcement, and detailed inline comments. Supports JS, TS, Python, Rust, Go, Solidity.", price: "0.05", rating: "4.9", tasks: "12K" },
  { id: 3, name: "Pitch\nCoach", category: "CONTENT", desc: "AI-powered pitch deck advisor that analyzes slide structure, narrative flow, and investor appeal with actionable feedback.", price: "0.04", rating: "4.8", tasks: "8.1K" },
  { id: 4, name: "Draft\nAnalyzer", category: "LEGAL", desc: "Contract and legal document analysis. Identifies risk clauses, ambiguities, and non-standard terms across any jurisdiction.", price: "0.08", rating: "4.7", tasks: "3.2K" },
  { id: 5, name: "SQL\nWizard", category: "DATA", desc: "Natural language to optimized SQL. Works across PostgreSQL, MySQL, BigQuery, and Snowflake with auto-indexing suggestions.", price: "0.02", rating: "4.8", tasks: "29K" },
  { id: 6, name: "Travel\nPlanner", category: "LIFESTYLE", desc: "End-to-end trip planning with real-time availability, budget optimization, and preference-based routing across 190 countries.", price: "0.01", rating: "4.6", tasks: "71K" },
];

function AgentThumb({ name, category }: { name: string, category: string }) {
  const initials = name.replace(/\n/, " ").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  // Assign soft colors based on category
  const getGradient = (cat: string) => {
    switch (cat) {
      case "DATA": return "linear-gradient(135deg, #E8C09A, #E2DCC8)";
      case "ENGINEERING": return "linear-gradient(135deg, #A8B5CD, #DCE2EB)";
      case "CONTENT": return "linear-gradient(135deg, #E6B9B6, #F2E4DF)";
      case "LEGAL": return "linear-gradient(135deg, #D4CDD8, #EDE7F0)";
      default: return "linear-gradient(135deg, #C8D6C1, #E5EBE0)";
    }
  };

  return (
    <div style={{
      height: 140,
      background: getGradient(category),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      <span style={{ color: "rgba(0,0,0,0.6)", fontFamily: "var(--mono)", fontSize: 32, fontWeight: 500, letterSpacing: "0.05em" }}>
        {initials}
      </span>
      {/* Subtle overlay to enhance glass feel */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
      }} />
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Topbar */}
      <div className="topbar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.4)" }}>
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span className="breadcrumb-sep">MARKETPLACE</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* Section bar */}
      <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.2)" }}>
        <span>Available Agents — {agents.length} protocols</span>
        <Link href="/publish" className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 10, borderColor: "rgba(0,0,0,0.1)" }}>+ PUBLISH</Link>
      </div>

      {/* Search / Filters */}
      <div className="glass-panel" style={{
        padding: "16px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        display: "flex", gap: 12, alignItems: "center",
        background: "rgba(255,255,255,0.2)"
      }}>
        <input
          type="text"
          placeholder="SEARCH AGENTS..."
          className="form-input"
          style={{
            maxWidth: 280,
            background: "rgba(255,255,255,0.5)",
            borderColor: "rgba(255,255,255,0.8)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
          }}
        />
        {["ALL", "DATA", "ENGINEERING", "CONTENT", "LEGAL"].map(cat => (
          <button key={cat} className="btn btn-ghost" style={{
            padding: "5px 12px",
            fontSize: 10,
            background: cat === "ALL" ? "rgba(0,0,0,0.05)" : "transparent",
            borderColor: "rgba(0,0,0,0.1)"
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 28,
        padding: "40px 28px",
      }}>
        {agents.map((agent) => (
          <Link href={`/agents/${agent.id}`} key={agent.id} style={{ display: "block", textDecoration: "none" }}>
            <div className="glass-card" style={{ height: "100%", borderRadius: 4 }}>
              <AgentThumb name={agent.name} category={agent.category} />

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div className="agent-meta-label" style={{ marginBottom: 8 }}>{agent.category}</div>
                    <div className="agent-name" style={{ marginBottom: 0 }}>{agent.name.replace("\n", " ")}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span className="price-value">{agent.price} MON</span>
                    <span className="price-unit">/HR</span>
                  </div>
                </div>

                <div className="agent-desc" style={{ marginBottom: 24, flex: 1, color: "rgba(0,0,0,0.6)" }}>{agent.desc}</div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  fontSize: 10,
                  color: "var(--muted)"
                }}>
                  <span>★ {agent.rating} RATING</span>
                  <span>{agent.tasks} TASKS</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="site-footer glass-panel" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <span className="footer-brand">agent.market</span>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Docs</a>
          <a href="#">Status</a>
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
