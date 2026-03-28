"use client";

import { useState } from "react";
import { toast } from "sonner";
import { RetroButton } from "@/Components/ui/RetroButton";
import { rentalDurations } from "@/lib/constants";
import { useRent } from "@/hooks/useRent";

export function RentPanel({
  onChainId,
  pricePerHour,
}: {
  onChainId: string | undefined;
  pricePerHour: number;
}) {
  const [hours, setHours] = useState<number>(1);
  const { rent, isPending } = useRent();

  const handleRent = async () => {
    if (!onChainId) {
      toast.error("This agent is not registered on-chain yet.");
      return;
    }
    try {
      await rent(BigInt(onChainId), hours, pricePerHour);
      toast.success("Rental confirmed and indexed.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Rent failed";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-[var(--grid-line)] bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">Rental Duration</p>
      <div className="flex gap-2">
        {rentalDurations.map((value) => (
          <button
            key={value}
            type="button"
            className={`rounded border px-3 py-1 text-xs ${hours === value ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)]" : "border-[var(--grid-line)]"}`}
            onClick={() => setHours(value)}
          >
            {value}h
          </button>
        ))}
      </div>
      <p className="text-sm">Total: {(hours * pricePerHour).toFixed(3)} MON</p>
      <RetroButton onClick={handleRent} disabled={isPending || !onChainId}>
        {isPending ? "Confirming..." : "Rent Now"}
      </RetroButton>
    </div>
  );
}
