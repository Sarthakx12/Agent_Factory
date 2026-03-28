import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function RetroTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-[var(--grid-line)] bg-[rgba(0,0,0,0.35)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-dim)] focus:border-[var(--neon-cyan)] focus:shadow-[0_0_8px_rgba(0,240,255,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
