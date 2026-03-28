"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: "var(--nav-height)",
      borderBottom: "1px solid var(--cream-border)",
      background: "rgba(245, 240, 232, 0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}>
      <div className="container" style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: 28, height: 28,
            background: "var(--ink)",
            borderRadius: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "var(--cream)", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)" }}>AF</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>Agent Factory</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {[
            { label: "Marketplace", href: "/agents" },
            { label: "Publish", href: "/publish" },
            { label: "Dashboard", href: "/dashboard" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              fontSize: 14,
              color: "var(--muted)",
              fontWeight: 400,
              transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button className="btn btn-primary btn-sm">
          Connect Wallet
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
