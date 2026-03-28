"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@/components/ui/ConnectButton";

const navItems = [
  { href: "/", label: "OVERVIEW" },
  { href: "/agents", label: "MARKETPLACE" },
  { href: "/publish", label: "PUBLISH" },
  { href: "/dashboard", label: "DEPLOYMENTS" },
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
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item${pathname === item.href ? " active" : ""}`}
          >
            <span className="nav-icon" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom user block */}
      <div className="sidebar-user">
        <div className="sidebar-user-badge">
          <span>●</span>
          <span>MONAD TESTNET</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ConnectButton />
        </div>
      </div>
    </aside>
  );
}
