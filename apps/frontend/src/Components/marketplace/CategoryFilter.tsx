import { categories } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em]",
          active === "all" ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)]" : "border-[var(--grid-line)] text-[var(--text-dim)]",
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em]",
            active === category ? "border-[var(--neon-cyan)] text-[var(--neon-cyan)]" : "border-[var(--grid-line)] text-[var(--text-dim)]",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
