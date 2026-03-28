export const categories = [
  "Weather",
  "Code Gen",
  "Data Analysis",
  "Content",
  "Finance",
] as const;

export const providers = [
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "grok", label: "Grok" },
] as const;

export const rentalDurations = [1, 6, 24] as const;
