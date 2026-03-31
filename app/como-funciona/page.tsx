"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  Cpu,
  BarChart3,
  DollarSign,
  MapPin,
  Sparkles,
  Volume2,
  Clock,
  Users,
  PawPrint,
  Wind,
  UtensilsCrossed,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// ─── Datos ──────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: "15",
    label: "preguntas para construir tu perfil de convivencia",
  },
  {
    value: "12",
    label: "categorías ponderadas según su impacto real",
  },
  {
    value: "22",
    label: "perfiles demo localizados en Cali para explorar matches",
  },
];

const STEPS = [
  {
    number: "01",
    icon: UserCheck,
    title: "Defines tu perfil en 5 minutos",
    desc: "Un quiz de 15 preguntas cubre todo lo que importa para una convivencia real: cuánto puedes pagar, en qué zona de Cali buscas, qué tan ordenado eres, si tienes mascotas, si fumas, qué horario manejas, y mucho más.",
    detail:
      "No te pedimos fotos bonitas ni descripciones genéricas. Te preguntamos cosas concretas: ¿cocinas todos los días o casi nunca tocas la cocina? ¿Recibes visitas seguido o tu casa es tu templo? ¿Puedes con el ruido o necesitas silencio?",
  },
  {
    number: "02",
    icon: Cpu,
    title: "El motor cruza 12 categorías con pesos",
    desc: "Cada respuesta tuya se cruza con la de cada candidato usando pesos distintos según el impacto real en la convivencia. Presupuesto y limpieza pesan más porque generan los conflictos más frecuentes.",
    detail: null,
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Ves exactamente por qué son compatibles",
    desc: "No solo un número. Un semáforo por categoría te muestra dónde están alineados (verde), dónde hay diferencias menores (amarillo) y dónde puede haber fricción (rojo).",
    detail:
      "Los dealbreakers se muestran como alertas independientes, sin bajar el score, para que puedas decidir con información completa. Si alguien tiene perro y tú eres alérgico, lo ves antes de escribirle.",
  },
];

const WEIGHTS = [
  { label: "Presupuesto", weight: 20, icon: DollarSign },
  { label: "Limpieza", weight: 15, icon: Sparkles },
  { label: "Zona", weight: 15, icon: MapPin },
  { label: "Ruido", weight: 12, icon: Volume2 },
  { label: "Horario", weight: 10, icon: Clock },
  { label: "Visitas", weight: 8, icon: Users },
  { label: "Mascotas", weight: 5, icon: PawPrint },
  { label: "Fumar", weight: 5, icon: Wind },
  { label: "Cocina", weight: 2.5, icon: UtensilsCrossed },
];

const DEMO_CATEGORIES = [
  { name: "Presupuesto", score: 90, color: "var(--success)" },
  { name: "Zona", score: 80, color: "var(--success)" },
  { name: "Horario", score: 55, color: "var(--warning)" },
  { name: "Limpieza", score: 40, color: "var(--warning)" },
  { name: "Ruido", score: 20, color: "var(--danger)" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 75) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

function scoreLabel(score: number) {
  if (score >= 75) return "Compatible";
  if (score >= 50) return "Diferencias menores";
  return "Posible conflicto";
}

// ─── Componentes internos ────────────────────────────────────────────────────

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-border bg-surface"
    >
      <div
        className="text-3xl font-bold font-mono mb-2"
        style={{ color: "var(--primary-light)" }}
      >
        {value}
      </div>
      <p className="text-sm text-text-secondary leading-snug">{label}</p>
    </motion.div>
  );
}

function WeightBar({ label, weight, icon: Icon, delay }: {
  label: string;
  weight: number;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3"
    >
      <Icon className="w-4 h-4 flex-shrink-0 text-text-secondary" />
      <span className="text-sm text-text-secondary w-24 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-surface-hover rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(weight / 20) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>
      <span className="text-xs font-mono text-text-secondary w-10 text-right">
        {weight}%
      </span>
    </motion.div>
  );
}

function DemoLight({ name, score, delay }: { name: string; score: number; delay: number }) {
  const color = scoreColor(score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface"
    >
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs font-mono" style={{ color }}>
            {score}%
          </span>
        </div>
        <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1">{scoreLabel(score)}</p>
      </div>
    </motion.div>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

export default function ComoFuncionaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-text">

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs text-text-secondary mb-6"
              style={{ backgroundColor: "var(--surface)" }}
            >
              Sin registro · Sin intermediarios
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
            >
              Así funciona{" "}
              <span style={{ color: "var(--primary-light)" }}>Convive</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg text-text-secondary max-w-xl mx-auto"
            >
              Un motor de compatibilidad real. No un portal de anuncios con fotos bonitas.
            </motion.p>
          </div>
        </section>

        {/* ── El problema real ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              Qué analiza Convive
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-10 max-w-2xl"
            >
              Convive prioriza las variables que más suelen definir si una convivencia
              se sostiene o se rompe: dinero, hábitos, horarios, visitas, ruido y reglas del hogar.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <StatCard key={i} {...s} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Cómo funciona ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-12"
            >
              Cómo funciona el motor
            </motion.h2>
            <div className="space-y-12">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(108,92,231,0.12)", border: "1px solid rgba(108,92,231,0.3)" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: "var(--primary-light)" }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono"
                          style={{ color: "var(--primary)" }}
                        >
                          {step.number}
                        </span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed mb-3">
                        {step.desc}
                      </p>
                      {step.detail && (
                        <p className="text-sm text-text-secondary/70 leading-relaxed">
                          {step.detail}
                        </p>
                      )}

                      {/* Peso visual para el paso 2 */}
                      {step.number === "02" && (
                        <div className="mt-6 space-y-3 p-5 rounded-xl border border-border bg-surface">
                          <p className="text-xs text-text-secondary mb-4 uppercase tracking-wider">
                            Pesos del algoritmo
                          </p>
                          {WEIGHTS.map((w, wi) => (
                            <WeightBar key={w.label} {...w} delay={wi * 0.05} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Demo semáforo ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              El semáforo de compatibilidad
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              Así se ve el detalle de un match de demo. Cada categoría tiene su propio indicador.
            </motion.p>

            <div
              className="p-6 rounded-2xl border border-border"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Score header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-text-secondary">Compatibilidad con</p>
                  <p className="text-lg font-bold">Valentina Torres, 26</p>
                  <p className="text-sm text-text-secondary">Diseñadora · Granada</p>
                </div>
                <div
                  className="text-4xl font-bold font-mono"
                  style={{ color: "var(--warning)" }}
                >
                  62%
                </div>
              </div>

              {/* Semáforo demo */}
              <div className="space-y-3">
                {DEMO_CATEGORIES.map((cat, i) => (
                  <DemoLight key={cat.name} name={cat.name} score={cat.score} delay={i * 0.08} />
                ))}
              </div>

              <p className="text-xs text-text-secondary mt-4 text-center">
                * Datos de ejemplo ilustrativos
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Encuentra tu roomie ahora
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              5 minutos. Sin registro. Sin tarjeta.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--primary), #8B7CF6)",
                }}
              >
                Comenzar ahora →
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
