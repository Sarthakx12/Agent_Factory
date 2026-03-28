"use client";

export default function PublishPage() {
  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>PUBLISH</span>
          <span className="breadcrumb-sep">/</span>
          <span>NEW AGENT</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      <div className="section-bar">
        <span>Publish Protocol</span>
        <span className="badge badge-amber">0.1 MON FEE</span>
      </div>

      <div style={{ padding: "40px 28px", maxWidth: 600 }}>
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75, marginBottom: 40 }}>
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
              <input type={f.type} placeholder={f.placeholder} className="form-input" />
            </div>
          ))}

          <div className="form-group">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Describe capabilities, limitations, and expected inputs..."
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Fee summary */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            marginBottom: 24,
          }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>PUBLISH FEE</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>One-time on-chain registration</div>
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>0.1 MON</div>
          </div>

          <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: 14 }}>
            DEPLOY AGENT
          </button>
        </form>
      </div>

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
