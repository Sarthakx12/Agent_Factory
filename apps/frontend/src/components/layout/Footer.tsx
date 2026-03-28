import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--cream-border)",
      padding: "48px 0 32px",
      marginTop: "auto",
    }}>
      <div className="container">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 32,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 24, height: 24,
                background: "var(--ink)",
                borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "var(--cream)", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)" }}>AF</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Agent Factory</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 240, lineHeight: 1.6 }}>
              The first autonomous intelligence marketplace on Monad.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <p className="label" style={{ marginBottom: 16 }}>Product</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ label: "Marketplace", href: "/agents" }, { label: "Publish Agent", href: "/publish" }, { label: "Dashboard", href: "/dashboard" }].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, color: "var(--muted)" }}>{l.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="label" style={{ marginBottom: 16 }}>Resources</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ label: "Docs", href: "#" }, { label: "GitHub", href: "#" }, { label: "Twitter / X", href: "#" }].map(l => (
                  <Link key={l.label} href={l.href} style={{ fontSize: 13, color: "var(--muted)" }}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--muted-light)" }}>© 2026 Agent Factory. All rights reserved.</p>
          <p className="label" style={{ fontSize: 10 }}>Built on Monad</p>
        </div>
      </div>
    </footer>
  );
}
