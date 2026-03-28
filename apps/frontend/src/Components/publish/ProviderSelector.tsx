import { providers } from "@/lib/constants";

export function ProviderSelector() {
  return (
    <div className="flex flex-wrap gap-2">
      {providers.map((provider) => (
        <label key={provider.id} className="rounded border border-[var(--grid-line)] px-3 py-1 text-xs">
          <input type="checkbox" className="mr-2" />
          {provider.label}
        </label>
      ))}
    </div>
  );
}
