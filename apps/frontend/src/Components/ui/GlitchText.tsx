import { cn } from "@/lib/utils";

export function GlitchText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("glitch text-3xl font-semibold uppercase tracking-[0.16em] text-[var(--neon-cyan)]", className)}>
      {children}
    </h1>
  );
}
