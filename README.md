# agent.market — Protocol of Record

> **The first autonomous intelligence marketplace. Rent powerful AI agents, pay per use, verified on-chain on Monad.**

[![Monad Testnet](https://img.shields.io/badge/chain-Monad%20Testnet-7C3AED?style=flat-square)](https://testnet.monad.xyz)
[![Next.js](https://img.shields.io/badge/frontend-Next.js%2016-black?style=flat-square)](https://nextjs.org)
[![Turborepo](https://img.shields.io/badge/monorepo-Turborepo-EF4444?style=flat-square)](https://turbo.build)
[![WalletConnect](https://img.shields.io/badge/wallet-AppKit%20%2B%20WalletConnect-3B99FC?style=flat-square)](https://reown.com)

---

## What is agent.market?

agent.market is a decentralised AI-agent bazaar built on **Monad Testnet**. Publishers deploy autonomous AI agents on-chain via a factory smart contract; renters pay in **MON** through an escrow contract and receive time-bounded execution access. Everything is verifiable, trustless, and non-custodial.

No accounts. No logins. Pure cryptographic autonomy.

---

## Architecture

```
Agent-Factory/          ← Turborepo monorepo (Bun workspace)
├── apps/
│   └── frontend/       ← Next.js 16 web app (App Router)
└── packages/
    ├── db/             ← Drizzle ORM schema + Supabase client
    ├── ui/             ← Shared React component stubs
    ├── eslint-config/  ← Shared ESLint config
    └── typescript-config/ ← Shared tsconfig
```

### Smart Contracts (Monad Testnet)

| Contract | Address |
|---|---|
| **AgentFactory** | `0x8c0CE021741004a50a2EC7262317911590230b6E` |
| **Escrow** | `0x85031C31a5304DbAd01864da314808573406ED2B` |

#### AgentFactory
- `publishAgent(uri, pricePerHour)` — creates an on-chain agent listing (requires `publishFee` in MON)
- `getAgent(id)` — returns `(owner, storageURI, pricePerHour, active)`
- `updateAgent / deactivateAgent / reactivateAgent`

#### Escrow
- `rent(agentId, durationInHours)` — locks MON payment for time-bounded access
- `claimRental(agentId, renter)` — publisher calls after rental expires to claim payment (platform takes a cut)
- `isRentalActive(agentId, renter)` — on-chain gate check

---

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + Bun workspaces |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| Styling | Vanilla CSS — Brutalist editorial design (EB Garamond + DM Mono) |
| Blockchain client | Viem v2 |
| Wallet / state | Wagmi v3 + Reown AppKit (WalletConnect) |
| Database | Supabase + Drizzle ORM (PostgreSQL) |
| Animation | Motion (Framer Motion) |
| Notifications | Sonner |

---

## Project Structure — Frontend

```
apps/frontend/src/
├── app/
│   ├── page.tsx              ← Homepage (hero, stats, CTAs)
│   ├── agents/               ← Marketplace listing + agent detail [id]
│   ├── publish/              ← Publisher flow (on-chain + DB)
│   ├── dashboard/            ← Renter deployments view
│   ├── docs/                 ← Protocol documentation
│   └── api/v1/               ← Next.js Route Handlers
│       ├── agents/           ← GET all, POST publish, GET/rent/run/claim [id]
│       └── rentals/          ← GET by agent or by user address
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx       ← Fixed left navigation + wallet button
│   │   └── Navbar.tsx        ← Top bar (alternative layout)
│   ├── ui/
│   │   ├── ConnectButton.tsx ← AppKit-powered wallet connect/disconnect
│   │   └── Toast.tsx         ← Retro-styled Sonner toaster
│   └── providers.tsx         ← WagmiProvider + QueryClientProvider + AppKit init
├── hooks/
│   ├── useRent.ts            ← Wagmi write → Escrow.rent()
│   ├── usePublish.ts         ← Wagmi write → Factory.publishAgent()
│   ├── useClaimRental.ts     ← Wagmi write → Escrow.claimRental()
│   ├── useExecuteAgent.ts    ← POST /api/v1/agents/[id]/run
│   ├── useAgent.ts           ← GET single agent
│   ├── useAgents.ts          ← GET all agents
│   └── useDashboard.ts       ← GET user rentals
└── lib/
    ├── appkit.ts             ← Reown AppKit initialiser (WagmiAdapter, modal config)
    ├── wagmi.ts              ← Re-exports wagmiConfig from AppKit adapter
    ├── monad-chain.ts        ← Custom Monad Testnet chain definition (viem)
    ├── contracts.ts          ← Client-side ABIs + contract addresses
    ├── server-contracts.ts   ← Server-side viem publicClient + ABI helpers
    ├── api.ts                ← Typed fetch wrappers for internal API
    ├── agent-dto.ts          ← Agent data transfer object type
    ├── constants.ts          ← Categories, AI providers, rental durations
    └── utils.ts              ← cn() tailwind-merge helper
```

---

## Wallet Connect

Wallet connectivity is powered by **[Reown AppKit](https://reown.com)** (formerly WalletConnect AppKit) with the Wagmi adapter.

- Multi-wallet modal: MetaMask, WalletConnect QR, Coinbase Wallet, and injected wallets
- Connected to **Monad Testnet** (chain ID 41454)
- Custom theme matches the app's monochrome brutalist palette
- `ConnectButton` component shows truncated address when connected + one-click disconnect

To use WalletConnect in development you need a **Project ID** from [cloud.reown.com](https://cloud.reown.com) — see setup below.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.3
- Node.js 20+
- A [Reown / WalletConnect Project ID](https://cloud.reown.com)

### Installation

```sh
git clone https://github.com/your-org/Agent-Factory
cd Agent-Factory
bun install
```

### Environment Variables

Copy `.env.local` in `apps/frontend/` and fill in the required values:

```sh
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | **Required.** Get free at [cloud.reown.com](https://cloud.reown.com) |
| `NEXT_PUBLIC_FACTORY_ADDRESS` | AgentFactory contract address on Monad Testnet |
| `NEXT_PUBLIC_ESCROW_ADDRESS` | Escrow contract address on Monad Testnet |
| `NEXT_PUBLIC_MONAD_RPC_URL` | Monad Testnet RPC URL |
| `DATABASE_URL` | PostgreSQL connection string (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

### Development

```sh
# Run just the frontend
cd apps/frontend
bun run dev

# Run all apps (from repo root)
bun run dev
```

Frontend is available at `http://localhost:3000`.

### Build

```sh
bun run build           # all workspaces
# or
cd apps/frontend && bun run build
```

---

## User Flows

### Renting an Agent
1. Connect wallet (CONNECT WALLET button in sidebar)
2. Browse marketplace → `/agents`
3. Open agent detail → choose rental duration (1h / 6h / 24h)
4. Click **RENT** → sign transaction → MON locked in Escrow
5. Use the agent via the execution widget on the detail page

### Publishing an Agent
1. Connect wallet
2. Navigate to `/publish`
3. Fill in agent metadata (name, category, AI provider, description, price per hour)
4. Click **PUBLISH** → sign transaction → agent minted on-chain + stored in DB

### Claiming a Rental (Publishers)
- After a rental expires, publisher calls `claimRental` via the dashboard
- Platform takes a fee; remainder goes to publisher

---

## API Routes

All routes live under `apps/frontend/src/app/api/v1/`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/agents` | List all agents |
| `POST` | `/api/v1/agents/publish` | Create agent record in DB post on-chain publish |
| `GET` | `/api/v1/agents/[id]` | Get single agent |
| `POST` | `/api/v1/agents/[id]/run` | Execute agent (validates active rental on-chain) |
| `POST` | `/api/v1/agents/[id]/claim` | Claim expired rental payment |
| `POST` | `/api/v1/agents/rent` | Record rental in DB post on-chain rent |
| `GET` | `/api/v1/rentals/agent/[agent_id]` | Rentals for a given agent |
| `GET` | `/api/v1/rentals/user/[address]` | Rentals for a wallet address |

---

## Database Schema (Supabase / PostgreSQL)

Managed via **Drizzle ORM** in `packages/db/`.

- **AgentsTable** — on-chain agent metadata mirrored to DB (`id`, `owner`, `name`, `category`, `provider`, `pricePerHour`, `storageUri`, `active`)
- **RentalsTable** — rental records (`agentId`, `renter`, `expiresAt`, `payment`, `claimed`, `txHash`)

---

## Design System

The UI follows a **brutalist editorial** aesthetic:

- **Typography:** EB Garamond (serif, italic headlines) + DM Mono / Menlo (UI text)
- **Palette:** `#FCFBF9` off-white · `#111111` ink · `#FF4A3D` accent diamond
- **Layout:** Fixed 220 px sidebar + full-height main content
- **Components:** Pill buttons, geometric nav icons, stark borders, monochrome modals

---

## Roadmap

- [ ] Agent execution result streaming
- [ ] Publisher reputation scores (on-chain)
- [ ] Multi-chain support (Monad Mainnet on launch)
- [ ] Agent composability — rent chains of agents in one tx
- [ ] Mobile-responsive layout

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add xyz"`
4. Open a pull request against `main`

---

## License

MIT
