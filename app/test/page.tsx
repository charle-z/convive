"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home } from "lucide-react";

const APP_URL = "http://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io";

// ─── Questions ──────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    text: "¿Qué tan seguido estás en casa?",
    options: [
      { id: "A", label: "Casi nunca, vivo en la calle" },
      { id: "B", label: "Estoy pero no molesto" },
      { id: "C", label: "Casa = mi templo, siempre aquí" },
    ],
  },
  {
    text: "¿Cómo describes tu nivel de orden?",
    options: [
      { id: "A", label: "El caos me inspira" },
      { id: "B", label: "Ordenado cuando hay visitas" },
      { id: "C", label: "Todo en su lugar, siempre" },
    ],
  },
  {
    text: "¿Fiestas en casa?",
    options: [
      { id: "A", label: "Mi casa es la sede oficial" },
      { id: "B", label: "Ocasionalmente, con aviso" },
      { id: "C", label: "Ni de chiste" },
    ],
  },
  {
    text: "¿Mascotas?",
    options: [
      { id: "A", label: "Tengo zoo en casa" },
      { id: "B", label: "Una mascota tranquila está bien" },
      { id: "C", label: "Alérgico hasta al pelo de peluche" },
    ],
  },
  {
    text: "¿Tu horario?",
    options: [
      { id: "A", label: "Noctámbulo total, duermo de día" },
      { id: "B", label: "Variable, depende del día" },
      { id: "C", label: "En cama a las 10pm, levanto a las 6am" },
    ],
  },
];

// ─── Result types ────────────────────────────────────────────────────────────

interface RoommieType {
  emoji: string;
  title: string;
  desc: string;
}

function getType(answers: string[]): RoommieType {
  const countA = answers.filter((a) => a === "A").length;
  const countB = answers.filter((a) => a === "B").length;
  const countC = answers.filter((a) => a === "C").length;

  if (countA >= 3) return {
    emoji: "🦋",
    title: "El Social Butterfly",
    desc: "Tu casa es un punto de encuentro. Eres energía pura pero necesitas roomies que lo entiendan.",
  };
  if (countC >= 3) return {
    emoji: "🧘",
    title: "El Monje del Orden",
    desc: "Silencio, limpieza y rutina. Eres el roomie soñado para alguien igual de juicioso.",
  };
  if (countB >= 3) return {
    emoji: "🤝",
    title: "El Roomie Flexible",
    desc: "Ni muy estricto ni muy caótico. Te adaptas bien pero sé claro con tus límites.",
  };
  if (countA >= 2 && countC >= 2) return {
    emoji: "🎭",
    title: "El Contradictorio",
    desc: "Tienes reglas muy claras en algunas cosas y cero en otras. Necesitas un match muy específico.",
  };
  if (countA >= 2 && countB >= 2) return {
    emoji: "👻",
    title: "El Fantasma",
    desc: "Casi nunca estás pero cuando llegas... armas fiesta. Mejor roomie para alguien independiente.",
  };
  return {
    emoji: "🎩",
    title: "El Diplomático",
    desc: "Ordenado, respetuoso, puntual. Los roomies te van a amar. Probablemente.",
  };
}

// ─── Confetti ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ["#6C5CE7", "#A29BFE", "#00B894", "#FDCB6E", "#E17055"];

function Confetti() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 0.8,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -10, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0 w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TestPage() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<RoommieType | null>(null);
  const [copied, setCopied] = useState(false);

  const question = QUESTIONS[page];
  const total = QUESTIONS.length;
  const progress = ((page + 1) / total) * 100;

  function handleSelect(id: string) {
    setSelected(id);
    setTimeout(() => {
      const newAnswers = [...answers, id];
      if (page === total - 1) {
        setAnswers(newAnswers);
        setResult(getType(newAnswers));
      } else {
        setAnswers(newAnswers);
        setDirection(1);
        setPage((p) => p + 1);
        setSelected(null);
      }
    }, 300);
  }

  async function handleShare() {
    if (!result) return;
    const text = `Soy ${result.title} ${result.emoji} según Convive 🏠 ¿Y tú?\n→ ${APP_URL}/test`;
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

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ x: d < 0 ? "60%" : "-60%", opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* Navbar simple */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold">
            convive<span style={{ color: "var(--primary)" }}>.</span>
          </span>
        </Link>
        <span className="text-xs text-text-secondary">Test: ¿qué tipo de roomie eres?</span>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Quiz */}
          {!result && (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">
                    Pregunta {page + 1} de {total}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "var(--primary)" }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

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
                    <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-6">
                      {question.text}
                    </h2>
                    <div className="flex flex-col gap-3">
                      {question.options.map((opt) => {
                        const isSelected = selected === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            className="p-4 rounded-xl border text-left text-sm font-medium transition-all duration-150"
                            style={{
                              backgroundColor: isSelected ? "rgba(108,92,231,0.15)" : "var(--surface)",
                              borderColor: isSelected ? "var(--primary)" : "var(--border)",
                              color: isSelected ? "var(--primary-light)" : "var(--text)",
                            }}
                          >
                            <span
                              className="inline-block w-6 h-6 rounded-md text-xs font-bold text-center leading-6 mr-3 flex-shrink-0"
                              style={{
                                backgroundColor: isSelected ? "var(--primary)" : "var(--surface-hover)",
                                color: isSelected ? "white" : "var(--text-secondary)",
                                display: "inline-block",
                              }}
                            >
                              {opt.id}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Resultado */}
          {result && (
            <div className="relative overflow-hidden">
              <Confetti />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center gap-6 pt-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl"
                >
                  {result.emoji}
                </motion.div>

                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    Tu tipo de roomie
                  </p>
                  <h2 className="text-3xl font-bold">{result.title}</h2>
                  <p className="text-text-secondary mt-3 max-w-sm mx-auto leading-relaxed">
                    {result.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleShare}
                    className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border"
                    style={{
                      backgroundColor: copied ? "rgba(0,184,148,0.1)" : "rgba(108,92,231,0.1)",
                      borderColor: copied ? "rgba(0,184,148,0.4)" : "rgba(108,92,231,0.4)",
                      color: copied ? "var(--success)" : "var(--primary-light)",
                    }}
                  >
                    {copied ? "¡Copiado! ✓" : "Compartir mi tipo"}
                  </button>
                  <Link
                    href="/onboarding"
                    className="px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-center"
                    style={{
                      background: "linear-gradient(135deg, var(--primary), #8B7CF6)",
                    }}
                  >
                    Encontrar mi roomie compatible
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
