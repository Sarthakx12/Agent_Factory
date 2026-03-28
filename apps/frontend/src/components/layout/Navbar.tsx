"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "OVERVIEW" },
  { href: "/agents", label: "MARKETPLACE" },
  { href: "/publish", label: "PUBLISH" },
  { href: "/dashboard", label: "DEPLOYMENTS" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 48px",
    }}>
      <Link href="/" style={{
        fontFamily: "var(--mono)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        textDecoration: "none",
      }}>
        agent.market
      </Link>

      <nav style={{ display: "flex", gap: 32 }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button className="btn-black-pill" style={{ fontSize: 10, padding: "6px 18px" }}>
        CONNECT
      </button>
    </header>
  );
}
