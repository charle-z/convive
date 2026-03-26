import type { ProfileAnswers, SeedProfile, MatchResult, CategoryScore } from "./types";

// ─── Escalas ordenadas ────────────────────────────────────────────────────────

const BUDGET_ORDER = ["menos-600", "600-900", "900-1200", "mas-1200"] as const;
const LIMPIEZA_ORDER = ["caos", "relajado", "ordenado", "obsesivo"] as const;
const RUIDO_ORDER = ["silencio", "normal", "ocasional", "mucho"] as const;
const VISITAS_ORDER = ["casi-nunca", "1-2-semana", "casi-siempre", "casa-abierta"] as const;

// ─── Funciones de scoring por categoría ──────────────────────────────────────

function diffScore(order: readonly string[], a: string, b: string, points: number[]): number {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  if (ai === -1 || bi === -1) return 50;
  const diff = Math.abs(ai - bi);
  return points[diff] ?? 0;
}

function scoreBudget(a: string, b: string): number {
  return diffScore(BUDGET_ORDER, a, b, [100, 60, 20, 0]);
}

function scoreLimpieza(a: string, b: string): number {
  return diffScore(LIMPIEZA_ORDER, a, b, [100, 70, 35, 0]);
}

function scoreRuido(a: string, b: string): number {
  return diffScore(RUIDO_ORDER, a, b, [100, 65, 20, 20]);
}

function scoreVisitas(a: string, b: string): number {
  return diffScore(VISITAS_ORDER, a, b, [100, 70, 30, 30]);
}

function scoreZona(a: string, b: string): number {
  if (a === "me-adapto" || b === "me-adapto") return 100;
  if (a === b) return 100;
  return 40;
}

function scoreHorario(a: string, b: string): number {
  if (a === b) return 100;
  if (a === "variable" || b === "variable") return 70;
  if (
    (a === "madrugador" && b === "noctambulo") ||
    (a === "noctambulo" && b === "madrugador")
  )
    return 10;
  return 50;
}

function scoreMascotas(a: string, b: string): number {
  if (a === b) return 100;
  if (
    (a === "tengo" && b === "acepto") ||
    (a === "acepto" && b === "tengo") ||
    (a === "acepto" && b === "acepto")
  )
    return 100;
  if (
    (a === "alergico" && b === "tengo") ||
    (a === "tengo" && b === "alergico") ||
    (a === "no-quiero" && b === "tengo") ||
    (a === "tengo" && b === "no-quiero")
  )
    return 0;
  return 60;
}

function scoreFumar(a: string, b: string): number {
  if (a === b) return 100;
  if (a === "indiferente" || b === "indiferente") return 80;
  if (
    (a === "no-fumo" && b === "afuera") ||
    (a === "afuera" && b === "no-fumo")
  )
    return 70;
  if (
    (a === "no-fumo" && b === "en-casa") ||
    (a === "en-casa" && b === "no-fumo")
  )
    return 0;
  return 50;
}

function scoreSimple(a: string, b: string): number {
  return a === b ? 100 : 50;
}

// ─── Dealbreaker checker ──────────────────────────────────────────────────────

function checkDealbreakers(user: ProfileAnswers, candidate: SeedProfile): string[] {
  const conflicts: string[] = [];
  const dbs = user.dealbreakers ?? [];

  if (dbs.includes("animales") && candidate.mascotas === "tengo") {
    conflicts.push(
      "Tienes alergia o miedo a animales y esta persona tiene mascota."
    );
  }
  if (dbs.includes("fumar-cerrado") && candidate.fumar === "en-casa") {
    conflicts.push(
      "No aceptas fumar en espacios cerrados y esta persona fuma en casa."
    );
  }
  if (
    dbs.includes("visitas-sin-avisar") &&
    candidate.visitas === "casa-abierta"
  ) {
    conflicts.push(
      "No aceptas visitas sin avisar y esta persona recibe gente constantemente."
    );
  }
  if (dbs.includes("desorden-extremo") && candidate.limpieza === "caos") {
    conflicts.push(
      "El desorden extremo es innegociable para ti y esta persona vive en caos."
    );
  }

  return conflicts;
}

// ─── Motor principal ──────────────────────────────────────────────────────────

export function calculateMatch(
  user: ProfileAnswers,
  candidate: SeedProfile
): MatchResult {
  const categories: CategoryScore[] = [
    {
      name: "Presupuesto",
      score: scoreBudget(user.presupuesto, candidate.presupuesto),
      weight: 0.2,
      icon: "DollarSign",
    },
    {
      name: "Zona",
      score: scoreZona(user.zona, candidate.zona),
      weight: 0.15,
      icon: "MapPin",
    },
    {
      name: "Limpieza",
      score: scoreLimpieza(user.limpieza, candidate.limpieza),
      weight: 0.15,
      icon: "Sparkles",
    },
    {
      name: "Ruido",
      score: scoreRuido(user.ruido, candidate.ruido),
      weight: 0.12,
      icon: "Volume2",
    },
    {
      name: "Horario",
      score: scoreHorario(user.horario, candidate.horario),
      weight: 0.1,
      icon: "Clock",
    },
    {
      name: "Visitas",
      score: scoreVisitas(user.visitas, candidate.visitas),
      weight: 0.08,
      icon: "Users",
    },
    {
      name: "Mascotas",
      score: scoreMascotas(user.mascotas, candidate.mascotas),
      weight: 0.05,
      icon: "PawPrint",
    },
    {
      name: "Fumar",
      score: scoreFumar(user.fumar, candidate.fumar),
      weight: 0.05,
      icon: "Wind",
    },
    {
      name: "Cocina",
      score: scoreSimple(user.cocina, candidate.cocina),
      weight: 0.025,
      icon: "UtensilsCrossed",
    },
    {
      name: "Fiestas",
      score: scoreSimple(user.fiestas, candidate.fiestas),
      weight: 0.025,
      icon: "PartyPopper",
    },
    {
      name: "Pareja",
      score: scoreSimple(user.pareja, candidate.pareja),
      weight: 0.025,
      icon: "Heart",
    },
    {
      name: "Gastos",
      score: scoreSimple(user.gastos, candidate.gastos),
      weight: 0.025,
      icon: "Receipt",
    },
  ];

  const total = categories.reduce(
    (sum, cat) => sum + cat.score * cat.weight,
    0
  );

  const dealbreakersFound = checkDealbreakers(user, candidate);

  return {
    profileId: candidate.id,
    score: Math.round(total),
    categories,
    hasDealbreaker: dealbreakersFound.length > 0,
    dealbreakersFound,
  };
}

export function calculateMatches(
  user: ProfileAnswers,
  candidates: SeedProfile[]
): MatchResult[] {
  return candidates
    .map((c) => calculateMatch(user, c))
    .sort((a, b) => b.score - a.score);
}
