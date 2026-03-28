import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function RetroInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-[var(--grid-line)] bg-[rgba(0,0,0,0.35)] px-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-dim)] focus:border-[var(--neon-cyan)] focus:shadow-[0_0_8px_rgba(0,240,255,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
