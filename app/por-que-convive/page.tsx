"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// ─── Datos ──────────────────────────────────────────────────────────────────

const COST_ROWS = [
  { concept: "Arriendo Granada", solo: "$1.800.000", roomie: "$900.000" },
  { concept: "Servicios", solo: "$250.000", roomie: "$125.000" },
  { concept: "Internet", solo: "$80.000", roomie: "$40.000" },
  { concept: "Total mensual", solo: "$2.130.000", roomie: "$1.065.000", highlight: true },
];

const DIFFERENTIATORS = [
  {
    convive: "Score explicado categoría por categoría",
    others: "\"Llámame si te interesa\"",
    icon: "📊",
  },
  {
    convive: "Dealbreakers visibles antes del primer mensaje",
    others: "Sorpresas el día de la mudanza",
    icon: "⚠️",
  },
  {
    convive: "Compatibilidad real en 12 dimensiones",
    others: "Foto bonita del cuarto y precio",
    icon: "🎯",
  },
];

const PROFILES = [
  {
    emoji: "🎓",
    title: "Recién llegado a la ciudad",
    desc: "Estudiante o profesional que no conoce a nadie en Cali y necesita partir gastos sin arriesgarse con un desconocido. Convive le muestra con quién es compatible antes de tomar una decisión.",
  },
  {
    emoji: "💼",
    title: "Cambié de trabajo y me mudé",
    desc: "Profesional que se traslada a una zona nueva de la ciudad y no puede pagar solo un apartamento en Granada o El Peñón. Quiere un roomie confiable, no cualquier respuesta a un anuncio.",
  },
  {
    emoji: "🏠",
    title: "Tengo un cuarto disponible",
    desc: "Persona que arrienda un apartamento y quiere un roomie que encaje con su estilo de vida, no solo alguien que pague a tiempo. Publica su espacio y recibe solo candidatos compatibles.",
  },
];

// ─── Página ──────────────────────────────────────────────────────────────────

export default function PorQueConvivePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-text">

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
            >
              Vivir bien no debería{" "}
              <span style={{ color: "var(--primary-light)" }}>ser un lujo</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-text-secondary max-w-xl mx-auto"
            >
              En Cali, Medellín y Bogotá, el arriendo se ha encarecido al punto en que
              compartir vivienda no es un plan B — es una decisión inteligente. El problema
              es con quién.
            </motion.p>
          </div>
        </section>

        {/* ── Costo real ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              El costo real de vivir solo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-text-secondary mb-8"
            >
              En un barrio premium de Cali como Granada, la diferencia es brutal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border overflow-hidden"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Header */}
              <div className="grid grid-cols-3 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                <span>Concepto</span>
                <span className="text-center">Solo</span>
                <span className="text-center" style={{ color: "var(--success)" }}>
                  Con roomie Convive
                </span>
              </div>

              {COST_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-6 py-4 border-b border-border/50 last:border-0"
                  style={{
                    backgroundColor: row.highlight ? "rgba(0,184,148,0.06)" : undefined,
                  }}
                >
                  <span
                    className={`text-sm ${row.highlight ? "font-bold" : "text-text-secondary"}`}
                  >
                    {row.concept}
                  </span>
                  <span
                    className="text-center font-mono text-sm"
                    style={{
                      color: row.highlight ? "var(--danger)" : "var(--text-secondary)",
                      fontWeight: row.highlight ? 700 : 400,
                    }}
                  >
                    {row.solo}
                  </span>
                  <span
                    className="text-center font-mono text-sm"
                    style={{
                      color: row.highlight ? "var(--success)" : "var(--text-secondary)",
                      fontWeight: row.highlight ? 700 : 400,
                    }}
                  >
                    {row.roomie}
                  </span>
                </div>
              ))}

              {/* Ahorro anual */}
              <div
                className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                style={{ backgroundColor: "rgba(0,184,148,0.08)", borderTop: "1px solid rgba(0,184,148,0.2)" }}
              >
                <p className="text-sm font-semibold">Ahorro anual con roomie compatible</p>
                <p
                  className="text-3xl font-bold font-mono"
                  style={{ color: "var(--success)" }}
                >
                  $12.780.000
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Diferenciadores ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              No es un portal de anuncios
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-text-secondary mb-10"
            >
              Facebook Marketplace y CompartoApto te muestran cuartos. Convive te muestra compatibilidad.
            </motion.p>

            <div className="space-y-4">
              {DIFFERENTIATORS.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="grid grid-cols-1 sm:grid-cols-[2rem_1fr_1fr] gap-4 p-5 rounded-2xl border border-border items-center"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <span className="text-2xl hidden sm:block">{d.icon}</span>
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--success)" }}
                    />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5 uppercase tracking-wider">
                        Convive
                      </p>
                      <p className="text-sm font-medium">{d.convive}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:border-l sm:border-border sm:pl-4">
                    <XCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--danger)" }}
                    />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5 uppercase tracking-wider">
                        El resto
                      </p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {d.others}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Para quién ── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-10"
            >
              Para quién es Convive
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROFILES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-border"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <div className="text-4xl mb-4">{p.emoji}</div>
                  <h3 className="font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
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
              Empieza gratis ahora
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-text-secondary mb-8"
            >
              Sin registro. Sin tarjeta. Sin drama.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--primary), #8B7CF6)",
                }}
              >
                Encontrar mi roomie →
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
