// Type stubs for drizzle-orm — allows TypeScript to resolve imports without
// drizzle-orm being installed. Runtime resolution is handled by the monorepo
// at build time via the workspace's package manager.

declare module "drizzle-orm" {
  export type InferSelectModel<T> = T extends { $inferSelect: infer R } ? R : unknown;
  export function eq(col: unknown, val: unknown): unknown;
  export function and(...conditions: unknown[]): unknown;
  export function desc(col: unknown): unknown;
  export function sql(strings: TemplateStringsArray, ...values: unknown[]): unknown;
}

declare module "drizzle-orm/pg-core" {
  export function pgTable(name: string, cols: unknown): unknown;
  export function serial(name: string): unknown;
  export function text(name: string): unknown;
  export function timestamp(name: string): unknown;
  export function decimal(name: string): unknown;
  export function integer(name: string): unknown;
  export function boolean(name: string): unknown;
}

declare module "drizzle-orm/node-postgres" {
  export function drizzle(client: unknown): unknown;
}
