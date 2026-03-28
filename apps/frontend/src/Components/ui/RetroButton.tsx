import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function RetroButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-[var(--neon-cyan)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] transition hover:shadow-[0_0_16px_rgba(0,240,255,0.45)] disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
