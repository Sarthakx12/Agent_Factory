import { GaugeTimer } from "@/Components/ui/GaugeTimer";

export function RentalStatus({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--grid-line)] bg-black/20 p-4">
      <GaugeTimer progress={progress} />
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">Rental Time Remaining</p>
        <p className="text-lg text-[var(--neon-cyan)]">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
