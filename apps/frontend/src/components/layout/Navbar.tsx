"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Marketplace" },
  { href: "/publish", label: "Publish" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-[rgba(10,10,18,0.85)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-[0.22em] text-[var(--neon-cyan)]">
          AGENTFACTORY
        </Link>
        <nav className="hidden gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] hover:text-[var(--neon-cyan)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <appkit-button />
        </div>
        <button
          className="md:hidden rounded border border-[var(--grid-line)] p-2"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <Menu size={16} />
        </button>
      </div>
      <div className={cn("md:hidden border-t border-[var(--grid-line)] px-4 pb-3", open ? "block" : "hidden")}>
        <div className="mb-3 mt-2 flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs uppercase tracking-[0.2em] text-[var(--text-primary)]">
              {link.label}
            </Link>
          ))}
        </div>
        <appkit-button />
      </div>
    </header>
  );
}
