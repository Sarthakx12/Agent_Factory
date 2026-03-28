"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";

function trimAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Address badge — click to open AppKit modal (account view) */}
        <button
          onClick={() => open({ view: "Account" })}
          className="btn-black-pill"
          style={{
            fontSize: 10,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          title="Manage wallet"
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              flexShrink: 0,
            }}
          />
          {trimAddress(address)}
        </button>

        {/* Disconnect */}
        <button
          onClick={() => disconnect()}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 30,
            padding: "5px 12px",
            fontSize: 9,
            fontFamily: "var(--mono)",
            color: "var(--muted)",
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--ink)";
            e.currentTarget.style.borderColor = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
          title="Disconnect wallet"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="btn-black-pill"
      style={{ fontSize: 10, padding: "6px 18px" }}
    >
      CONNECT WALLET
    </button>
  );
}
