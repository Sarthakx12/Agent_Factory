export function TerminalOutput({ text }: { text: string }) {
  return (
    <pre className="rounded-md border border-[var(--grid-line)] bg-black/40 p-3 text-xs leading-6 text-[var(--neon-cyan)]">
      <span className="typewriter">{text || "Awaiting transmission..."}</span>
    </pre>
  );
}
