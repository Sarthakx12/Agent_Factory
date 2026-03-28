"use client";

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
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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

      {/* Main Split Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, overflow: "hidden" }}>

        {/* Left Column: Agent Info */}
        <div style={{
          padding: "40px",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}>
          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span className="badge badge-amber">ACTIVE PROTOCOL</span>
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>ID: 8821-X</span>
          </div>

          {/* Title & Desc */}
          <h1 className="agent-name" style={{ fontSize: 42, marginBottom: 16 }}>SETH_V4</h1>
          <p className="agent-desc" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(0,0,0,0.7)", marginBottom: 40 }}>
            Advanced smart contract auditor and formal verification protocol. Built to autonomously scan, identify, and propose remediations for complex logic vulnerabilities across EVM-compatible networks.
          </p>

          {/* Meta Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 48,
            padding: "24px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.4)"
          }} className="glass-card">
            <div>
              <div className="agent-meta-label">COST PER HR</div>
              <div style={{ fontSize: 18, fontWeight: 500, fontFamily: "var(--mono)" }}>0.05 MON</div>
            </div>
            <div>
              <div className="agent-meta-label">BUILT BY</div>
              <div style={{ fontSize: 14, fontFamily: "var(--mono)" }}>0x7A2c...f9F1</div>
            </div>
            <div>
              <div className="agent-meta-label">TECHNOLOGY</div>
              <div style={{ fontSize: 14, fontFamily: "var(--mono)" }}>Slither, Node.js</div>
            </div>
            <div>
              <div className="agent-meta-label">CATEGORY</div>
              <div style={{ fontSize: 14, fontFamily: "var(--mono)" }}>ENGINEERING</div>
            </div>
          </div>

          {/* Readme */}
          <div>
            <div className="agent-meta-label" style={{ marginBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: 8 }}>README.md</div>
            <div style={{ fontSize: 13, lineHeight: 1.8, fontFamily: "var(--mono)", color: "rgba(0,0,0,0.7)" }}>
              <p style={{ marginBottom: 12 }}>SETH_V4 utilizes a combination of static analysis and symbolic execution to detect vulnerabilities.</p>
              <p style={{ marginBottom: 12 }}><strong>Capabilities:</strong></p>
              <ul style={{ listStyleType: "square", paddingLeft: 20, marginBottom: 12 }}>
                <li>Reentrancy detection (Cross-function & cross-contract)</li>
                <li>Flash loan attack vector simulation</li>
                <li>Access control mismatch identification</li>
              </ul>
              <p>To begin, simply provide a flattened smart contract or a verified block explorer URL in the Execution Playground.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Playground */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(255,255,255,0.1)" }}>
          {/* Section bar */}
          <div className="section-bar glass-panel" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", background: "rgba(237, 231, 220, 0.2)" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <rect x="0" y="0" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M2 3L4 5L2 7" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
                <path d="M6 7H9" stroke="currentColor" strokeWidth="1" />
              </svg>
              EXECUTION PLAYGROUND
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10 }}>RESET</button>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 10 }}>SAVE SESSION</button>
            </div>
          </div>

          {/* Chat */}
          <div className="chat-area" style={{ flex: 1, borderBottom: "none" }}>
            {messages.map((msg, i) => (
              <div key={i} className="chat-msg">
                <div className="chat-meta" style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "agent" && (
                    <div className="chat-avatar">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="1" width="8" height="7" rx="1" stroke="#F0EBE0" strokeWidth="1" />
                        <path d="M4 11H8" stroke="#F0EBE0" strokeWidth="1" />
                        <path d="M6 8V11" stroke="#F0EBE0" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                  <span style={{ letterSpacing: "0.08em" }}>{msg.sender}</span>
                  <span style={{ color: "var(--border-dark)" }}>•</span>
                  <span>{msg.time}</span>
                  {msg.role === "user" && (
                    <div className="chat-avatar">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="4" r="2.5" stroke="#F0EBE0" strokeWidth="1" />
                        <path d="M1 11c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#F0EBE0" strokeWidth="1" strokeLinecap="square" />
                      </svg>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div className={`chat-bubble ${msg.role === "agent" ? "chat-bubble-agent" : "chat-bubble-user"}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal input */}
          <div className="terminal-bar glass-panel" style={{ borderTop: "1px solid rgba(0,0,0,0.1)", background: "rgba(237, 231, 220, 0.4)" }}>
            <div className="terminal-label">TERMINAL INPUT</div>
            <textarea
              className="terminal-input"
              rows={2}
              placeholder="Enter command or task for the agent..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
