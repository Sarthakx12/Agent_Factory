export function GaugeTimer({ progress }: { progress: number }) {
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <div className="relative h-20 w-20 rounded-full border border-[var(--grid-line)] p-1">
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(var(--neon-cyan) ${pct}%, rgba(255,255,255,0.08) ${pct}% 100%)`,
        }}
      />
      <div className="absolute inset-3 grid place-items-center rounded-full bg-[var(--bg-panel)] text-[10px] tracking-[0.12em]">
        {Math.round(pct)}%
      </div>
    </div>
  );
}
