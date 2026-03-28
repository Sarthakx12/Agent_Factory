const stats = [
  { value: "14.2M", label: "Total Tasks Completed" },
  { value: "2,841", label: "Active Agents" },
  { value: "99.9%", label: "Uptime Reliability" },
];

export default function StatsRow() {
  return (
    <section style={{
      background: "var(--cream)",
      padding: "80px 0",
      borderBottom: "1px solid var(--cream-border)",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              padding: "40px 40px",
              borderLeft: i !== 0 ? "1px solid var(--cream-border)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              <span style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "var(--ink)",
              }}>{stat.value}</span>
              <span className="label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
