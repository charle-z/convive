import type { MatchResult, ProfileAnswers } from "./types";

export const BUDGET_MONTHLY: Record<ProfileAnswers["presupuesto"], number> = {
  "menos-600": 500000,
  "600-900": 750000,
  "900-1200": 1050000,
  "mas-1200": 1500000,
};

export function getBudgetMonthly(budget: string | undefined): number {
  if (!budget) return BUDGET_MONTHLY["600-900"];
  return BUDGET_MONTHLY[budget as ProfileAnswers["presupuesto"]] ?? BUDGET_MONTHLY["600-900"];
}

export function getBudgetCompatibilityScore(result: MatchResult): number {
  return result.categories.find((category) => category.name === "Presupuesto")?.score ?? 100;
}

export function calculateProjectedAnnualSavings(
  budget: string | undefined,
  result: MatchResult
): number {
  const baseAnnual = getBudgetMonthly(budget) * 12;
  return Math.round(baseAnnual * (getBudgetCompatibilityScore(result) / 100));
}
