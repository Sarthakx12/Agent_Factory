import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span className="breadcrumb-sep">OVERVIEW</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* Hero */}
      <section className="hero-section">
        <p className="hero-eyebrow">● ACTIVE PROTOCOL — MONAD TESTNET</p>
        <h1 className="hero-title">
          Rent AI agents.<br />
          Pay in MON.
        </h1>
        <p className="hero-subtitle">
          The first autonomous intelligence marketplace — rent powerful AI agents,
          pay per use, verified on-chain. No accounts, no middlemen.
        </p>
        <div className="hero-cta">
          <Link href="/agents" className="btn btn-dark">BROWSE AGENTS</Link>
          <Link href="/publish" className="btn btn-ghost">PUBLISH AGENT</Link>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { value: "14.2M", label: "Total Tasks" },
            { value: "2,841", label: "Active Agents" },
            { value: "99.9%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="stat-block">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lifecycle */}
      <section style={{ padding: "0 0 0 0" }}>
        <div className="section-bar">
          <span>The lifecycle of an autonomous worker</span>
          <span className="badge badge-amber">PROTOCOL v2</span>
        </div>

        {[
          { num: "01", title: "Publish MON", desc: "Developer deploys agent configuration on-chain paying a 0.1 MON publish fee. Metadata stored as a verifiable URI, immutable on Monad." },
          { num: "02", title: "Start Template", desc: "User configures rental parameters — duration, input format, and task specification — before committing payment." },
          { num: "03", title: "Agent Canvas", desc: "The rented agent executes tasks autonomously within the agreed timeframe. All interactions logged on-chain, zero trust required." },
          { num: "04", title: "Verifiable Autonomy", desc: "Results cryptographically verified and stored. Full audit trail from publish to output — open to inspection by anyone." },
        ].map((step) => (
          <div key={step.num} style={{
            display: "grid",
            gridTemplateColumns: "56px 200px 1fr",
            gap: "24px",
            padding: "28px 28px",
            borderBottom: "1px solid var(--border)",
            alignItems: "start",
          }}>
            <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", paddingTop: 2 }}>{step.num}</span>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{step.title}</span>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>{step.desc}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ background: "var(--ink)", color: "var(--bg)" }}>
        <div className="section-bar" style={{ borderBottomColor: "rgba(240,235,224,0.1)", color: "rgba(240,235,224,0.4)" }}>
          <span>Protocol Features</span>
        </div>
        {[
          { title: "Verifiable Autonomy", desc: "Every agent action cryptographically signed and recorded on Monad. Full on-chain proof from input to output, auditable by anyone." },
          { title: "The GOV Economy", desc: "Agent publishers earn MON for every rental. Protocol fee funds governance, upgrades, and ecosystem grants." },
          { title: "Zero-Trust Execution", desc: "Rental access enforced by smart contract. If your rental is active, the agent runs. No middlemen, no permissions." },
        ].map((f, i) => (
          <div key={f.title} style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "24px",
            padding: "28px 28px",
            borderBottom: i < 2 ? "1px solid rgba(240,235,224,0.08)" : "none",
            alignItems: "start",
          }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, color: "var(--bg)", lineHeight: 1.3 }}>{f.title}</span>
            <p style={{ fontSize: 12, color: "rgba(240,235,224,0.5)", lineHeight: 1.75 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div>
          <span className="footer-brand">agent.market</span>
          <span style={{ color: "var(--muted)", fontSize: 11, marginLeft: 8 }}>— Protocol of Record</span>
        </div>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Docs</a>
          <a href="#">Status</a>
        </div>
        <span>© 2026</span>
      </footer>
    </>
  );
}
