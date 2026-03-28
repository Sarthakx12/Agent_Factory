export type Agent = {
  id: number;
  name: string;
  category: string;
  owner: string;
  description?: string;
  pricePerHour: number;
  totalRentals: number;
  providers: string[];
  tools?: string[];
  onChainId?: string;
  storagePath?: string;
  active?: boolean;
};

const API_BASE = "/api/v1";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`API error: ${res.status} ${errBody}`);
  }

  return (await res.json()) as T;
}

const fallbackAgents: Agent[] = [
  {
    id: 1,
    name: "Weather Pro",
    category: "Weather",
    owner: "0x8a7d1f5c4f57c35f9f4d3a4bc2d2f7a1db71eac9",
    description: "Real-time weather intelligence for any city.",
    pricePerHour: 0.01,
    totalRentals: 22,
    providers: ["openai"],
    tools: ["forecast", "air-quality"],
    onChainId: "1",
  },
  {
    id: 2,
    name: "Pitch Generator",
    category: "Content",
    owner: "0x4fd18f95ad88dba4c95a2bf84f58db7d9f2f5ad2",
    description: "Generate startup pitches with traction-focused messaging.",
    pricePerHour: 0.03,
    totalRentals: 14,
    providers: ["anthropic", "openai"],
    tools: ["tone-control"],
    onChainId: "2",
  },
];

export async function getAgents(): Promise<Agent[]> {
  try {
    return await api<Agent[]>("/agents");
  } catch {
    return fallbackAgents;
  }
}

export async function getAgentById(id: string): Promise<Agent | null> {
  try {
    return await api<Agent>(`/agents/${id}`);
  } catch {
    return fallbackAgents.find((agent) => String(agent.id) === id) ?? null;
  }
}

export type RegisterPublishBody = {
  tx_hash: string;
  name: string;
  category: string;
  /** Human-readable MON/hr (string recommended to avoid float drift). */
  price_per_hr: string | number;
  storage_path?: string;
};

export async function registerPublishedAgent(body: RegisterPublishBody) {
  return api<Agent>("/agents/publish", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export type RentalEvent = {
  agentId: number;
  renter: string;
  duration: string;
  payment: string;
  expiresAt: number;
  txHash: string;
};

export async function registerRental(tx_hash: string) {
  return api<RentalEvent>("/agents/rent", {
    method: "POST",
    body: JSON.stringify({ tx_hash }),
  });
}

export async function claimRental(agentId: string, tx_hash: string) {
  return api<{ agentId: number; renter: string; publisher: string }>(`/agents/${agentId}/claim`, {
    method: "POST",
    body: JSON.stringify({ tx_hash }),
  });
}

export async function runAgent(id: string, input: string, renter: string) {
  return api<{ output: string }>(`/agents/${id}/run`, {
    method: "POST",
    body: JSON.stringify({ input, renter }),
  });
}
