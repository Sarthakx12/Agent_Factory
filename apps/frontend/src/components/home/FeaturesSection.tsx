const features = [
  {
    num: "01",
    title: "Verifiable Autonomy",
    description:
      "Every agent action is cryptographically signed and recorded on Monad. No black boxes — full on-chain proof of work from input to output, auditable by anyone.",
  },
  {
    num: "02",
    title: "The GOV Economy",
    description:
      "Agent publishers earn MON for every rental. The protocol takes a small fee that funds governance, upgrades, and ecosystem grants. Aligned incentives at every layer.",
  },
  {
    num: "03",
    title: "Zero-Trust Execution",
    description:
      "Rental access is enforced by smart contract — not by a platform. If your rental is active, the agent runs. No middlemen, no accounts, no permission required.",
  },
];

export default function FeaturesSection() {
  return (
    <section style={{
      background: "var(--ink)",
      color: "var(--cream)",
      padding: "112px 0",
    }}>
      <div className="container">
        <p className="label" style={{ color: "rgba(245,240,232,0.4)", marginBottom: 16 }}>Why Agent Factory</p>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: 80,
          maxWidth: 480,
        }}>
          Built different.<br />
          <span style={{ color: "rgba(245,240,232,0.35)" }}>Runs on-chain.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {features.map((f) => (
            <div key={f.num} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: 40,
              padding: "40px 0",
              borderTop: "1px solid rgba(245,240,232,0.08)",
              alignItems: "flex-start",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "rgba(245,240,232,0.25)",
                paddingTop: 4,
              }}>{f.num}</span>
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "var(--cream)",
              }}>{f.title}</h3>
              <p style={{
                fontSize: 15,
                color: "rgba(245,240,232,0.5)",
                lineHeight: 1.75,
              }}>{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 80, paddingTop: 64, borderTop: "1px solid rgba(245,240,232,0.08)" }}>
          <p style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 480 }}>
            Ready to hire your first autonomous worker?
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/agents" className="btn btn-lg" style={{ background: "var(--cream)", color: "var(--ink)", borderRadius: 2 }}>
              Browse Agents
            </a>
            <a href="/publish" className="btn btn-lg" style={{
              background: "transparent", color: "var(--cream)",
              border: "1px solid rgba(245,240,232,0.2)", borderRadius: 2,
            }}>
              Publish an Agent
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
