import {
  createPublicClient,
  http,
  parseAbi,
  decodeEventLog,
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
