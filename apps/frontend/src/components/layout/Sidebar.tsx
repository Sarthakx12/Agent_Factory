"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Marketplace",
    href: "/agents",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "Deployments",
    href: "/dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 13,10 1,10" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    label: "Archive",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="3" width="12" height="9" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 3L4 1H10L13 3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 7H9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "Terminal",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 5L6.5 7L4 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M8 9H10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass-panel" style={{ borderRight: "1px solid rgba(255,255,255,0.2)" }}>
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
              key={item.href}
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
        <div className="avatar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="5" r="3" stroke="#F0EBE0" strokeWidth="1.2" />
            <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#F0EBE0" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </div>
        <div>
          <p className="user-name">ARCHIVIST_01</p>
          <p className="user-status">
            <span className="status-dot" />
            Connected
          </p>
        </div>
      </div>
    </aside>
  );
}
