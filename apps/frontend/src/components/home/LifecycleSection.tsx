const steps = [
  {
    num: "01",
    title: "Publish MON",
    description:
      "Developers deploy their AI agent configuration on-chain by paying a 0.1 MON publish fee. The agent metadata is stored as a verifiable URI.",
  },
  {
    num: "02",
    title: "Start Template",
    description:
      "Users browse the marketplace and configure their rental parameters — duration, input format, and task requirements — before committing.",
  },
  {
    num: "03",
    title: "Agent Canvas",
    description:
      "The rented agent executes tasks autonomously within the agreed timeframe. All interactions are logged and verifiable on Monad.",
  },
  {
    num: "04",
    title: "Verifiable Autonomy",
    description:
      "Results are cryptographically verified and stored on-chain. Full audit trail from publish to output — zero trust required.",
  },
];

export default function LifecycleSection() {
  return (
    <section style={{
      background: "var(--cream)",
      padding: "112px 0",
      borderBottom: "1px solid var(--cream-border)",
    }}>
      <div className="container">
        {/* Heading */}
        <div style={{ marginBottom: 80 }}>
          <p className="label" style={{ marginBottom: 16 }}>How it works</p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            maxWidth: 560,
          }}>
            The lifecycle of an<br />autonomous worker
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: 40,
              padding: "40px 0",
              borderTop: "1px solid var(--cream-border)",
              alignItems: "flex-start",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted-light)",
                paddingTop: 4,
              }}>{step.num}</span>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
                alignItems: "start",
              }}>
                <h3 style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}>{step.title}</h3>
                <p style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
