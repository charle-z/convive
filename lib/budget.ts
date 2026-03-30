import type { MatchResult, ProfileAnswers, SearchIntent } from "./types";

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

export function getSpacePriceMonthly(rawPrice: number | string | null | undefined): number | null {
  if (typeof rawPrice === "number" && Number.isFinite(rawPrice) && rawPrice > 0) {
    return rawPrice;
  }

  if (typeof rawPrice === "string") {
    const parsed = Number(rawPrice.replace(/[^\d]/g, ""));
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

export function calculateProjectedAnnualSavings(
  budget: string | undefined,
  result: MatchResult
): number {
  const baseAnnual = getBudgetMonthly(budget) * 12;
  return Math.round(baseAnnual * (getBudgetCompatibilityScore(result) / 100));
}

export function calculateProjectedAnnualValue(params: {
  intent: SearchIntent;
  budget: string | undefined;
  result: MatchResult;
  spacePriceMonthly?: number | string | null;
}): number {
  const { intent, budget, result, spacePriceMonthly } = params;

  if (intent === "ofrezco-cuarto") {
    const monthlyPrice = getSpacePriceMonthly(spacePriceMonthly);
    const baseAnnual = (monthlyPrice ?? getBudgetMonthly(budget)) * 12;
    return Math.round(baseAnnual * (getBudgetCompatibilityScore(result) / 100));
  }

  return calculateProjectedAnnualSavings(budget, result);
}
