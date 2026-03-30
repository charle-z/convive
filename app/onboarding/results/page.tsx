"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { DollarSign, Share2 } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import StepIndicator from "@/components/onboarding/StepIndicator";
import MatchCard from "@/components/match/MatchCard";
import MatchLoadingScreen from "@/components/onboarding/MatchLoadingScreen";
import CompatibilityReceipt from "@/components/match/CompatibilityReceipt";
import { getAppUrl } from "@/lib/site-url";
import { SEED_PROFILES } from "@/lib/seed-data";
import { calculateMatch } from "@/lib/matching";
import {
  calculateProjectedAnnualValue,
  getBudgetMonthly,
  getSpacePriceMonthly,
} from "@/lib/budget";
import { readSpaceData, type SpaceData } from "@/lib/space-data";
import {
  DEFAULT_INTENT,
  INTENT_STORAGE_KEY,
  normalizeIntent,
} from "@/lib/intent";
import type { MatchPair, ProfileAnswers, SearchIntent } from "@/lib/types";

const SPACE_TYPE_LABELS: Record<string, string> = {
  "cuarto-privado": "Cuarto privado",
  apartamento: "Apartamento completo",
  "cuarto-compartido": "Cuarto compartido",
};

function SpaceCard({ data }: { data: SpaceData }) {
  const label = SPACE_TYPE_LABELS[data.spaceType ?? ""] ?? data.spaceType ?? "Espacio";
  const precio = data.precio
    ? `$${Number(data.precio).toLocaleString("es-CO")} /mes`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-5 mb-6 flex items-start gap-4"
      style={{
        backgroundColor: "rgba(108,92,231,0.07)",
        border: "1px solid rgba(108,92,231,0.25)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-lg"
        style={{ backgroundColor: "rgba(108,92,231,0.15)" }}
      >
        🏠
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-secondary mb-0.5">Tu espacio</p>
        <p className="font-semibold text-sm">
          {label}
          {data.barrio ? ` · ${data.barrio}` : ""}
          {precio ? ` · ${precio}` : ""}
        </p>
        {data.descripcion && (
          <p className="text-xs text-text-secondary mt-1 line-clamp-2">
            {data.descripcion}
          </p>
        )}
      </div>
    </motion.div>
  );
}

const STEP_LABELS: Record<SearchIntent, string[]> = {
  "busco-cuarto": ["¿Qué buscas?", "Tu perfil", "Tus matches"],
  "busco-grupo": ["¿Qué buscas?", "Tu perfil", "Personas compatibles"],
  "ofrezco-cuarto": ["Tu espacio", "Tu perfil", "Personas compatibles"],
};
const MATCHES_CACHE_KEY = "convive_matches_cache";

interface MatchesCache {
  profileKey: string;
  matches: MatchPair[];
  presupuesto: string;
}

const RESULTS_COPY: Record<
  SearchIntent,
  {
    title: string;
    description: string;
    noProfileTitle: string;
    noProfileDescription: string;
    completeProfileLabel: string;
    adjustLabel: string;
    summaryLabel: string;
    shareText: (score: number) => string;
    savingsLabel: string;
    savingsSubline: string;
    savingsNote: string;
    receiptAmountLabel: string;
  }
> = {
  "busco-cuarto": {
    title: "Tus matches en Cali",
    description: "Ordenados por compatibilidad real, no por quién pagó más.",
    noProfileTitle: "Primero completa tu perfil",
    noProfileDescription:
      "Necesitamos saber más de ti para mostrarte matches compatibles.",
    completeProfileLabel: "Completar perfil",
    adjustLabel: "← Ajustar mi perfil",
    summaryLabel: "matches encontrados",
    shareText: (score) =>
      `Encontré mi roomie ideal en Convive 🏠\nMi mejor match tiene ${score}% de compatibilidad.\n¿Cuál es el tuyo? → ${getAppUrl()}`,
    savingsLabel: "Tu ahorro estimado viviendo con un roomie compatible",
    savingsSubline: "al año vs vivir solo en Cali",
    savingsNote:
      "Estimado con tu rango de presupuesto, el score global del match y su compatibilidad economica",
    receiptAmountLabel: "AHORRO PROYECTADO",
  },
  "busco-grupo": {
    title: "Personas compatibles para armar grupo contigo",
    description:
      "Ordenadas por compatibilidad real para encontrar con quién arrendar juntos.",
    noProfileTitle: "Primero completa tu perfil",
    noProfileDescription:
      "Necesitamos saber cómo te gustaría vivir para mostrarte personas compatibles.",
    completeProfileLabel: "Completar perfil",
    adjustLabel: "← Ajustar mi perfil",
    summaryLabel: "personas compatibles encontradas",
    shareText: (score) =>
      `Encontré personas compatibles para armar grupo en Convive 🏠\nMi mejor compatibilidad tiene ${score}%.\n¿Cuál es la tuya? → ${getAppUrl()}`,
    savingsLabel: "Tu ahorro estimado si armas grupo con personas compatibles",
    savingsSubline: "al año vs vivir solo en Cali",
    savingsNote:
      "Estimado con tu rango de presupuesto, el score global del match y su compatibilidad economica",
    receiptAmountLabel: "AHORRO PROYECTADO",
  },
  "ofrezco-cuarto": {
    title: "Personas compatibles para tu espacio",
    description: "Ordenadas por compatibilidad real de convivencia con tu perfil.",
    noProfileTitle: "Primero define tu perfil",
    noProfileDescription:
      "Necesitamos saber cómo eres para encontrar el roomie ideal para tu espacio.",
    completeProfileLabel: "Definir mi perfil",
    adjustLabel: "← Ajustar mi perfil",
    summaryLabel: "personas compatibles encontradas",
    shareText: (score) =>
      `Encontré el roomie ideal para mi espacio en Convive 🏠\nMi mejor match tiene ${score}% de compatibilidad.\n¿Encuentras el tuyo? → ${getAppUrl()}`,
    savingsLabel: "Aporte anual estimado del roomie ideal",
    savingsSubline: "al año para cubrir el valor del espacio",
    savingsNote:
      "Calculado con el valor mensual del espacio, el score global del match y su compatibilidad economica",
    receiptAmountLabel: "APORTE PROYECTADO",
  },
};

function readMatchesCache(profileKey: string): MatchesCache | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(MATCHES_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<MatchesCache>;
    if (
      parsed.profileKey !== profileKey ||
      !Array.isArray(parsed.matches) ||
      typeof parsed.presupuesto !== "string"
    ) {
      return null;
    }

    return {
      profileKey: parsed.profileKey,
      matches: parsed.matches as MatchPair[],
      presupuesto: parsed.presupuesto,
    };
  } catch {
    return null;
  }
}

function writeMatchesCache(cache: MatchesCache) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(MATCHES_CACHE_KEY, JSON.stringify(cache));
}

function SkeletonCard() {
  return (
    <div className="flex gap-5 p-5 rounded-2xl bg-surface border border-border/60 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-surface-hover flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-surface-hover rounded w-2/5" />
        <div className="h-3 bg-surface-hover rounded w-3/5" />
        <div className="h-3 bg-surface-hover rounded w-full" />
        <div className="h-1.5 bg-surface-hover rounded-full w-full" />
        <div className="flex gap-2">
          <div className="h-5 bg-surface-hover rounded-full w-20" />
          <div className="h-5 bg-surface-hover rounded-full w-16" />
          <div className="h-5 bg-surface-hover rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

function SavingsCard({
  savingsAnnual,
  label,
  subline,
  note,
}: {
  savingsAnnual: number;
  label: string;
  subline: string;
  note: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * savingsAnnual));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, savingsAnnual]);

  const formatted = displayed.toLocaleString("es-CO").replace(/,/g, ".");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl p-5 mb-4 flex items-start gap-4"
      style={{
        backgroundColor: "rgba(0,184,148,0.08)",
        border: "1px solid rgba(0,184,148,0.25)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: "rgba(0,184,148,0.15)" }}
      >
        <DollarSign className="w-5 h-5" style={{ color: "var(--success)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-secondary mb-1">{label}</p>
        <p
          className="text-3xl font-bold font-mono leading-none mb-1"
          style={{ color: "var(--success)" }}
        >
          ${formatted}
        </p>
        <p className="text-sm text-text-secondary">{subline}</p>
        <p className="text-xs mt-1" style={{ color: "rgba(139,139,163,0.6)" }}>
          {note}
        </p>
      </div>
    </motion.div>
  );
}

function ShareButton({
  score,
  shareText,
}: {
  score: number;
  shareText: (score: number) => string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = shareText(score);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text, url: getAppUrl() });
        return;
      } catch {}
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 mb-6"
      style={{
        borderColor: copied ? "rgba(0,184,148,0.4)" : "rgba(108,92,231,0.4)",
        backgroundColor: copied ? "rgba(0,184,148,0.08)" : "rgba(108,92,231,0.08)",
        color: copied ? "var(--success)" : "var(--primary-light)",
      }}
    >
      <Share2 className="w-4 h-4" />
      {copied ? "¡Copiado! ✓" : "Compartir mi resultado"}
    </motion.button>
  );
}

export default function ResultsPage() {
  const [intent, setIntent] = useState<SearchIntent>(DEFAULT_INTENT);
  const [animDone, setAnimDone] = useState(false);
  const [fetchDone, setFetchDone] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const [error, setError] = useState(false);
  const [matches, setMatches] = useState<MatchPair[]>([]);
  const [presupuesto, setPresupuesto] = useState("600-900");
  const [receiptMatch, setReceiptMatch] = useState<MatchPair | null>(null);
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);

  const copy = RESULTS_COPY[intent];
  const stepLabels = STEP_LABELS[intent];
  const loading = !animDone || !fetchDone;
  const spacePriceMonthly = getSpacePriceMonthly(spaceData?.precio);
  const topMatchSavingsAnnual = matches[0]
    ? calculateProjectedAnnualValue({
        intent,
        budget: presupuesto,
        result: matches[0].result,
        spacePriceMonthly,
      })
    : (intent === "ofrezco-cuarto" && spacePriceMonthly
        ? spacePriceMonthly
        : getBudgetMonthly(presupuesto)) * 12;

  useEffect(() => {
    const storedIntent = normalizeIntent(localStorage.getItem(INTENT_STORAGE_KEY));
    setIntent(storedIntent);

    if (storedIntent === "ofrezco-cuarto") {
      try {
        setSpaceData(readSpaceData());
      } catch {}
    }

    const saved = localStorage.getItem("convive_profile");
    if (!saved) {
      setNoProfile(true);
      setAnimDone(true);
      setFetchDone(true);
      return;
    }

    let profile: ProfileAnswers;
    try {
      profile = JSON.parse(saved) as ProfileAnswers;
    } catch {
      setNoProfile(true);
      setAnimDone(true);
      setFetchDone(true);
      return;
    }

    const cached = readMatchesCache(saved);
    if (cached) {
      setMatches(cached.matches);
      setPresupuesto(cached.presupuesto);
      setAnimDone(true);
      setFetchDone(true);
      return;
    }

    const presupuestoValue =
      typeof profile.presupuesto === "string" ? profile.presupuesto : "600-900";

    setPresupuesto(presupuestoValue);

    try {
      const nextMatches = SEED_PROFILES.map((candidate) => ({
        profile: candidate,
        result: calculateMatch(profile, candidate),
      }))
        .sort((a, b) => b.result.score - a.result.score)
        .slice(0, 10);

      setMatches(nextMatches);
      writeMatchesCache({
        profileKey: saved,
        matches: nextMatches,
        presupuesto: presupuestoValue,
      });
      setFetchDone(true);
    } catch {
      setError(true);
      setFetchDone(true);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {!noProfile && !animDone && (
          <MatchLoadingScreen onComplete={() => setAnimDone(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {receiptMatch && (
          <CompatibilityReceipt
            profile={receiptMatch.profile}
            result={receiptMatch.result}
            savingsAnnual={calculateProjectedAnnualValue({
              intent,
              budget: presupuesto,
              result: receiptMatch.result,
              spacePriceMonthly,
            })}
            amountLabel={copy.receiptAmountLabel}
            amountNote={copy.savingsNote}
            onClose={() => setReceiptMatch(null)}
          />
        )}
      </AnimatePresence>

      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <StepIndicator currentStep={3} labels={stepLabels} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-2 text-text-secondary">{copy.description}</p>
          </motion.div>

          {noProfile && (
            <div className="text-center py-16 flex flex-col items-center gap-4">
              <p className="text-2xl">🏠</p>
              <p className="text-lg font-semibold">{copy.noProfileTitle}</p>
              <p className="text-text-secondary text-sm">
                {copy.noProfileDescription}
              </p>
              <Link
                href="/onboarding"
                className="mt-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-sm transition-colors"
              >
                {copy.completeProfileLabel}
              </Link>
            </div>
          )}

          {error && (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <p className="text-lg font-semibold text-danger">Algo salió mal</p>
              <p className="text-text-secondary text-sm">
                No pudimos calcular tus matches. Intenta de nuevo.
              </p>
              <button
                onClick={() => globalThis.window?.location.reload()}
                className="mt-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary/50 text-sm transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {animDone && !fetchDone && !noProfile && (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && !noProfile && !error && matches.length > 0 && (
            <div className="space-y-4">
              {intent === "ofrezco-cuarto" && spaceData && (
                <SpaceCard data={spaceData} />
              )}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 mb-4 text-sm text-text-secondary">
                <span>
                  <strong className="text-text font-mono">{matches.length}</strong>{" "}
                  {copy.summaryLabel}
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  Mejor score:{" "}
                  <strong
                    className="font-mono"
                    style={{
                      color:
                        matches[0].result.score >= 75
                          ? "var(--success)"
                          : matches[0].result.score >= 50
                          ? "var(--warning)"
                          : "var(--danger)",
                    }}
                  >
                    {matches[0].result.score}%
                  </strong>
                </span>
              </div>

              <SavingsCard
                savingsAnnual={topMatchSavingsAnnual}
                label={copy.savingsLabel}
                subline={copy.savingsSubline}
                note={copy.savingsNote}
              />

              <ShareButton
                score={matches[0].result.score}
                shareText={copy.shareText}
              />

              {matches.map(({ profile, result }, i) => (
                <div key={profile.id}>
                  <MatchCard profile={profile} result={result} index={i} />
                  <div className="flex justify-end mt-1 mb-3">
                    <button
                      onClick={() => setReceiptMatch({ profile, result })}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-border/60 bg-surface hover:border-primary/40 hover:text-text transition-colors"
                    >
                      🧾 Ver recibo de compatibilidad
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-6 text-center flex flex-col items-center gap-3">
                {intent === "ofrezco-cuarto" && (
                  <Link
                    href="/publish"
                    className="text-sm text-text-secondary hover:text-text transition-colors"
                  >
                    ← Editar mi espacio
                  </Link>
                )}
                <Link
                  href="/onboarding/profile"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  {copy.adjustLabel}
                </Link>
              </div>
            </div>
          )}

          {!loading && !noProfile && !error && matches.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg font-semibold">Sin matches por ahora</p>
              <p className="text-text-secondary text-sm mt-2">
                Prueba con preferencias más flexibles.
              </p>
              <Link
                href="/onboarding/profile"
                className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium"
              >
                Ajustar perfil
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
