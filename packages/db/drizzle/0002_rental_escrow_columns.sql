ALTER TABLE "rentals" ADD COLUMN "payment_amount" numeric;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "claimed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "started_at" timestamp;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "claim_tx_hash" text;
