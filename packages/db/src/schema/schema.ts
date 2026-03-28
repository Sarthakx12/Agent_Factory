import { sql } from "drizzle-orm";
import {
  pgTable as table,
  serial,
  text,
  timestamp,
  decimal,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const AgentsTable = table("agent_index", {
  id: serial("id").primaryKey(),
  on_chain_id: text("on_chain_id").unique(),
  owner: text("owner").notNull(),
  storage_path: text("storage_path").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price_per_hr: decimal("price_per_hr").notNull(),
  total_rentals: integer("total_rentals").notNull().default(0),
  created_at: timestamp("created_at").notNull().default(sql`now()`),
});

export const RentalsTable = table("rentals", {
  id: serial("id").primaryKey(),
  agent_id: integer("agent_id").references(() => AgentsTable.id),
  renter: text("renter").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  calls_made: integer("calls_made").notNull().default(0),
  tx_hash: text("tx_hash"),
  payment_amount: decimal("payment_amount"),
  claimed: boolean("claimed").notNull().default(false),
  started_at: timestamp("started_at"),
  claim_tx_hash: text("claim_tx_hash"),
  created_at: timestamp("created_at").notNull().default(sql`now()`),
});
