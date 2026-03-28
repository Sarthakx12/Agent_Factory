import { providers } from "@/lib/constants";

export function ApiKeyInput() {
  return (
    <div className="space-y-2">
      {providers.map((provider) => (
        <input
          key={provider.id}
          type="password"
          placeholder={`${provider.label} API key`}
          className="h-10 w-full rounded border border-[var(--grid-line)] bg-black/30 px-3 text-sm"
        />
      ))}
    </div>
  );
}
