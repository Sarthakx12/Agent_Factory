import {
  createPublicClient,
  http,
  parseAbi,
  decodeEventLog,
  formatEther,
  type Hex,
  type Log,
} from "viem";
import { monadTestnet } from "@/lib/monad-chain";

const rpcUrl = process.env.MONAD_RPC_URL ?? "https://testnet.monad.xyz";

export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(rpcUrl),
});

function requireFactoryAddress(): `0x${string}` {
  const a = process.env.FACTORY_ADDRESS;
  if (!a) throw new Error("FACTORY_ADDRESS is not set");
  return a as `0x${string}`;
}

function requireEscrowAddress(): `0x${string}` {
  const a = process.env.ESCROW_ADDRESS;
  if (!a) throw new Error("ESCROW_ADDRESS is not set");
  return a as `0x${string}`;
}

export const factoryAbi = parseAbi([
  "function publishAgent(string uri, uint256 pricePerHour) external payable returns (uint256)",
  "function agentCount() view returns (uint256)",
  "function publishFee() view returns (uint256)",
  "function getAgent(uint256 id) view returns (address agentOwner, string uri, uint256 pricePerHour, bool active)",
  "function isAgentActive(uint256 id) view returns (bool)",
  "function agents(uint256) view returns (address owner, string storageURI, uint256 pricePerHour, bool active, uint256 publishFeePaid)",
  "event AgentPublished(uint256 indexed id, address indexed agentOwner, string uri, uint256 pricePerHour)",
]);

export const escrowAbi = parseAbi([
  "function rent(uint256 agentId, uint256 durationInHours) external payable",
  "function claimRental(uint256 agentId, address renter)",
  "function isRentalActive(uint256 agentId, address renter) view returns (bool)",
  "function getRental(uint256 agentId, address renter) view returns (uint256 expiresAt, uint256 payment, bool claimed)",
  "function getRentalCost(uint256 agentId, uint256 durationHours) view returns (uint256)",
  "event AgentRented(uint256 indexed agentId, address indexed renter, uint256 duration, uint256 payment, uint256 expiresAt)",
  "event RentalClaimed(uint256 indexed agentId, address indexed renter, address indexed publisher, uint256 publisherAmount, uint256 platformAmount)",
]);

// ──────────────── Agent reads ────────────────

export async function getAgentCount() {
  return publicClient.readContract({
    address: requireFactoryAddress(),
    abi: factoryAbi,
    functionName: "agentCount",
  });
}

/** Returns [agentOwner, uri, pricePerHour, active] */
export async function getOnChainAgent(agentId: bigint) {
  return publicClient.readContract({
    address: requireFactoryAddress(),
    abi: factoryAbi,
    functionName: "getAgent",
    args: [agentId],
  });
}

/** Parse the on-chain URI string as JSON metadata, with graceful fallback */
export function parseAgentUri(uri: string): {
  name?: string;
  category?: string;
  description?: string;
} {
  try {
    const parsed = JSON.parse(uri);
    return {
      name: parsed.name ?? undefined,
      category: parsed.category ?? undefined,
      description: parsed.description ?? undefined,
    };
  } catch {
    // URI is a plain string, not JSON — use it as the name
    return { name: uri || undefined };
  }
}

export type OnChainAgent = {
  id: number;
  owner: string;
  uri: string;
  name: string;
  category: string;
  description?: string;
  pricePerHour: string; // formatted ether
  active: boolean;
};

/** Build a normalised agent object from on-chain data */
export function formatOnChainAgent(
  id: number,
  owner: string,
  uri: string,
  pricePerHour: bigint,
  active: boolean,
): OnChainAgent {
  const meta = parseAgentUri(uri);
  return {
    id,
    owner,
    uri,
    name: meta.name ?? `Agent #${id}`,
    category: meta.category ?? "Uncategorized",
    description: meta.description,
    pricePerHour: formatEther(pricePerHour),
    active,
  };
}

/** Fetch ALL agents from the factory contract */
export async function getAllAgents(): Promise<OnChainAgent[]> {
  const count = await getAgentCount();
  const total = Number(count);
  if (total === 0) return [];

  // Parallel fetch all agents (1-indexed)
  const promises = Array.from({ length: total }, (_, i) =>
    getOnChainAgent(BigInt(i + 1))
      .then(([owner, uri, pricePerHour, active]) =>
        formatOnChainAgent(i + 1, owner, uri, pricePerHour, active),
      )
      .catch(() => null),
  );

  const results = await Promise.all(promises);
  return results.filter((a): a is OnChainAgent => a !== null);
}

// ──────────────── Rental reads ────────────────

export async function isRentalActive(agentId: bigint, renter: `0x${string}`) {
  return publicClient.readContract({
    address: requireEscrowAddress(),
    abi: escrowAbi,
    functionName: "isRentalActive",
    args: [agentId, renter],
  });
}

export async function getRentalCost(agentId: bigint, durationHours: bigint) {
  return publicClient.readContract({
    address: requireEscrowAddress(),
    abi: escrowAbi,
    functionName: "getRentalCost",
    args: [agentId, durationHours],
  });
}

export async function getRentalInfo(agentId: bigint, renter: `0x${string}`) {
  return publicClient.readContract({
    address: requireEscrowAddress(),
    abi: escrowAbi,
    functionName: "getRental",
    args: [agentId, renter],
  });
}

// ──────────────── Event log scanning ────────────────

export type RentalEvent = {
  agentId: number;
  renter: string;
  duration: string;
  payment: string;
  expiresAt: number; // unix seconds
  blockNumber: bigint;
  txHash: string;
};

export type ClaimEvent = {
  agentId: number;
  renter: string;
  publisher: string;
  publisherAmount: string;
  platformAmount: string;
  blockNumber: bigint;
  txHash: string;
};

/** Scan AgentRented events, optionally filtered by agentId */
export async function getAgentRentedEvents(
  agentId?: bigint,
): Promise<RentalEvent[]> {
  const logs = await publicClient.getLogs({
    address: requireEscrowAddress(),
    event: {
      type: "event",
      name: "AgentRented",
      inputs: [
        { type: "uint256", name: "agentId", indexed: true },
        { type: "address", name: "renter", indexed: true },
        { type: "uint256", name: "duration" },
        { type: "uint256", name: "payment" },
        { type: "uint256", name: "expiresAt" },
      ],
    },
    args: agentId !== undefined ? { agentId } : undefined,
    fromBlock: 0n,
    toBlock: "latest",
  });

  return logs.map((log) => ({
    agentId: Number(log.args.agentId!),
    renter: log.args.renter!,
    duration: String(log.args.duration!),
    payment: formatEther(log.args.payment!),
    expiresAt: Number(log.args.expiresAt!),
    blockNumber: log.blockNumber,
    txHash: log.transactionHash,
  }));
}

/** Scan AgentRented events filtered by renter address */
export async function getAgentRentedByUser(
  renter: `0x${string}`,
): Promise<RentalEvent[]> {
  const logs = await publicClient.getLogs({
    address: requireEscrowAddress(),
    event: {
      type: "event",
      name: "AgentRented",
      inputs: [
        { type: "uint256", name: "agentId", indexed: true },
        { type: "address", name: "renter", indexed: true },
        { type: "uint256", name: "duration" },
        { type: "uint256", name: "payment" },
        { type: "uint256", name: "expiresAt" },
      ],
    },
    args: { renter },
    fromBlock: 0n,
    toBlock: "latest",
  });

  return logs.map((log) => ({
    agentId: Number(log.args.agentId!),
    renter: log.args.renter!,
    duration: String(log.args.duration!),
    payment: formatEther(log.args.payment!),
    expiresAt: Number(log.args.expiresAt!),
    blockNumber: log.blockNumber,
    txHash: log.transactionHash,
  }));
}

// ──────────────── Transaction receipt log parsers ────────────────

function sameAddress(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

export function parsePublishLogs(logs: readonly Log[]) {
  const factory = requireFactoryAddress();
  for (const log of logs) {
    if (!sameAddress(log.address, factory)) continue;
    try {
      const decoded = decodeEventLog({
        abi: factoryAbi,
        data: log.data,
        topics: log.topics as [Hex, ...Hex[]],
      });
      if (decoded.eventName === "AgentPublished") return decoded;
    } catch {
      /* not this event */
    }
  }
  return undefined;
}

export function parseRentLogs(logs: readonly Log[]) {
  const escrow = requireEscrowAddress();
  for (const log of logs) {
    if (!sameAddress(log.address, escrow)) continue;
    try {
      const decoded = decodeEventLog({
        abi: escrowAbi,
        data: log.data,
        topics: log.topics as [Hex, ...Hex[]],
      });
      if (decoded.eventName === "AgentRented") return decoded;
    } catch {
      /* not this event */
    }
  }
  return undefined;
}

export function parseClaimLogs(logs: readonly Log[]) {
  const escrow = requireEscrowAddress();
  for (const log of logs) {
    if (!sameAddress(log.address, escrow)) continue;
    try {
      const decoded = decodeEventLog({
        abi: escrowAbi,
        data: log.data,
        topics: log.topics as [Hex, ...Hex[]],
      });
      if (decoded.eventName === "RentalClaimed") return decoded;
    } catch {
      /* not this event */
    }
  }
  return undefined;
}
