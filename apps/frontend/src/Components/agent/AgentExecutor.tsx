"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useExecuteAgent } from "@/hooks/useExecuteAgent";
import { RetroButton } from "@/Components/ui/RetroButton";
import { RetroTextarea } from "@/Components/ui/RetroTextarea";
import { TerminalOutput } from "@/Components/ui/TerminalOutput";

export function AgentExecutor({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const { address } = useAccount();
  const execute = useExecuteAgent(id, address);

  return (
    <div className="space-y-3">
      <RetroTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter prompt..." />
      <RetroButton
        onClick={() => execute.mutate(input)}
        disabled={execute.isPending || !address}
      >
        {!address ? "Connect wallet" : execute.isPending ? "Executing..." : "Execute Agent"}
      </RetroButton>
      <TerminalOutput text={execute.data?.output ?? ""} />
    </div>
  );
}
