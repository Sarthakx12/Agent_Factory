"use client";

import { useParams } from "next/navigation";

export default function DocsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const curl = `curl -X POST http://localhost:3000/api/v1/agents/${id}/run \\
  -H "Content-Type: application/json" \\
  -d '{"input":"Hello","renter":"0xYourAddress"}'`;

  const copy = async () => {
    await navigator.clipboard.writeText(curl);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--muted)" }}>DOCS</span>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>AGENT {id}</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      <div style={{ padding: "64px 48px", maxWidth: 900, width: "100%" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 56, fontStyle: "italic", lineHeight: 1, color: "var(--ink)", marginBottom: 48 }}>
          API Docs.
        </h1>

        <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
          <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 12 }}>ENDPOINT</div>
            <code style={{ fontSize: 14, fontFamily: "var(--mono)", color: "var(--ink)" }}>POST /api/v1/agents/{`{id}`}/run</code>
          </div>
          <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 12 }}>REQUEST EXAMPLE</div>
            <pre style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--ink-mid)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{curl}</pre>
          </div>
          <div style={{ padding: "24px 32px" }}>
            <button
              onClick={copy}
              className="btn-black-pill"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              ⎘ COPY CURL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
