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
      <div className="topbar">
        <div className="topbar-breadcrumb">
          <span>/</span>
          <span>DEPLOYMENTS</span>
          <span className="breadcrumb-sep">/</span>
          <span>SETH_V4</span>
        </div>
        <button className="btn btn-dark">CONNECT</button>
      </div>

      {/* Protocol status */}
      <div style={{ padding: "14px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
        <span className="badge badge-amber">ACTIVE PROTOCOL</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>ID: 8821-X</span>
      </div>

      {/* Section bar */}
      <div className="section-bar">
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
      <div className="chat-area">
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
      <div className="terminal-bar">
        <div className="terminal-label">TERMINAL INPUT</div>
        <textarea
          className="terminal-input"
          rows={2}
          placeholder="Enter command or task for the agent..."
        />
      </div>
    </div>
  );
}
