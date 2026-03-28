import { Search } from "lucide-react";
import { RetroInput } from "@/Components/ui/RetroInput";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" size={14} />
      <RetroInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search agents..."
        className="pl-9"
      />
    </div>
  );
}
