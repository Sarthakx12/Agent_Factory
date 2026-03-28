import { RetroInput } from "@/Components/ui/RetroInput";

export function PriceConfigurator() {
  return <RetroInput type="number" min="0" step="0.001" placeholder="Price per hour in MON" />;
}
