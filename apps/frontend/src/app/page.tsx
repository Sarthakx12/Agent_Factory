import Link from "next/link";
import { ConnectButton } from "@/components/ui/ConnectButton";

export default function HomePage() {
  return (
    <div className="home-root">
      {/* Top bar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>OVERVIEW</span>
        </div>
        <ConnectButton />
      </div>

      {/* Hero */}
      <div className="home-layout">

        {/* Column 1: Title */}
        <div className="hero-left">
          <div className="accent-badge">
            <span className="accent-dot">●</span>
            ACTIVE PROTOCOL — MONAD TESTNET
          </div>
          <h1 className="giant-text">
            Rent AI agents.<br />
            <span className="highlight">Pay in MON.</span>
          </h1>
          <p className="hero-desc-text" style={{ marginTop: 24 }}>
            The first autonomous intelligence marketplace. Rent powerful AI agents, pay per use, verified on-chain. No accounts. Pure cryptographic autonomy.
          </p>
        </div>

        {/* Divider */}
        <div className="hero-divider" />

        {/* Column 2: CTAs + Stats */}
        <div className="hero-right">
          <div className="pill-row">
            <Link href="/agents" className="tall-pill-black">
              <span>BROWSE<br /><br />AGENTS</span>
            </Link>
            <Link href="/publish" className="tall-pill-white">
              <span>PUBLISH<br /><br />AGENT</span>
            </Link>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">14.2M</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2,841</div>
              <div className="stat-label">Active Agents</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
