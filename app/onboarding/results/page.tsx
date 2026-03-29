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
import type { MatchPair } from "@/lib/types";

const STEP_LABELS = ["¿Qué buscas?", "Tu perfil", "Tus matches"];

const BUDGET_MONTHLY: Record<string, number> = {
  "menos-600": 500000,
  "600-900": 750000,
  "900-1200": 1050000,
  "mas-1200": 1500000,
};

const APP_URL = "http://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io";

// ─── Skeleton ──────────────────────────────────────────────────────────────

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

// ─── Savings Card ──────────────────────────────────────────────────────────

function SavingsCard({ presupuesto }: { presupuesto: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  const monthly = BUDGET_MONTHLY[presupuesto] ?? 750000;
  const annual = monthly * 12;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * annual));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, annual]);

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
        <p className="text-xs text-text-secondary mb-1">
          Tu ahorro estimado viviendo con un roomie compatible
        </p>
        <p
          className="text-3xl font-bold font-mono leading-none mb-1"
          style={{ color: "var(--success)" }}
        >
          ${formatted}
        </p>
        <p className="text-sm text-text-secondary">al año vs vivir solo en Cali</p>
        <p className="text-xs mt-1" style={{ color: "rgba(139,139,163,0.6)" }}>
          Basado en tu rango de presupuesto · Estimado referencial
        </p>
      </div>
    </motion.div>
  );
}

// ─── Share Button ──────────────────────────────────────────────────────────

function ShareButton({ score }: { score: number }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = `Encontré mi roomie ideal en Convive 🏠\nMi mejor match tiene ${score}% de compatibilidad.\n¿Cuál es el tuyo? → ${APP_URL}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  // Two independent flags that must both be true before showing results
  const [animDone, setAnimDone] = useState(false);
  const [fetchDone, setFetchDone] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const [error, setError] = useState(false);
  const [matches, setMatches] = useState<MatchPair[]>([]);
  const [presupuesto, setPresupuesto] = useState<string>("600-900");
  const [receiptMatch, setReceiptMatch] = useState<MatchPair | null>(null);

  const loading = !animDone || !fetchDone;

  useEffect(() => {
    const saved = localStorage.getItem("convive_profile");
    if (!saved) {
      setNoProfile(true);
      setAnimDone(true);
      setFetchDone(true);
      return;
    }

    let profile: Record<string, unknown>;
    try {
      profile = JSON.parse(saved);
    } catch {
      setNoProfile(true);
      setAnimDone(true);
      setFetchDone(true);
      return;
    }

    if (profile.presupuesto && typeof profile.presupuesto === "string") {
      setPresupuesto(profile.presupuesto);
    }

    fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("api error");
        return r.json();
      })
      .then((data) => {
        setMatches(data.matches ?? []);
        setFetchDone(true);
      })
      .catch(() => {
        setError(true);
        setFetchDone(true);
      });
  }, []);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!noProfile && !animDone && (
          <MatchLoadingScreen onComplete={() => setAnimDone(true)} />
        )}
      </AnimatePresence>

      {/* Receipt modal */}
      <AnimatePresence>
        {receiptMatch && (
          <CompatibilityReceipt
            profile={receiptMatch.profile}
            result={receiptMatch.result}
            savingsAnnual={(BUDGET_MONTHLY[presupuesto] ?? 750000) * 12}
            onClose={() => setReceiptMatch(null)}
          />
        )}
      </AnimatePresence>

      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="mb-12">
            <StepIndicator currentStep={3} labels={STEP_LABELS} />
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Tus matches en Cali
            </h1>
            <p className="mt-2 text-text-secondary">
              Ordenados por compatibilidad real, no por quién pagó más.
            </p>
          </motion.div>

          {/* Sin perfil */}
          {noProfile && (
            <div className="text-center py-16 flex flex-col items-center gap-4">
              <p className="text-2xl">🏠</p>
              <p className="text-lg font-semibold">Primero completa tu perfil</p>
              <p className="text-text-secondary text-sm">
                Necesitamos saber más de ti para mostrarte matches compatibles.
              </p>
              <Link
                href="/onboarding"
                className="mt-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-sm transition-colors"
              >
                Completar perfil
              </Link>
            </div>
          )}

          {/* Error */}
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

          {/* Skeleton: after animation but fetch still running */}
          {animDone && !fetchDone && !noProfile && (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Resultados */}
          {!loading && !noProfile && !error && matches.length > 0 && (
            <div className="space-y-4">
              {/* Resumen rápido */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 mb-4 text-sm text-text-secondary">
                <span>
                  <strong className="text-text font-mono">{matches.length}</strong>{" "}
                  matches encontrados
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

              {/* Card de ahorro */}
              <SavingsCard presupuesto={presupuesto} />

              {/* Botón compartir */}
              <ShareButton score={matches[0].result.score} />

              {matches.map(({ profile, result }, i) => (
                <div key={profile.id}>
                  <MatchCard
                    profile={profile}
                    result={result}
                    index={i}
                  />
                  <div className="flex justify-end mt-1 mb-3">
                    <button
                      onClick={() => setReceiptMatch({ profile, result })}
                      className="text-xs text-text-secondary hover:text-text transition-colors flex items-center gap-1"
                    >
                      🧾 Ver recibo de compatibilidad
                    </button>
                  </div>
                </div>
              ))}

              {/* CTA al final */}
              <div className="pt-6 text-center">
                <Link
                  href="/onboarding/profile"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  ← Ajustar mi perfil
                </Link>
              </div>
            </div>
          )}

          {/* Sin resultados */}
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
