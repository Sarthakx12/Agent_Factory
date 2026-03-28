"use client";

export default function PublishPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>PUBLISH</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      <div style={{ padding: "64px 48px", flex: 1, display: "flex", justifyContent: "center" }}>

        <div style={{ width: "100%", maxWidth: 640 }}>

          <div style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 64, fontStyle: "italic", margin: "0 0 16px 0", color: "var(--ink)", lineHeight: 1 }}>
              Publish<br />Agent.
            </h1>
            <p style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.6, fontFamily: "var(--mono)" }}>
              Deploy your AI agent configuration on-chain. The publishing fee of 0.1 MON
              is a one-time on-chain cost that registers your agent in the protocol registry.
            </p>
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { label: "AGENT NAME", placeholder: "e.g. SETH_V4", type: "text" },
              { label: "STORAGE URI", placeholder: "ipfs://Qm... or https://...", type: "text" },
              { label: "CATEGORY", placeholder: "ENGINEERING / DATA / CONTENT / SECURITY", type: "text" },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.05em", color: "var(--ink)", fontFamily: "var(--mono)", fontWeight: 600 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  style={{
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    padding: "8px 0",
                    background: "transparent",
                    fontSize: 16,
                    fontFamily: "var(--mono)",
                    color: "var(--ink)",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderBottom = "1px solid var(--ink)"}
                  onBlur={(e) => e.target.style.borderBottom = "1px solid var(--border)"}
                />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ fontSize: 10, letterSpacing: "0.05em", color: "var(--ink)", fontFamily: "var(--mono)", fontWeight: 600 }}>DESCRIPTION</label>
              <textarea
                rows={4}
                placeholder="Describe capabilities, limitations, and expected inputs..."
                style={{
                  border: "1px solid var(--border)",
                  padding: "16px",
                  background: "#fff",
                  fontSize: 13,
                  fontFamily: "var(--mono)",
                  color: "var(--ink)",
                  outline: "none",
                  resize: "vertical"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--ink)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>

            {/* Fee summary */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px 0",
              borderTop: "1px solid var(--border)",
              marginTop: 16
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", color: "var(--ink)", marginBottom: 8, fontFamily: "var(--mono)" }}>PUBLISH FEE</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>One-time on-chain registration</div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 40, fontStyle: "italic", color: "var(--ink)" }}>0.1 MON</div>
            </div>

            <button type="submit" className="tall-pill-black" style={{ width: "100%", height: 56, borderRadius: 30, fontSize: 12, marginTop: 16 }}>
              DEPLOY ON-CHAIN
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
