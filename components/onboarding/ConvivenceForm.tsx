"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  Check,
  Sparkles,
  SlidersHorizontal,
  Clock,
  Zap,
  PawPrint,
  Ban,
  Heart,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────
// Types
// ─────────────────────────────────────

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue>;

interface QuestionOption {
  id: string;
  label: string;
  Icon?: React.ElementType;
}

interface Question {
  id: string;
  question: string;
  hint?: string;
  type: "single" | "multi";
  options: QuestionOption[];
}

// ─────────────────────────────────────
// Questions data
// ─────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: "presupuesto",
    question: "¿Cuánto puedes pagar de arriendo mensual?",
    type: "single",
    options: [
      { id: "menos-600", label: "Menos de $600k" },
      { id: "600-900", label: "$600k–$900k" },
      { id: "900-1200", label: "$900k–$1.2M" },
      { id: "mas-1200", label: "Más de $1.2M" },
    ],
  },
  {
    id: "zona",
    question: "¿En qué zona de Cali prefieres vivir?",
    type: "single",
    options: [
      { id: "norte", label: "Norte (Chipichape, Centenario)" },
      { id: "sur", label: "Sur (El Peñón, Granada)" },
      { id: "centro", label: "Centro (San Antonio, Santa Rosa)" },
      { id: "me-adapto", label: "Me adapto" },
    ],
  },
  {
    id: "limpieza",
    question: "¿Cómo describes tu nivel de orden y limpieza?",
    hint: "Sé honesto — lo importante es compatibilidad, no perfección.",
    type: "single",
    options: [
      { id: "obsesivo", label: "Todo en su lugar siempre", Icon: Sparkles },
      { id: "ordenado", label: "Ordenado pero flexible", Icon: SlidersHorizontal },
      { id: "relajado", label: "Solo limpio cuando toca", Icon: Clock },
      { id: "caos", label: "El caos es mi zona de confort", Icon: Zap },
    ],
  },
  {
    id: "horario",
    question: "¿Eres más de mañanas o de noches?",
    type: "single",
    options: [
      { id: "madrugador", label: "Madrugador (antes de 7am)" },
      { id: "maananero", label: "Mañanero (7–9am)" },
      { id: "noctambulo", label: "Noctámbulo (después de 11pm)" },
      { id: "variable", label: "Variable" },
    ],
  },
  {
    id: "ruido",
    question: "¿Qué tanto ruido produces en casa?",
    type: "single",
    options: [
      { id: "silencio", label: "Casi en silencio siempre" },
      { id: "normal", label: "Música y TV normal" },
      { id: "ocasional", label: "Fiestas ocasionales" },
      { id: "mucho", label: "Bastante movimiento" },
    ],
  },
  {
    id: "visitas",
    question: "¿Con qué frecuencia recibes visitas?",
    type: "single",
    options: [
      { id: "casi-nunca", label: "Casi nunca" },
      { id: "1-2-semana", label: "1–2 veces por semana" },
      { id: "casi-siempre", label: "Casi todos los días" },
      { id: "casa-abierta", label: "Mi casa es casa de todos" },
    ],
  },
  {
    id: "mascotas",
    question: "¿Tienes o planeas tener mascotas?",
    type: "single",
    options: [
      { id: "no-quiero", label: "No tengo y no quiero", Icon: Ban },
      { id: "tengo", label: "Tengo mascota", Icon: PawPrint },
      { id: "acepto", label: "No tengo pero acepto", Icon: Heart },
      { id: "alergico", label: "Alérgico / no acepto", Icon: AlertCircle },
    ],
  },
  {
    id: "fumar",
    question: "¿Fumas?",
    type: "single",
    options: [
      { id: "no-fumo", label: "No fumo" },
      { id: "afuera", label: "Fumo pero afuera" },
      { id: "en-casa", label: "Fumo en casa" },
      { id: "indiferente", label: "Me es indiferente" },
    ],
  },
  {
    id: "fecha",
    question: "¿Para cuándo necesitas el espacio?",
    type: "single",
    options: [
      { id: "ya", label: "Ya mismo" },
      { id: "2-4-semanas", label: "En 2–4 semanas" },
      { id: "1-2-meses", label: "En 1–2 meses" },
      { id: "explorando", label: "Estoy explorando" },
    ],
  },
  {
    id: "cocina",
    question: "¿Cómo usas la cocina?",
    type: "single",
    options: [
      { id: "todos-dias", label: "Cocino todos los días" },
      { id: "ocasional", label: "Cocino ocasionalmente" },
      { id: "casi-no", label: "Casi no cocino" },
      { id: "minimo", label: "Prefiero espacios compartidos mínimos" },
    ],
  },
  {
    id: "fiestas",
    question: "¿Qué tan seguido haces fiestas o reuniones grandes?",
    type: "single",
    options: [
      { id: "nunca", label: "Nunca" },
      { id: "ocasional", label: "Ocasionalmente (1 al mes)" },
      { id: "frecuente", label: "Frecuentemente" },
      { id: "estilo-vida", label: "Es parte de mi estilo de vida" },
    ],
  },
  {
    id: "genero",
    question: "¿Tienes preferencia de género para tus roomies?",
    type: "single",
    options: [
      { id: "solo-mujeres", label: "Solo mujeres" },
      { id: "solo-hombres", label: "Solo hombres" },
      { id: "sin-preferencia", label: "Sin preferencia" },
      { id: "mixto", label: "Mixto está bien" },
    ],
  },
  {
    id: "pareja",
    question: "¿Estarías bien si tu roomie tiene pareja que visita seguido?",
    type: "single",
    options: [
      { id: "ok", label: "Sí, no hay problema" },
      { id: "respeto", label: "Solo si respeta espacios" },
      { id: "prefiero-no", label: "Preferiría que no" },
      { id: "depende", label: "Depende de la persona" },
    ],
  },
  {
    id: "gastos",
    question: "¿Cómo prefieres manejar los gastos del hogar?",
    type: "single",
    options: [
      { id: "50-50", label: "Todo dividido 50/50 estricto" },
      { id: "flexible", label: "Flexible según uso" },
      { id: "coordinador", label: "Una persona coordina y pasa el cobro" },
      { id: "acordamos", label: "Hablamos al inicio y ya" },
    ],
  },
  {
    id: "dealbreakers",
    question: "¿Hay algo que sea innegociable para ti en una convivencia?",
    hint: "Puedes elegir varias opciones.",
    type: "multi",
    options: [
      { id: "animales", label: "Animales (alergia o miedo)" },
      { id: "fumar-cerrado", label: "Fumar en espacios cerrados" },
      { id: "visitas-sin-avisar", label: "Visitas sin avisar" },
      { id: "desorden-extremo", label: "Desorden extremo" },
      { id: "ninguno", label: "Ninguno en particular" },
    ],
  },
];

// ─────────────────────────────────────
// Animation variants
// ─────────────────────────────────────

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "60%" : "-60%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (d: number) => ({
    x: d < 0 ? "60%" : "-60%",
    opacity: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────
// Component
// ─────────────────────────────────────

export default function ConvivenceForm() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});

  // Precargar respuestas guardadas
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("convive_profile");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const question = QUESTIONS[page];
  const total = QUESTIONS.length;
  const progress = ((page + 1) / total) * 100;
  const isLast = page === total - 1;

  const currentAnswer = answers[question.id];
  const hasAnswer =
    question.type === "single"
      ? !!currentAnswer && currentAnswer !== ""
      : Array.isArray(currentAnswer) && currentAnswer.length > 0;

  // ── Handlers ──

  const handleSingle = (optId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optId }));
  };

  const handleMulti = (optId: string) => {
    const current = (answers[question.id] as string[]) ?? [];
    const updated = current.includes(optId)
      ? current.filter((id) => id !== optId)
      : [...current, optId];
    setAnswers((prev) => ({ ...prev, [question.id]: updated }));
  };

  const goNext = () => {
    if (!hasAnswer) return;
    if (isLast) {
      if (typeof window !== "undefined") {
        localStorage.setItem("convive_profile", JSON.stringify(answers));
      }
      router.push("/onboarding/results");
      return;
    }
    setDirection(1);
    setPage((p) => p + 1);
  };

  const goPrev = () => {
    if (page === 0) return;
    setDirection(-1);
    setPage((p) => p - 1);
  };

  const isOptionSelected = (optId: string) =>
    question.type === "single"
      ? currentAnswer === optId
      : Array.isArray(currentAnswer) && currentAnswer.includes(optId);

  // ── Render ──

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">
            Pregunta {page + 1} de {total}
          </span>
          <span className="text-xs font-mono text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question con slide animation */}
      <div className="overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Pregunta */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                {question.question}
              </h2>
              {question.hint && (
                <p className="mt-2 text-sm text-text-secondary">{question.hint}</p>
              )}
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => {
                const selected = isOptionSelected(opt.id);
                const Icon = opt.Icon;
                const isMulti = question.type === "multi";

                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      isMulti ? handleMulti(opt.id) : handleSingle(opt.id)
                    }
                    className={`relative p-4 rounded-xl border text-left transition-all duration-150 select-none ${
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-surface-hover"
                    }`}
                  >
                    {/* Checkmark multi-select */}
                    {isMulti && (
                      <div
                        className={`absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                          selected
                            ? "bg-primary border-primary"
                            : "border-border bg-transparent"
                        }`}
                      >
                        {selected && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                    )}

                    {/* Checkmark single-select */}
                    {!isMulti && selected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </motion.div>
                    )}

                    {/* Icon (si la pregunta tiene) */}
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 mb-2.5 transition-colors duration-150 ${
                          selected ? "text-primary-light" : "text-text-secondary"
                        }`}
                      />
                    )}

                    <span
                      className={`text-sm font-medium leading-snug block transition-colors duration-150 ${
                        selected ? "text-text" : "text-text"
                      } ${isMulti ? "pr-6" : ""}`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between">
        {/* Botón anterior */}
        {page > 0 ? (
          <button
            onClick={goPrev}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
        ) : (
          <div />
        )}

        {/* Botón siguiente */}
        <button
          onClick={goNext}
          disabled={!hasAnswer}
          className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            hasAnswer
              ? "bg-primary hover:bg-primary-light text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              : "bg-surface-hover text-text-secondary/40 cursor-not-allowed"
          }`}
        >
          {isLast ? "Ver mis matches" : "Siguiente"}
          <ArrowRight
            className={`w-4 h-4 transition-transform ${
              hasAnswer ? "group-hover:translate-x-1" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
