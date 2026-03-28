"use client";
import Link from "next/link";

const rentals = [
  { id: 1, name: "Code\nReview Pro", agentId: "SETH_V4", expiresIn: "6h 24m", status: "ACTIVE", cost: "0.05 MON/HR", category: "ENGINEERING" },
  { id: 2, name: "Data\nSynth", agentId: "SYNTH_02", expiresIn: "Expired", status: "EXPIRED", cost: "0.03 MON/HR", category: "DATA" },
];

const published = [
  { id: 3, name: "Research\nAgent", agentId: "RSCH_01", tasks: "9,700", earnings: "291 MON", status: "LIVE", category: "CONTENT" },
];

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>DEPLOYMENTS</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      <div style={{ padding: "0 48px 48px", flex: 1, margin: "0 auto", width: "100%", maxWidth: 1400 }}>

        {/* Active Rentals Header */}
        <div style={{
          paddingBottom: 32,
          marginBottom: 32,
          borderBottom: "1px solid var(--border)",
          display: "flex", gap: 24, alignItems: "flex-end", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 48, fontStyle: "italic", lineHeight: 1, marginBottom: 16, color: "var(--ink)" }}>Active Rentals</h2>
            <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", margin: 0 }}>Currently executing or recently expired</p>
          </div>
          <Link href="/agents" className="tall-pill-white" style={{ height: 40, width: "auto", padding: "0 24px", borderRadius: 30, textDecoration: "none" }}>+ NEW RENTAL</Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24,
          marginBottom: 80,
        }}>
          {rentals.map((r, i) => (
            <Link href={`/agents/${r.id}`} key={r.id} style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                height: "100%",
                border: "1px solid var(--border)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                transition: "border-color 0.2s"
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--ink)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 16 }}>{r.agentId} • {r.category}</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)" }}>{r.name.replace("\n", " ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-block", padding: "4px 12px", border: `1px solid ${r.status === "ACTIVE" ? "var(--ink)" : "var(--border)"}`, color: r.status === "ACTIVE" ? "var(--ink)" : "var(--muted)", fontSize: 10, fontFamily: "var(--mono)" }}>
                      {r.status}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 4, fontFamily: "var(--mono)" }}>COST</div>
                    <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--ink)" }}>{r.cost}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)" }}>
                    {r.status === "ACTIVE" ? `Expires in ${r.expiresIn}` : "Access Expired"}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Published Agents Header */}
        <div style={{
          paddingBottom: 32,
          marginBottom: 32,
          borderBottom: "1px solid var(--border)",
          display: "flex", gap: 24, alignItems: "flex-end", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 48, fontStyle: "italic", lineHeight: 1, marginBottom: 16, color: "var(--ink)" }}>Published Agents</h2>
            <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", margin: 0 }}>Agents you are monetizing on the network</p>
          </div>
          <Link href="/publish" className="tall-pill-black" style={{ height: 40, width: "auto", padding: "0 24px", borderRadius: 30, textDecoration: "none" }}>+ PUBLISH AGENT</Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24,
          marginBottom: 80
        }}>
          {published.map((a, i) => (
            <Link href={`/agents/${a.id}`} key={a.id} style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                height: "100%",
                border: "1px solid var(--border)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                transition: "border-color 0.2s"
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--ink)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 16 }}>{a.agentId} • {a.category}</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)" }}>{a.name.replace("\n", " ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-block", padding: "4px 12px", border: "1px solid var(--border)", background: "var(--ink)", color: "var(--bg)", fontSize: 10, fontFamily: "var(--mono)" }}>
                      {a.status}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 4, fontFamily: "var(--mono)" }}>EARNINGS</div>
                    <div style={{ fontSize: 16, fontFamily: "var(--mono)", color: "var(--ink)" }}>{a.earnings}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)" }}>
                    {a.tasks} tasks completed
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
