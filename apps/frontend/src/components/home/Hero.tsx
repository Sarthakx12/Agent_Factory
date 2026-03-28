"use client";
export default function Hero() {
  return (
    <section style={{
      background: "var(--ink)",
      color: "var(--cream)",
      padding: "160px 0 100px",
      minHeight: "85vh",
      display: "flex",
      alignItems: "center",
    }}>
      <div className="container">
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#6EE7B7",
            boxShadow: "0 0 8px #6EE7B7",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.5)",
          }}>Powered by Monad</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(52px, 9vw, 112px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          marginBottom: 32,
          maxWidth: 900,
        }}>
          Rent AI agents.<br />
          <span style={{ color: "rgba(245,240,232,0.4)" }}>Pay in MON.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "clamp(16px, 2.2vw, 20px)",
          color: "rgba(245,240,232,0.55)",
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 52,
        }}>
          The first autonomous intelligence marketplace — rent powerful AI agents,
          pay per use, verified on-chain.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/agents" className="btn btn-lg" style={{
            background: "var(--cream)",
            color: "var(--ink)",
            borderRadius: 2,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EDE8DF")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--cream)")}
          >
            Browse Agents
          </a>
          <a href="/publish" className="btn btn-lg" style={{
            background: "transparent",
            color: "var(--cream)",
            border: "1px solid rgba(245,240,232,0.2)",
            borderRadius: 2,
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)")}
          >
            Publish an Agent
          </a>
        </div>
      </div>
    </section>
  );
}
