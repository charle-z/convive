"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  AlertTriangle,
  MapPin,
  Briefcase,
  MessageCircle,
  Handshake,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import MatchDetailLoading from "@/components/match/MatchDetailLoading";
import TrafficLight from "@/components/match/TrafficLight";
import { SEED_PROFILES } from "@/lib/seed-data";
import { calculateMatch } from "@/lib/matching";
import type { SeedProfile, ProfileAnswers, MatchResult } from "@/lib/types";

// ─── Labels legibles ───────────────────────────────────────────────────────────

const BUDGET_LABELS: Record<string, string> = {
  "menos-600": "Menos de $600k",
  "600-900": "$600k–$900k",
  "900-1200": "$900k–$1.2M",
  "mas-1200": "Más de $1.2M",
};
const ZONA_LABELS: Record<string, string> = {
  norte: "Norte (Chipichape, Centenario)",
  sur: "Sur (El Peñón, Granada)",
  centro: "Centro (San Antonio)",
  "me-adapto": "Flexible en zona",
};
const HORARIO_LABELS: Record<string, string> = {
  madrugador: "Madrugador/a",
  maananero: "Mañanero/a",
  noctambulo: "Noctámbulo/a",
  variable: "Horario variable",
};
const LIMPIEZA_LABELS: Record<string, string> = {
  obsesivo: "Muy ordenado/a",
  ordenado: "Ordenado/a",
  relajado: "Relajado/a con el orden",
  caos: "Prefiere el caos",
};

// ─── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, trigger: boolean, duration = 900): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

function scoreColor(score: number) {
  if (score >= 75) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

// ─── Página ────────────────────────────────────────────────────────────────────

export default function MatchDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<SeedProfile | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const scoreRef = useRef<HTMLDivElement>(null);
  const [scoreVisible, setScoreVisible] = useState(false);
  const displayScore = useCountUp(result?.score ?? 0, scoreVisible);

  // Observar cuando el score entra al viewport
  useEffect(() => {
    if (!scoreRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setScoreVisible(true); },
      { threshold: 0.5 }
    );
    obs.observe(scoreRef.current);
    return () => obs.disconnect();
  }, [result]);

  // Resolver perfil local + calcular match
  useEffect(() => {
    const saved = localStorage.getItem("convive_profile");
    let userProfile: ProfileAnswers | null = null;

    if (saved) {
      try {
        userProfile = JSON.parse(saved) as ProfileAnswers;
      } catch {
        userProfile = null;
      }
    }

    const found = SEED_PROFILES.find((candidate) => candidate.id === id);
    if (!found) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setProfile(found);

    if (userProfile) {
      setResult(calculateMatch(userProfile, found));
    }

    setLoading(false);
  }, [id]);

  // ── Estados de carga ──
  if (loading) {
    return <MatchDetailLoading />;
  }

  if (notFound || !profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-bg pt-24 px-4 flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-semibold">Perfil no encontrado</p>
          <Link href="/onboarding/results" className="text-primary text-sm hover:underline">
            ← Volver a matches
          </Link>
        </main>
      </>
    );
  }

  const sortedCategories = result
    ? [...result.categories].sort((a, b) => b.score - a.score)
    : [];

  // ── Pacto sugerido ──────────────────────────────────────────────────────────
  function getSuggestedPact(r: NonNullable<typeof result>): string[] {
    const m = Object.fromEntries(r.categories.map((c) => [c.name, c.score]));
    const pacts: string[] = [];
    if ((m["Limpieza"] ?? 100) < 65)
      pacts.push("Definir un estándar mínimo de limpieza y días fijos para áreas comunes.");
    if ((m["Ruido"] ?? 100) < 65)
      pacts.push("Acordar un horario de silencio, especialmente en las noches.");
    if ((m["Visitas"] ?? 100) < 65)
      pacts.push("Avisar con anticipación para visitas y pactar una frecuencia máxima.");
    if ((m["Horario"] ?? 100) < 65)
      pacts.push("Respetar el descanso según los horarios habituales de cada uno.");
    if ((m["Fiestas"] ?? 100) < 65)
      pacts.push("Establecer cuántas reuniones al mes son aceptables y con cuánto aviso.");
    if ((m["Gastos"] ?? 100) < 65)
      pacts.push("Acordar desde el día 1 cómo se dividen y pagan los servicios.");
    if (pacts.length === 0)
      pacts.push("Alta compatibilidad. Igual conversen sobre expectativas antes de mudarse.");
    return pacts.slice(0, 3);
  }

  const tags = [
    { label: BUDGET_LABELS[profile.presupuesto] ?? profile.presupuesto },
    { label: ZONA_LABELS[profile.zona] ?? profile.zona },
    { label: HORARIO_LABELS[profile.horario] ?? profile.horario },
    { label: LIMPIEZA_LABELS[profile.limpieza] ?? profile.limpieza },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Botón volver */}
          <Link
            href="/onboarding/results"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors mb-6 mt-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a matches
          </Link>

          {/* ── Header del perfil ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:items-start sm:flex-row gap-5 p-6 rounded-2xl bg-surface border border-border/60 mb-6"
          >
            {/* Avatar */}
            <Image
              src={profile.foto}
              alt={profile.nombre}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-border self-start flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold">
                    {profile.nombre},{" "}
                    <span className="text-text-secondary font-normal text-xl">
                      {profile.edad}
                    </span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {profile.ocupacion}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {profile.barrio}
                    </span>
                  </div>
                </div>

                {/* Score grande */}
                {result && (
                  <div ref={scoreRef} className="flex flex-col items-center flex-shrink-0">
                    <span
                      className="text-4xl font-bold font-mono leading-none"
                      style={{ color: scoreColor(result.score) }}
                    >
                      {displayScore}%
                    </span>
                    <span className="text-xs text-text-secondary mt-0.5">
                      compatible
                    </span>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {profile.descripcion}
              </p>

              {/* Badge dealbreaker */}
              {result?.hasDealbreaker && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/15 border border-danger/30 text-danger text-xs font-medium">
                  <AlertTriangle className="w-3 h-3" />
                  Conflicto detectado
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Semáforo completo ── */}
          {result && sortedCategories.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3">
                Compatibilidad por categoría
              </h2>
              <motion.div
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                {sortedCategories.map((cat) => (
                  <motion.div
                    key={cat.name}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                  >
                    <TrafficLight
                      name={cat.name}
                      score={cat.score}
                      icon={cat.icon}
                      weight={cat.weight}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* ── Dealbreakers ── */}
          {result?.hasDealbreaker &&
            result.dealbreakersFound.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-6 p-5 rounded-2xl border"
                style={{
                  backgroundColor: "rgba(225,112,85,0.07)",
                  borderColor: "rgba(225,112,85,0.3)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  <h2 className="text-base font-semibold text-danger">
                    Estos puntos pueden generar conflicto:
                  </h2>
                </div>
                <ul className="space-y-2">
                  {result.dealbreakersFound.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-danger/70 flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

          {/* ── Sobre esta persona ── */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-8 p-5 rounded-2xl bg-surface border border-border/60"
          >
            <h2 className="text-lg font-semibold mb-3">
              Sobre {profile.nombre.split(" ")[0]}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {profile.descripcion}
            </p>

            {/* Tags de preferencias */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface-hover border border-border/60 text-text-secondary"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.section>

          {/* ── Pacto de convivencia sugerido ── */}
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.48 }}
              className="mb-8 p-5 rounded-2xl border border-border/60"
              style={{ backgroundColor: "rgba(108,92,231,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="w-4 h-4" style={{ color: "var(--primary-light)" }} />
                <h2 className="text-base font-semibold">Pacto de convivencia sugerido</h2>
              </div>
              <p className="text-xs text-text-secondary mb-3">
                Basado en sus diferencias, estos son los puntos que deberían acordar antes de mudarse:
              </p>
              <ul className="space-y-2">
                {getSuggestedPact(result).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                      style={{ backgroundColor: "rgba(108,92,231,0.15)", color: "var(--primary-light)" }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* ── CTA WhatsApp ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
            <p className="text-xs text-text-secondary">
              Sin registro. Sin intermediarios.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
