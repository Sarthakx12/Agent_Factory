"use client";
import Link from "next/link";

const rentals = [
  { id: 1, name: "Code\nReview Pro", agentId: "SETH_V4", expiresIn: "6h 24m", status: "ACTIVE", cost: "0.05 MON/HR", category: "ENGINEERING" },
  { id: 2, name: "Data\nSynth", agentId: "SYNTH_02", expiresIn: "Expired", status: "EXPIRED", cost: "0.03 MON/HR", category: "DATA" },
];

const published = [
  { id: 3, name: "Research\nAgent", agentId: "RSCH_01", tasks: "9,700", earnings: "291 MON", status: "LIVE", category: "CONTENT" },
];

function AgentThumb({ name, category }: { name: string, category: string }) {
  const initials = name.replace(/\n/, " ").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const getGradient = (cat: string) => {
    switch (cat) {
      case "DATA": return "linear-gradient(135deg, #E8C09A, #E2DCC8)";
      case "ENGINEERING": return "linear-gradient(135deg, #A8B5CD, #DCE2EB)";
      case "CONTENT": return "linear-gradient(135deg, #E6B9B6, #F2E4DF)";
      default: return "linear-gradient(135deg, #C8D6C1, #E5EBE0)";
    }
  };

  return (
    <div style={{
      height: 100,
      background: getGradient(category),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      <span style={{ color: "rgba(0,0,0,0.6)", fontFamily: "var(--mono)", fontSize: 24, fontWeight: 500, letterSpacing: "0.05em" }}>
        {initials}
      </span>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
      }} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Topbar */}
      <div className="topbar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.4)" }}>
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>DEPLOYMENTS</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* Active Rentals */}
      <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.2)" }}>
        <span>Active Rentals</span>
        <Link href="/agents" className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 10 }}>+ NEW RENTAL</Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24,
        padding: "32px 28px",
      }}>
        {rentals.map((r) => (
          <Link href={`/agents/${r.id}`} key={r.id} style={{ display: "block", textDecoration: "none" }}>
            <div className="glass-card" style={{ height: "100%", borderRadius: 4 }}>
              <AgentThumb name={r.name} category={r.category} />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div className="agent-meta-label" style={{ marginBottom: 8 }}>{r.agentId} • {r.category}</div>
                    <div className="agent-name" style={{ marginBottom: 0 }}>{r.name.replace("\n", " ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className={`badge ${r.status === "ACTIVE" ? "badge-amber" : "badge-muted"}`}>
                      {r.status}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>COST</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{r.cost}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 10, color: "var(--muted)" }}>
                    {r.status === "ACTIVE" ? `Expires in ${r.expiresIn}` : "Access Expired"}
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Published Agents */}
      <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.2)", marginTop: 16 }}>
        <span>Published Agents</span>
        <Link href="/publish" className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 10 }}>+ PUBLISH</Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24,
        padding: "32px 28px",
        marginBottom: 40
      }}>
        {published.map((a) => (
          <Link href={`/agents/${a.id}`} key={a.id} style={{ display: "block", textDecoration: "none" }}>
            <div className="glass-card" style={{ height: "100%", borderRadius: 4 }}>
              <AgentThumb name={a.name} category={a.category} />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div className="agent-meta-label" style={{ marginBottom: 8 }}>{a.agentId} • {a.category}</div>
                    <div className="agent-name" style={{ marginBottom: 0 }}>{a.name.replace("\n", " ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge badge-dark">
                      {a.status}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>EARNINGS</div>
                    <div style={{ fontSize: 16, fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}>{a.earnings}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 10, color: "var(--muted)" }}>
                    {a.tasks} tasks completed
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="site-footer glass-panel" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <span className="footer-brand">agent.market</span>
        <div className="footer-links">
          <a href="#">Terms</a><a href="#">Docs</a><a href="#">Status</a>
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
