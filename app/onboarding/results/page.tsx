"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import StepIndicator from "@/components/onboarding/StepIndicator";
import MatchCard from "@/components/match/MatchCard";
import type { MatchPair } from "@/lib/types";

const STEP_LABELS = ["¿Qué buscas?", "Tu perfil", "Tus matches"];

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

export default function ResultsPage() {
  const [matches, setMatches] = useState<MatchPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProfile, setNoProfile] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("convive_profile");
    if (!saved) {
      setNoProfile(true);
      setLoading(false);
      return;
    }

    let profile: unknown;
    try {
      profile = JSON.parse(saved);
    } catch {
      setNoProfile(true);
      setLoading(false);
      return;
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
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
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

          {/* Estado: sin perfil */}
          {noProfile && (
            <div className="text-center py-16 flex flex-col items-center gap-4">
              <p className="text-2xl">🏠</p>
              <p className="text-lg font-semibold">
                Primero completa tu perfil
              </p>
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

          {/* Estado: error */}
          {error && (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <p className="text-lg font-semibold text-danger">
                Algo salió mal
              </p>
              <p className="text-text-secondary text-sm">
                No pudimos calcular tus matches. Intenta de nuevo.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary/50 text-sm transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Estado: cargando */}
          {loading && !noProfile && (
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
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 mb-6 text-sm text-text-secondary">
                <span>
                  <strong className="text-text font-mono">
                    {matches.length}
                  </strong>{" "}
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

              {matches.map(({ profile, result }, i) => (
                <MatchCard
                  key={profile.id}
                  profile={profile}
                  result={result}
                  index={i}
                />
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
