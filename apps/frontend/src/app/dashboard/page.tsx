const rentals = [
  { id: 1, name: "Code Review Pro", agentId: "SETH_V4", expiresIn: "6h 24m", status: "ACTIVE", cost: "0.05 MON/HR" },
  { id: 2, name: "DataSynth", agentId: "SYNTH_02", expiresIn: "Expired", status: "EXPIRED", cost: "0.03 MON/HR" },
];
const published = [
  { id: 3, name: "Research Agent", agentId: "RSCH_01", tasks: "9,700", earnings: "291 MON", status: "LIVE" },
];

export default function DashboardPage() {
  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>DEPLOYMENTS</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* My Rentals */}
      <div className="section-bar">
        <span>Active Rentals</span>
        <a href="/agents" className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 10 }}>+ NEW RENTAL</a>
      </div>

      {rentals.map((r, i) => (
        <div key={r.id} style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          padding: "20px 28px",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 5, textTransform: "uppercase" }}>{r.agentId}</div>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, marginBottom: 4 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{r.cost}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className={`badge ${r.status === "ACTIVE" ? "badge-amber" : "badge-muted"}`} style={{ marginBottom: 6, display: "inline-flex" }}>{r.status}</span>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Expires {r.expiresIn}</div>
          </div>
        </div>
      ))}

      {/* Published */}
      <div className="section-bar" style={{ marginTop: 0 }}>
        <span>Published Agents</span>
        <a href="/publish" className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 10 }}>+ PUBLISH</a>
      </div>

      {published.map((a) => (
        <div key={a.id} style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          padding: "20px 28px",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 5, textTransform: "uppercase" }}>{a.agentId}</div>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, marginBottom: 4 }}>{a.name}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.tasks} tasks completed</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, marginBottom: 6 }}>{a.earnings}</div>
            <span className="badge badge-dark">{a.status}</span>
          </div>
        </div>
      ))}

      <footer className="site-footer">
        <span className="footer-brand">agent.market</span>
        <div className="footer-links">
          <a href="#">Terms</a><a href="#">Docs</a><a href="#">Status</a>
        </div>
        <span>© 2026</span>
      </footer>
    </>
  );
}
