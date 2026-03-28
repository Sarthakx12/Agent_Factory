"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { toast } from "sonner";
import { usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { RetroButton } from "@/Components/ui/RetroButton";
import { RetroCard } from "@/Components/ui/RetroCard";
import { RetroInput } from "@/Components/ui/RetroInput";
import { RetroSelect } from "@/Components/ui/RetroSelect";
import { RetroTextarea } from "@/Components/ui/RetroTextarea";
import { TerminalOutput } from "@/Components/ui/TerminalOutput";
import { factoryAbi, FACTORY_ADDRESS } from "@/lib/contracts";
import { categories, providers } from "@/lib/constants";
import { usePublish } from "@/hooks/usePublish";
import { StepIndicator } from "./StepIndicator";

const total = 7;

export function PublishWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>({});
  const publish = usePublish();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();
  const publicClient = usePublicClient();
  const { data: publishFeeWei } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi,
    functionName: "publishFee",
    query: { enabled: FACTORY_ADDRESS !== "0x0000000000000000000000000000000000000000" },
  });
  const publishValue = publishFeeWei ?? parseEther("0.1");
  const publishFeeLabel = formatEther(publishValue);

  const next = () => setStep((value) => Math.min(total, value + 1));
  const back = () => setStep((value) => Math.max(1, value - 1));

  const update = (key: string, value: string) =>
    setForm((state) => ({ ...state, [key]: value }));

  const handlePublish = async () => {
    const name = form.name?.trim();
    const category = form.category?.trim();
    const price = Number(form.price);
    if (!name || !category || !Number.isFinite(price)) {
      toast.error("Complete name, category, and price before publishing.");
      return;
    }

    const uri = `ipfs://agent/${encodeURIComponent(name)}/${Date.now()}`;

    try {
      const hash = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: factoryAbi,
        functionName: "publishAgent",
        args: [uri, parseEther(String(price))],
        value: publishValue,
      });

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      await publish.mutateAsync({
        tx_hash: hash,
        name,
        category,
        price_per_hr: form.price?.trim() || String(price),
        storage_path: uri,
      });

      toast.success("Agent published and indexed.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Publish failed";
      toast.error(message);
    }
  };

  return (
    <RetroCard>
      <StepIndicator step={step} total={total} />
      <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
        {step === 1 && <RetroInput placeholder="Agent Name" onChange={(e) => update("name", e.target.value)} />}
        {step === 2 && (
          <RetroSelect onChange={(e) => update("category", e.target.value)}>
            <option value="">Select category</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </RetroSelect>
        )}
        {step === 3 && (
          <div className="space-y-2">
            {providers.map((provider) => (
              <RetroInput
                key={provider.id}
                type="password"
                placeholder={`${provider.label} API Key`}
                onChange={(e) => update(provider.id, e.target.value)}
              />
            ))}
          </div>
        )}
        {step === 4 && <RetroTextarea placeholder="Instructions..." onChange={(e) => update("instructions", e.target.value)} />}
        {step === 5 && <RetroTextarea placeholder='Tools JSON, e.g. {"tools":[]}' onChange={(e) => update("tools", e.target.value)} />}
        {step === 6 && <TerminalOutput text="Preview simulation successful. Agent returns deterministic response sample." />}
        {step === 7 && <RetroInput type="number" placeholder="Price per hour (MON)" onChange={(e) => update("price", e.target.value)} />}
      </motion.div>
      <div className="mt-5 flex items-center justify-between">
        <RetroButton onClick={back} disabled={step === 1}>
          Back
        </RetroButton>
        {step === total ? (
          <RetroButton
            className="border-[var(--neon-amber)] text-[var(--neon-amber)]"
            onClick={handlePublish}
            disabled={isWriting || publish.isPending}
          >
            {isWriting || publish.isPending
              ? "Working..."
              : `Pay ${publishFeeLabel} MON & Publish`}
          </RetroButton>
        ) : (
          <RetroButton onClick={next}>Next</RetroButton>
        )}
      </div>
    </RetroCard>
  );
}
