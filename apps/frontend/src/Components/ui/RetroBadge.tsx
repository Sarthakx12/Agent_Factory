import { cn } from "@/lib/utils";

export function RetroBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--neon-amber)] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--neon-amber)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
