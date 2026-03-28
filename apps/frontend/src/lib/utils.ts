/** Simple class-name joiner that doesn't depend on external packages */
export function cn(...inputs: (string | boolean | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function shortAddress(address?: string) {
  if (!address) return "0x----";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
