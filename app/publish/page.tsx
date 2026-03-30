"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Building2, Users, CheckSquare, Square, ArrowRight } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { INTENT_STORAGE_KEY } from "@/lib/intent";
import { readSpaceData, SPACE_DATA_STORAGE_KEY } from "@/lib/space-data";

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

const REQUIRED_FIELD_LABELS = {
  spaceType: "tipo de espacio",
  precio: "precio mensual",
  barrio: "barrio o sector",
  descripcion: "descripción del espacio",
  genero: "preferencia de género",
  presupuesto: "presupuesto esperado del roomie",
} as const;

// ─── Pantalla puente ─────────────────────────────────────────────────────────

function BridgeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-20 gap-6"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "rgba(108,92,231,0.15)", border: "1px solid rgba(108,92,231,0.3)" }}
      >
        <Home className="w-8 h-8" style={{ color: "var(--primary-light)" }} />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Tu espacio está listo.</h2>
        <p className="text-text-secondary mt-2 max-w-sm mx-auto">
          Ahora cuéntanos cómo eres como persona para encontrar al roomie más compatible con tu espacio.
        </p>
      </div>
      <button
        onClick={onContinue}
        className="group flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, var(--primary), #8B7CF6)" }}
      >
        Definir mi perfil de convivencia
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}

// ─── Página ─────────────────────────────────────────────────────────────────

export default function PublishPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // Sección 1
  const [spaceType, setSpaceType] = useState<string | null>(null);
  const [precio, setPrecio] = useState("");
  const [barrio, setBarrio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Sección 2
  const [genero, setGenero] = useState<string | null>(null);
  const [presupuesto, setPresupuesto] = useState<string | null>(null);
  const [reglas, setReglas] = useState<string[]>([]);

  // Asegurar intent correcto al entrar a esta página
  useEffect(() => {
    localStorage.setItem(INTENT_STORAGE_KEY, "ofrezco-cuarto");
    const savedSpace = readSpaceData();
    if (!savedSpace) return;

    setSpaceType(savedSpace.spaceType ?? null);
    setPrecio(savedSpace.precio ?? "");
    setBarrio(savedSpace.barrio ?? "");
    setDescripcion(savedSpace.descripcion ?? "");
    setGenero(savedSpace.genero ?? null);
    setPresupuesto(savedSpace.presupuesto ?? null);
    setReglas(savedSpace.reglas ?? []);
  }, []);

  function toggleRegla(id: string) {
    setReglas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowValidation(true);
    if (!canSubmit) return;

    // Guardar datos del espacio en localStorage para referencia
    localStorage.setItem(
      SPACE_DATA_STORAGE_KEY,
      JSON.stringify({
        spaceType,
        precio: String(Math.round(Number(precio))),
        barrio,
        descripcion: descripcion.trim(),
        genero,
        presupuesto,
        reglas,
      })
    );
    setSubmitted(true);
  }

  const hasPositivePrice = Number(precio) > 0;
  const hasDescription = descripcion.trim().length > 0;
  const canSubmit =
    !!spaceType &&
    hasPositivePrice &&
    !!barrio &&
    hasDescription &&
    !!genero &&
    !!presupuesto;
  const missingFields = [
    !spaceType ? REQUIRED_FIELD_LABELS.spaceType : null,
    !hasPositivePrice ? REQUIRED_FIELD_LABELS.precio : null,
    !barrio ? REQUIRED_FIELD_LABELS.barrio : null,
    !hasDescription ? REQUIRED_FIELD_LABELS.descripcion : null,
    !genero ? REQUIRED_FIELD_LABELS.genero : null,
    !presupuesto ? REQUIRED_FIELD_LABELS.presupuesto : null,
  ].filter((field): field is Exclude<typeof field, null> => field !== null);

  function fieldHasError(isMissing: boolean) {
    return showValidation && isMissing;
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <BridgeScreen onContinue={() => router.push("/onboarding/profile")} />
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
              Describe tu espacio
            </h1>
            <p className="mt-2 text-text-secondary">
              Paso 1 de 2 — Cuéntanos qué ofreces y qué necesitas en un roomie.
            </p>
          </motion.div>

          {showValidation && missingFields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border px-4 py-4"
              style={{
                backgroundColor: "rgba(225,112,85,0.08)",
                borderColor: "rgba(225,112,85,0.28)",
              }}
            >
              <p className="text-sm font-semibold text-danger mb-2">
                Todavía te falta completar:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingFields.map((field) => (
                  <span
                    key={field}
                    className="px-2.5 py-1 rounded-full text-xs border"
                    style={{
                      color: "var(--danger)",
                      borderColor: "rgba(225,112,85,0.28)",
                      backgroundColor: "rgba(225,112,85,0.08)",
                    }}
                  >
                    {field}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

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
                  ¿Qué tipo de espacio ofreces? <span className="text-danger">*</span>
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
                          borderColor: active
                            ? "var(--primary)"
                            : fieldHasError(!spaceType)
                            ? "var(--danger)"
                            : "var(--border)",
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
                {fieldHasError(!spaceType) && (
                  <p className="text-xs text-danger mt-2">
                    Selecciona qué tipo de espacio estás ofreciendo.
                  </p>
                )}
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Precio mensual (COP) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Ej: 750000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border focus:border-primary/60 focus:outline-none transition-colors text-sm font-mono placeholder:text-text-secondary/50"
                  style={{
                    borderColor: fieldHasError(!hasPositivePrice) ? "var(--danger)" : "var(--border)",
                  }}
                />
                {fieldHasError(!hasPositivePrice) && (
                  <p className="text-xs text-danger mt-2">
                    Ingresa un valor mensual valido para el espacio.
                  </p>
                )}
              </div>

              {/* Barrio */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Barrio / Sector <span className="text-danger">*</span>
                </label>
                <select
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface text-text border focus:border-primary/60 focus:outline-none transition-colors text-sm appearance-none"
                  style={{
                    borderColor: fieldHasError(!barrio) ? "var(--danger)" : "var(--border)",
                  }}
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
                {fieldHasError(!barrio) && (
                  <p className="text-xs text-danger mt-2">
                    Elige el barrio o sector del espacio.
                  </p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Descripción del espacio <span className="text-danger">*</span>
                </label>
                <textarea
                  placeholder="Cuéntanos sobre el lugar, los servicios incluidos, el ambiente..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value.slice(0, 200))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-surface border focus:border-primary/60 focus:outline-none transition-colors text-sm resize-none placeholder:text-text-secondary/50"
                  style={{
                    borderColor: fieldHasError(!hasDescription) ? "var(--danger)" : "var(--border)",
                  }}
                />
                <p className="text-xs text-text-secondary mt-1 text-right">
                  {descripcion.length}/200
                </p>
                {fieldHasError(!hasDescription) && (
                  <p className="text-xs text-danger mt-2">
                    Describe el espacio con un poco más de detalle.
                  </p>
                )}
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
                  Preferencia de género <span className="text-danger">*</span>
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
                          borderColor: active
                            ? "var(--primary)"
                            : fieldHasError(!genero)
                            ? "var(--danger)"
                            : "var(--border)",
                          color: active ? "var(--primary-light)" : "var(--text-secondary)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {fieldHasError(!genero) && (
                  <p className="text-xs text-danger mt-2">
                    Define qué perfil de persona buscas para tu espacio.
                  </p>
                )}
              </div>

              {/* Presupuesto esperado */}
              <div>
                <p className="text-sm text-text-secondary mb-3">
                  Presupuesto esperado del roomie <span className="text-danger">*</span>
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
                          borderColor: active
                            ? "var(--primary)"
                            : fieldHasError(!presupuesto)
                            ? "var(--danger)"
                            : "var(--border)",
                          color: active ? "var(--primary-light)" : "var(--text-secondary)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {fieldHasError(!presupuesto) && (
                  <p className="text-xs text-danger mt-2">
                    Marca el rango que debería poder aportar el roomie.
                  </p>
                )}
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
                className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: canSubmit
                    ? "linear-gradient(135deg, var(--primary), #8B7CF6)"
                    : "var(--surface-hover)",
                }}
              >
                Encontrar roomie para mi espacio →
              </button>
              {!canSubmit && (
                <p className="text-center text-xs text-text-secondary mt-2">
                  Cuando lo intentes, te marcaremos exactamente qué falta.
                </p>
              )}
            </motion.div>
          </form>
        </div>
      </main>
    </>
  );
}
