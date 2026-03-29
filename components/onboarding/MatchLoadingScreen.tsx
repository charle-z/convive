"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const MESSAGES = [
  "Analizando tu perfil de convivencia...",
  "Cruzando 12 categorías de compatibilidad...",
  "Evaluando presupuesto y zona...",
  "Detectando posibles dealbreakers...",
  "Calculando scores finales...",
  "¡Tus matches están listos!",
];

const TOTAL_MS = 1200;
const COUNT_MS = 900;

interface Props {
  onComplete: () => void;
}

export default function MatchLoadingScreen({ onComplete }: Props) {
  const [pct, setPct] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  // Count-up 0→100 over COUNT_MS
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const elapsed = now - start;
      const raw = elapsed / COUNT_MS;
      // ease-out cubic
      const t = Math.min(raw, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotate messages every ~800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => Math.min(prev + 1, MESSAGES.length - 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Call onComplete after TOTAL_MS
  useEffect(() => {
    const t = setTimeout(onComplete, TOTAL_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg overflow-hidden pointer-events-none"
    >
      {/* Blob decorativo */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Contenido central */}
      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            convive
            <span style={{ color: "var(--primary)" }}>.</span>
          </span>
        </div>

        {/* Porcentaje */}
        <div
          className="text-7xl font-bold font-mono leading-none"
          style={{ color: "var(--primary)" }}
        >
          {pct}%
        </div>

        {/* Mensaje rotativo */}
        <div className="h-6 overflow-hidden">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-text-secondary"
          >
            {MESSAGES[msgIdx]}
          </motion.p>
        </div>
      </div>

      {/* Barra de progreso inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-hover">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: TOTAL_MS / 1000, ease: "linear" }}
          className="h-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>
    </motion.div>
  );
}
