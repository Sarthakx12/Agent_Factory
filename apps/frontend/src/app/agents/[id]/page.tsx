"use client";
import { useState } from "react";

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
      <div className="topbar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.4)" }}>
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>DEPLOYMENTS</span>
          <span className="breadcrumb-sep">/</span>
          <span>SETH_V4</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* Main Single Column Layout */}
      <div style={{ flex: 1, overflowY: "auto", padding: "64px 28px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span className="badge badge-amber">ACTIVE PROTOCOL</span>
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>ID: 8821-X</span>
          </div>

          {/* Title & Desc */}
          <h1 className="agent-name" style={{ fontSize: 48, marginBottom: 20 }}>SETH_V4</h1>
          <p className="agent-desc" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", marginBottom: 48 }}>
            Advanced smart contract auditor and formal verification protocol. Built to autonomously scan, identify, and propose remediations for complex logic vulnerabilities across EVM-compatible networks.
          </p>

          {/* Meta Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginBottom: 56,
            padding: "32px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.4)"
          }} className="glass-card">
            <div>
              <div className="agent-meta-label">COST PER HR</div>
              <div style={{ fontSize: 20, fontWeight: 500, fontFamily: "var(--mono)" }}>0.05 MON</div>
            </div>
            <div>
              <div className="agent-meta-label">BUILT BY</div>
              <div style={{ fontSize: 15, fontFamily: "var(--mono)", color: "var(--ink)" }}>0x7A2c...f9F1</div>
            </div>
            <div>
              <div className="agent-meta-label">TECHNOLOGY</div>
              <div style={{ fontSize: 15, fontFamily: "var(--mono)", color: "var(--ink)" }}>Slither, Node.js</div>
            </div>
            <div>
              <div className="agent-meta-label">CATEGORY</div>
              <div style={{ fontSize: 15, fontFamily: "var(--mono)", color: "var(--ink)" }}>ENGINEERING</div>
            </div>
          </div>

          {/* Readme */}
          <div className="glass-panel" style={{ padding: "40px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)" }}>
            <div className="agent-meta-label" style={{ marginBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: 12 }}>README.md</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, fontFamily: "var(--mono)", color: "var(--ink)" }}>
              <p style={{ marginBottom: 16 }}>SETH_V4 utilizes a combination of static analysis and symbolic execution to detect vulnerabilities.</p>
              <p style={{ marginBottom: 16, fontWeight: 500 }}>Capabilities:</p>
              <ul style={{ listStyleType: "square", paddingLeft: 24, marginBottom: 24 }}>
                <li style={{ marginBottom: 8 }}>Reentrancy detection (Cross-function & cross-contract)</li>
                <li style={{ marginBottom: 8 }}>Flash loan attack vector simulation</li>
                <li style={{ marginBottom: 8 }}>Access control mismatch identification</li>
              </ul>
              <p style={{ color: "var(--muted)" }}>To begin, click the floating terminal icon at the bottom right to open the Execution Playground and provide a compiled contract.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Chat Widget popup */}
      {isChatOpen && (
        <div className="glass-card" style={{
          position: "fixed",
          bottom: 100,
          right: 32,
          width: 440,
          height: 600,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          overflow: "hidden"
        }}>
          {/* Widget Header */}
          <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.6)", padding: "16px 20px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <rect x="0" y="0" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M2 3L4 5L2 7" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
                <path d="M6 7H9" stroke="currentColor" strokeWidth="1" />
              </svg>
              EXECUTION PLAYGROUND
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {/* Widget Chat Area */}
          <div className="chat-area" style={{ flex: 1, borderBottom: "none", padding: "20px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto", background: "rgba(255,255,255,0.15)" }}>
            {messages.map((msg, i) => (
              <div key={i} className="chat-msg">
                <div className="chat-meta" style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "agent" && (
                    <div className="chat-avatar" style={{ width: 20, height: 20 }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="1" width="8" height="7" rx="1" stroke="#F0EBE0" strokeWidth="1" />
                        <path d="M4 11H8" stroke="#F0EBE0" strokeWidth="1" />
                        <path d="M6 8V11" stroke="#F0EBE0" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                  <span style={{ letterSpacing: "0.08em" }}>{msg.sender}</span>
                  <span style={{ color: "var(--border-dark)" }}>•</span>
                  <span>{msg.time}</span>
                </div>
                <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div className={`chat-bubble ${msg.role === "agent" ? "chat-bubble-agent" : "chat-bubble-user"}`} style={{ padding: "12px 16px", fontSize: 12 }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal input */}
          <div className="terminal-bar glass-panel" style={{ borderTop: "1px solid rgba(0,0,0,0.1)", background: "rgba(237, 231, 220, 0.6)", padding: "0 20px" }}>
            <div className="terminal-label" style={{ padding: "10px 0 6px" }}>TERMINAL INPUT</div>
            <textarea
              className="terminal-input"
              rows={2}
              placeholder="Enter command or task for the agent..."
              style={{ padding: "10px 0", fontSize: 12 }}
            />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className="glass-card"
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          cursor: "pointer",
          zIndex: 100,
          color: "var(--ink)",
          background: isChatOpen ? "rgba(255,255,255,0.4)" : "var(--panel)"
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
          <line x1="8" y1="10" x2="16" y2="10"></line>
          <line x1="8" y1="14" x2="12" y2="14"></line>
        </svg>
      </button>

    </div>
  );
}
