"use client";

export default function PublishPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Topbar */}
      <div className="topbar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.4)" }}>
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>PUBLISH</span>
          <span className="breadcrumb-sep">/</span>
          <span>NEW AGENT</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.2)" }}>
        <span>Publish Protocol</span>
        <span className="badge badge-amber">0.1 MON FEE</span>
      </div>

      <div style={{ padding: "40px 28px", display: "flex", justifyContent: "center" }}>

        {/* Form Container */}
        <div className="glass-card" style={{ width: "100%", maxWidth: 640, padding: "40px 48px", borderRadius: 4 }}>

          <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic", marginBottom: 16 }}>
            Deploy Agent
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 40 }}>
            Deploy your AI agent configuration on-chain. The publishing fee of 0.1 MON
            is a one-time on-chain cost that registers your agent in the protocol registry.
          </p>

          <form style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "AGENT NAME", placeholder: "e.g. SETH_V4", type: "text" },
              { label: "STORAGE URI", placeholder: "ipfs://Qm... or https://...", type: "text" },
              { label: "CATEGORY", placeholder: "ENGINEERING / DATA / CONTENT / SECURITY", type: "text" },
            ].map((f) => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="form-input"
                  style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
                />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">DESCRIPTION</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Describe capabilities, limitations, and expected inputs..."
                style={{ resize: "vertical", background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
              />
            </div>

            {/* Fee summary */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              background: "rgba(237, 231, 220, 0.4)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 2,
              marginBottom: 32,
              marginTop: 16
            }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>PUBLISH FEE</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>One-time on-chain registration</div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic", color: "var(--ink)" }}>0.1 MON</div>
            </div>

            <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 12 }}>
              DEPLOY AGENT ON-CHAIN
            </button>
          </form>

        </div>
      </div>

      <footer className="site-footer glass-panel" style={{ borderTop: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.4)" }}>
        <span className="footer-brand">agent.market</span>
        <div className="footer-links">
          <a href="#">Terms</a><a href="#">Docs</a><a href="#">Status</a>
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
