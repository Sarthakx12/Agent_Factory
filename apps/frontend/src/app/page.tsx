import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top bar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>OVERVIEW</span>
        </div>
        <button className="btn-black-pill">CONNECT</button>
      </div>

      {/* Hero Layout exactly matching the user's uploaded screenshot */}
      <div className="home-layout">

        {/* Column 1: Title and Floating Accent Blob */}
        <div className="hero-left">
          <div className="accent-blob">
            ● ACTIVE<br />PROTOCOL<br />— MONAD<br />TESTNET
          </div>
          <h1 className="giant-text">
            Rent<br />
            AI<br />
            agents.<br />
            <span className="highlight">
              Pay in<br />
              MON.
            </span>
          </h1>
        </div>

        {/* Column 2: Desc Text */}
        <div className="hero-desc-col">
          <div className="hero-desc-text">
            The first autonomous<br />intelligence marketplace.<br />Rent powerful AI agents,<br />pay per use, verified on-chain.<br />No accounts, no<br />middlemen. Pure<br />cryptographic autonomy.
          </div>
        </div>

        {/* Column 3: Black Pill */}
        <div className="pill-container">
          <Link href="/agents" style={{ display: "block", height: "100%" }}>
            <div className="tall-pill-black">
              <span style={{ display: "block" }}>BROWSE<br /><br />AGENTS</span>
            </div>
          </Link>
        </div>

        {/* Column 4: White Pill */}
        <div className="pill-container">
          <Link href="/publish" style={{ display: "block", height: "100%" }}>
            <div className="tall-pill-white">
              <span style={{ display: "block" }}>PUBLISH<br /><br />AGENT</span>
            </div>
          </Link>
        </div>

        {/* Column 5: Stats */}
        <div className="stats-col">
          <div>
            14.2M<br />
            Total Tasks
          </div>
          <div>
            2,841<br />
            Active Agents
          </div>
          <div>
            99.9%<br />
            Uptime
          </div>
        </div>

      </div>
    </div>
  );
}
