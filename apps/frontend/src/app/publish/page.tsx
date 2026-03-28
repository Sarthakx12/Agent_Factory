import { GlitchText } from "@/Components/ui/GlitchText";
import { PublishWizard } from "@/Components/publish/PublishWizard";

export default function PublishPage() {
  return (
    <div className="space-y-6">
      <GlitchText>Publish Agent</GlitchText>
      <p className="text-sm text-[var(--text-dim)]">Create, preview, and deploy your agent to Monad in seven guided steps.</p>
      <PublishWizard />
    </div>
  );
}
