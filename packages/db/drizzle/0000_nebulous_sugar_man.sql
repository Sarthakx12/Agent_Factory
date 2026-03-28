CREATE TABLE "agent_index" (
	"id" serial PRIMARY KEY NOT NULL,
	"on_chain_id" text,
	"owner" text NOT NULL,
	"storage_path" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"price_per_hr" numeric NOT NULL,
	"total_rentals" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "agent_index_on_chain_id_unique" UNIQUE("on_chain_id")
);
--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"wallet_address" text NOT NULL,
	"provider" text NOT NULL,
	"encrypted_key" text NOT NULL,
	"salt" text NOT NULL,
	"disabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rentals" (
	"id" serial PRIMARY KEY NOT NULL,
	"agent_id" integer,
	"renter" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"calls_made" integer DEFAULT 0 NOT NULL,
	"tx_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_agent_id_agent_index_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agent_index"("id") ON DELETE no action ON UPDATE no action;