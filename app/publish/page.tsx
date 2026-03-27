"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Building2, Users, CheckSquare, Square } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

// ─── Datos ──────────────────────────────────────────────────────────────────

const SPACE_TYPES = [
  { id: "cuarto-privado", label: "Cuarto privado", icon: Home, desc: "Tu propio cuarto en un apartamento compartido" },
  { id: "apartamento", label: "Apartamento completo", icon: Building2, desc: "Buscas con quién compartir el arriendo completo" },
  { id: "cuarto-compartido", label: "Cuarto compartido", icon: Users, desc: "Compartes el mismo cuarto con otra persona" },
];

const BARRIOS = [
  "Granada", "El Peñón", "San Antonio", "San Fernando",
  "Chipichape", "Centenario", "Ciudad Jardín", "Versalles",
  "Normandía", "Tequendama", "Menga", "Santa Mónica", "Flora",
];

const GENERO_OPTIONS = [
  { id: "solo-mujeres", label: "Solo mujeres" },
  { id: "solo-hombres", label: "Solo hombres" },
  { id: "sin-preferencia", label: "Sin preferencia" },
  { id: "mixto", label: "Mixto OK" },
];

const PRESUPUESTO_OPTIONS = [
  { id: "menos-600", label: "Menos de $600k" },
  { id: "600-900", label: "$600k – $900k" },
  { id: "900-1200", label: "$900k – $1.2M" },
  { id: "mas-1200", label: "Más de $1.2M" },
];

const REGLAS = [
  { id: "no-fumar", label: "No fumar dentro" },
  { id: "no-mascotas", label: "No mascotas" },
  { id: "silencio-10", label: "Silencio después de las 10pm" },
  { id: "aviso-visitas", label: "Aviso previo para visitas" },
];

// ─── SVG checkmark animado ──────────────────────────────────────────────────

function AnimatedCheck() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        stroke="var(--success)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M24 40 L35 52 L56 28"
        stroke="var(--success)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}

// ─── Pantalla de éxito ──────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-20 gap-6"
    >
      <AnimatedCheck />
      <div>
        <h2 className="text-2xl font-bold mt-2">¡Tu espacio fue publicado!</h2>
        <p className="text-text-secondary mt-2 max-w-sm mx-auto">
          Empezaremos a mostrar tu perfil a roomies compatibles en Cali.
        </p>
      </div>
      <Link
        href="/onboarding"
        className="mt-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-colors"
      >
        Ver mis matches
      </Link>
    </motion.div>
  );
}

// ─── Página ─────────────────────────────────────────────────────────────────

export default function PublishPage() {
  const [submitted, setSubmitted] = useState(false);

  // Sección 1
  const [spaceType, setSpaceType] = useState<string | null>(null);
  const [precio, setPrecio] = useState("");
  const [barrio, setBarrio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Sección 2
  const [genero, setGenero] = useState<string | null>(null);
  const [presupuesto, setPresupuesto] = useState<string | null>(null);
  const [reglas, setReglas] = useState<string[]>([]);

  function toggleRegla(id: string) {
    setReglas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const canSubmit = spaceType && precio && barrio && descripcion && genero && presupuesto;

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <SuccessScreen />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Publicar un espacio
            </h1>
            <p className="mt-2 text-text-secondary">
              Cuéntanos sobre tu lugar y lo que buscas en un roomie.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* ── Sección 1: El espacio ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold">El espacio</h2>

              {/* Tipo de espacio */}
              <div>
                <p className="text-sm text-text-secondary mb-3">
                  ¿Qué tipo de espacio ofreces?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SPACE_TYPES.map(({ id, label, icon: Icon, desc }) => {
                    const active = spaceType === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSpaceType(id)}
                        className="flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-150"
                        style={{
                          backgroundColor: active
                            ? "rgba(108,92,231,0.12)"
                            : "var(--surface)",
                          borderColor: active ? "var(--primary)" : "var(--border)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{
                            color: active ? "var(--primary)" : "var(--text-secondary)",
                          }}
                        />
                        <span className="font-medium text-sm">{label}</span>
                        <span className="text-xs text-text-secondary leading-snug">
                          {desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Precio mensual (COP)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 750000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary/60 focus:outline-none transition-colors text-sm font-mono placeholder:text-text-secondary/50"
                />
              </div>

              {/* Barrio */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Barrio / Sector
                </label>
                <select
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface text-text border border-border focus:border-primary/60 focus:outline-none transition-colors text-sm appearance-none"
                >
                  <option value="" disabled>
                    Selecciona el barrio
                  </option>
                  {BARRIOS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Descripción del espacio
                </label>
                <textarea
                  placeholder="Cuéntanos sobre el lugar, los servicios incluidos, el ambiente..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value.slice(0, 200))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary/60 focus:outline-none transition-colors text-sm resize-none placeholder:text-text-secondary/50"
                />
                <p className="text-xs text-text-secondary mt-1 text-right">
                  {descripcion.length}/200
                </p>
              </div>
            </motion.section>

            {/* Divider */}
            <div className="border-t border-border/50" />

            {/* ── Sección 2: El roomie ideal ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold">El roomie ideal</h2>

              {/* Género preferido */}
              <div>
                <p className="text-sm text-text-secondary mb-3">
                  Preferencia de género
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GENERO_OPTIONS.map(({ id, label }) => {
                    const active = genero === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setGenero(id)}
                        className="px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 text-center"
                        style={{
                          backgroundColor: active
                            ? "rgba(108,92,231,0.12)"
                            : "var(--surface)",
                          borderColor: active ? "var(--primary)" : "var(--border)",
                          color: active ? "var(--primary-light)" : "var(--text-secondary)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Presupuesto esperado */}
              <div>
                <p className="text-sm text-text-secondary mb-3">
                  Presupuesto esperado del roomie
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PRESUPUESTO_OPTIONS.map(({ id, label }) => {
                    const active = presupuesto === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPresupuesto(id)}
                        className="px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 text-left font-mono"
                        style={{
                          backgroundColor: active
                            ? "rgba(108,92,231,0.12)"
                            : "var(--surface)",
                          borderColor: active ? "var(--primary)" : "var(--border)",
                          color: active ? "var(--primary-light)" : "var(--text-secondary)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reglas */}
              <div>
                <p className="text-sm text-text-secondary mb-3">
                  Reglas de convivencia
                </p>
                <div className="space-y-2">
                  {REGLAS.map(({ id, label }) => {
                    const checked = reglas.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleRegla(id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all duration-150 text-left"
                        style={{
                          backgroundColor: checked
                            ? "rgba(108,92,231,0.08)"
                            : "var(--surface)",
                          borderColor: checked
                            ? "rgba(108,92,231,0.4)"
                            : "var(--border)",
                        }}
                      >
                        {checked ? (
                          <CheckSquare
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "var(--primary)" }}
                          />
                        ) : (
                          <Square className="w-4 h-4 flex-shrink-0 text-text-secondary" />
                        )}
                        <span
                          style={{
                            color: checked ? "var(--text)" : "var(--text-secondary)",
                          }}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: canSubmit
                    ? "linear-gradient(135deg, var(--primary), #8B7CF6)"
                    : "var(--surface-hover)",
                }}
              >
                Publicar espacio →
              </button>
              {!canSubmit && (
                <p className="text-center text-xs text-text-secondary mt-2">
                  Completa todos los campos para continuar
                </p>
              )}
            </motion.div>
          </form>
        </div>
      </main>
    </>
  );
}
