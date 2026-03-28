import { RetroInput } from "@/Components/ui/RetroInput";
import { RetroTextarea } from "@/Components/ui/RetroTextarea";

export function AgentConfigForm() {
  return (
    <div className="space-y-3">
      <RetroInput placeholder="Agent name" />
      <RetroTextarea placeholder="Agent description" />
    </div>
  );
}
