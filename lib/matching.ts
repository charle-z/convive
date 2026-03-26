// Algoritmo de matching — implementar en Día 3
import type { ConvivenceProfile, MatchResult } from "./types";
import { MATCHING_WEIGHTS } from "./constants";

export function calculateMatch(
  _user: ConvivenceProfile,
  _candidate: ConvivenceProfile
): MatchResult {
  // TODO: implementar scoring completo
  throw new Error("Not implemented");
}

export function calculateMatches(
  user: ConvivenceProfile,
  candidates: ConvivenceProfile[]
): MatchResult[] {
  return candidates
    .map((c) => calculateMatch(user, c))
    .sort((a, b) => b.score - a.score);
}
