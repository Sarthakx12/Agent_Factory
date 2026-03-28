"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Marketplace",
    href: "/agents",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="4" height="4" stroke="currentColor" strokeWidth="1" />
        <rect x="8" y="2" width="4" height="4" stroke="currentColor" strokeWidth="1" />
        <rect x="2" y="8" width="4" height="4" stroke="currentColor" strokeWidth="1" />
        <rect x="8" y="8" width="4" height="4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Deployments",
    href: "/dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,2 12,10 2,10" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    label: "Archive",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="4" width="10" height="7" stroke="currentColor" strokeWidth="1" />
        <path d="M2 4L4 2H10L12 4" stroke="currentColor" strokeWidth="1" />
        <path d="M5 7H9" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Terminal",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <path d="M4 5L6 7L4 9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
        <path d="M7 9H10" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-diamond" />
        <span className="logo-text">agent.market</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive =
            item.href !== "#" &&
            (pathname === item.href || pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-item${isActive ? " active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.05em", marginBottom: 4 }}>ARCHIVIST_01</p>
        <p style={{ fontSize: 10, color: "var(--muted)", display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50" }} /> Connected
        </p>
      </div>
    </aside>
  );
}
