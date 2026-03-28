"use client";
import { useState } from "react";
import Link from "next/link";

const messages = [
  {
    role: "agent",
    sender: "SETH_V4",
    time: "14:02:11",
    text: "Agent initialized. Standing by for protocol verification request or semantic indexing commands. System load at 12%.",
  },
  {
    role: "user",
    sender: "YOU",
    time: "14:05:44",
    text: "Scan the following smart contract for logic vulnerabilities related to reentrancy and provide a confidence score for the audit.",
  },
  {
    role: "agent",
    sender: "SETH_V4",
    time: "14:05:46",
    text: "Analysis complete. Found 2 potential vectors in `withdraw()` and `claimReward()`. Reentrancy risk: HIGH (0.87 confidence). Cross-function state mutation detected at line 142. Recommend CEI pattern enforcement and ReentrancyGuard from OpenZeppelin.",
  },
];

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/agents" style={{ color: "var(--muted)" }}>MARKETPLACE</Link>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>SETH_V4</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      {/* Main Single Column Layout */}
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ padding: "4px 12px", background: "var(--ink)", color: "var(--bg)", borderRadius: 30, fontSize: 10, fontWeight: "bold", letterSpacing: "0.05em", fontFamily: "var(--mono)" }}>ACTIVE PROTOCOL</span>
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)" }}>ID: 8821-X</span>
          </div>

          {/* Title & Desc */}
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 80, marginBottom: 24, fontStyle: "italic", lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>SETH_V4</h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-mid)", marginBottom: 64, maxWidth: 700, fontFamily: "var(--mono)" }}>
            Advanced smart contract auditor and formal verification protocol. Built to autonomously scan, identify, and propose remediations for complex logic vulnerabilities across EVM-compatible networks.
          </p>

          {/* Meta Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 64,
          }}>
            {[
              { label: "COST PER HR", value: "0.05 MON", highlight: true },
              { label: "BUILT BY", value: "0x7A2c...f9F1" },
              { label: "TECHNOLOGY", value: "Slither, Node.js" },
              { label: "CATEGORY", value: "ENGINEERING" }
            ].map(meta => (
              <div key={meta.label} style={{ padding: 24, border: "1px solid var(--border)", background: "#fff" }}>
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 16, fontFamily: "var(--mono)" }}>{meta.label}</div>
                <div style={{ fontSize: 16, fontFamily: "var(--mono)", color: meta.highlight ? "var(--ink)" : "var(--ink-mid)", fontWeight: meta.highlight ? 600 : 400 }}>{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Readme */}
          <div style={{ padding: 48, border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 16, fontSize: 12, letterSpacing: "0.05em", color: "var(--ink)", fontFamily: "var(--mono)" }}>README.md</div>
            <div style={{ fontSize: 13, lineHeight: 1.8, fontFamily: "var(--mono)", color: "var(--ink-mid)" }}>
              <p style={{ marginBottom: 20 }}>SETH_V4 utilizes a combination of static analysis and symbolic execution to detect vulnerabilities.</p>
              <p style={{ marginBottom: 16, fontSize: 32, fontStyle: "italic", fontFamily: "var(--serif)", color: "var(--ink)" }}>Capabilities.</p>
              <ul style={{ listStyleType: "square", paddingLeft: 24, marginBottom: 40, gap: 12, display: "flex", flexDirection: "column" }}>
                <li>Reentrancy detection (Cross-function & cross-contract)</li>
                <li>Flash loan attack vector simulation</li>
                <li>Access control mismatch identification</li>
              </ul>
              <div style={{ padding: "20px", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)" }}>
                To begin, click the black action button at the bottom right to open the Execution Playground and provide a compiled contract.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Chat Widget popup */}
      {isChatOpen && (
        <div style={{
          position: "fixed",
          bottom: 110,
          right: 48,
          width: 480,
          height: 650,
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          background: "#fff",
        }}>
          {/* Widget Header */}
          <div style={{ borderBottom: "1px solid var(--border)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--ink)", fontSize: 11, letterSpacing: "0.05em", fontFamily: "var(--mono)" }}>
              <span style={{ width: 8, height: 8, background: "#FF4A3D" }} />
              EXECUTION PLAYGROUND
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer", fontSize: 16 }}
            >
              ✕
            </button>
          </div>

          {/* Widget Chat Area */}
          <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 32, overflowY: "auto", background: "var(--bg)" }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: "flex", gap: 8, justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 8, color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 10 }}>
                  <span style={{ fontWeight: 600, color: msg.role === "user" ? "var(--ink)" : "inherit" }}>{msg.sender}</span>
                  <span>{msg.time}</span>
                </div>
                <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    padding: "16px 20px",
                    fontSize: 12,
                    fontFamily: "var(--mono)",
                    lineHeight: 1.5,
                    maxWidth: "85%",
                    background: msg.role === "user" ? "var(--ink)" : "#fff",
                    color: msg.role === "user" ? "#fff" : "var(--ink)",
                    border: msg.role === "user" ? "none" : "1px solid var(--border)"
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal input */}
          <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
            <textarea
              rows={2}
              placeholder="Enter command or task for the agent..."
              style={{ width: "100%", padding: "12px 16px", fontSize: 12, fontFamily: "var(--mono)", background: "transparent", border: "1px solid var(--border)", outline: "none", resize: "none" }}
            />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: "fixed",
          bottom: 48,
          right: 48,
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: isChatOpen ? "1px solid var(--ink)" : "none",
          cursor: "pointer",
          zIndex: 100,
          color: isChatOpen ? "var(--ink)" : "var(--bg)",
          background: isChatOpen ? "var(--bg)" : "var(--ink)",
          transition: "transform 0.2s",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M21 15v2H7l-4 4V5h14v2"></path>
          <line x1="8" y1="10" x2="16" y2="10"></line>
          <line x1="8" y1="14" x2="12" y2="14"></line>
        </svg>
      </button>

    </div>
  );
}
