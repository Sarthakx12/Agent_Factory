import { parseAbi } from "viem";

export const FACTORY_ADDRESS = (process.env.NEXT_PUBLIC_FACTORY_ADDRESS ??
  "0x0000000000000000000000000000000000000000") as `0x${string}`;
export const ESCROW_ADDRESS = (process.env.NEXT_PUBLIC_ESCROW_ADDRESS ??
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const factoryAbi = parseAbi([
  "function publishAgent(string uri, uint256 pricePerHour) external payable returns (uint256)",
  "function agentCount() view returns (uint256)",
  "function publishFee() view returns (uint256)",
  "function owner() view returns (address)",
  "function getAgent(uint256 id) view returns (address agentOwner, string uri, uint256 pricePerHour, bool active)",
  "function isAgentActive(uint256 id) view returns (bool)",
  "function agents(uint256) view returns (address owner, string storageURI, uint256 pricePerHour, bool active, uint256 publishFeePaid)",
  "function updateAgent(uint256 id, string uri, uint256 pricePerHour)",
  "function deactivateAgent(uint256 id)",
  "function reactivateAgent(uint256 id)",
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
