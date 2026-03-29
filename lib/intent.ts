import type { SearchIntent } from "./types";

export const INTENT_STORAGE_KEY = "convive_intent";
export const DEFAULT_INTENT: SearchIntent = "busco-cuarto";

export function isSearchIntent(value: string | null | undefined): value is SearchIntent {
  return value === "busco-cuarto" || value === "ofrezco-cuarto" || value === "busco-grupo";
}

export function normalizeIntent(value: string | null | undefined): SearchIntent {
  return isSearchIntent(value) ? value : DEFAULT_INTENT;
}
