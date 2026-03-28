import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function RetroCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--grid-line)] bg-[rgba(17,17,34,0.8)] p-4 shadow-[inset_0_0_0_1px_rgba(0,240,255,0.08)] before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-500 before:content-[''] hover:before:opacity-100 hover:before:bg-[linear-gradient(120deg,transparent,rgba(255,0,170,0.12),transparent)]",
        className,
      )}
      {...props}
    />
  );
}
