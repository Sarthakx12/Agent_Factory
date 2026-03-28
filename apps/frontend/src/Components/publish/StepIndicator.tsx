import { cn } from "@/lib/utils";

export function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 flex-1 rounded-full",
            index + 1 <= step ? "bg-[var(--neon-cyan)] shadow-[0_0_10px_rgba(0,240,255,0.7)]" : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}
