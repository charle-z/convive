"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SeedProfile, MatchResult } from "@/lib/types";

interface Props {
  profile: SeedProfile;
  result: MatchResult;
  savingsAnnual: number;
  onClose: () => void;
}

function bar(score: number, filled = "█", empty = "░", max = 8): string {
  const n = Math.round((score / 100) * max);
  return filled.repeat(n) + empty.repeat(max - n);
}

function formatCOP(n: number): string {
  return "$" + n.toLocaleString("es-CO").replace(/,/g, ".");
}

function randomCode(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function today(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// Dentado SVG
function ZigZag({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 320 12"
      preserveAspectRatio="none"
      className="w-full"
      style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        d="M0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 Z"
        fill="#FAFAFA"
      />
    </svg>
  );
}

const TOP_CATEGORIES = ["Presupuesto", "Zona", "Limpieza", "Horario"];

export default function CompatibilityReceipt({ profile, result, savingsAnnual, onClose }: Props) {
  const [code] = useState(randomCode);
  const [copied, setCopied] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const topCats = result.categories
    .filter((c) => TOP_CATEGORIES.includes(c.name))
    .slice(0, 4);

  const textContent = [
    `CONVIVE · REPORTE DE MATCH`,
    `Fecha: ${today()} | Código: CONV-2026-${code}`,
    `─────────────────────────`,
    `CANDIDATO COMPATIBLE`,
    `Nombre: ${profile.nombre}`,
    `Edad: ${profile.edad} años · ${profile.barrio}`,
    `─────────────────────────`,
    `COMPATIBILIDAD GLOBAL`,
    `${bar(result.score)} ${result.score}%`,
    `─────────────────────────`,
    `DESGLOSE:`,
    ...topCats.map((c) => `${c.name.padEnd(12)} ${bar(c.score, "█", "░", 6)} ${c.score}%`),
    `─────────────────────────`,
    `AHORRO PROYECTADO`,
    `${formatCOP(savingsAnnual)} / año`,
    `─────────────────────────`,
    `"Elige con quién vivir."`,
    `convive · Cali, Colombia`,
    ``,
    `¿Cuál es tu match? → http://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io`,
  ].join("\n");

  async function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center w-full max-w-[340px]"
      >
        {/* ── Ticket ── */}
        <div style={{ width: "100%", maxWidth: 320 }}>
          {/* Dentado superior */}
          <ZigZag />

          {/* Cuerpo del ticket */}
          <div
            className="px-5 py-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#FAFAFA", color: "#1a1a1a" }}
          >
            {/* Header */}
            <p className="text-center font-bold text-sm tracking-wider mb-1">
              CONVIVE · REPORTE DE MATCH
            </p>
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="text-gray-500 text-[10px]">Fecha: {today()}</p>
            <p className="text-gray-500 text-[10px]">Código: CONV-2026-{code}</p>

            {/* Candidato */}
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="font-bold text-[10px] tracking-wider text-gray-500 mb-1">
              CANDIDATO COMPATIBLE
            </p>
            <p className="font-bold">{profile.nombre}</p>
            <p className="text-gray-500">{profile.edad} años · {profile.barrio}</p>

            {/* Score global */}
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="font-bold text-[10px] tracking-wider text-gray-500 mb-1">
              COMPATIBILIDAD GLOBAL
            </p>
            <p className="text-sm font-bold">
              {bar(result.score)}{" "}
              <span style={{ color: result.score >= 75 ? "#00B894" : result.score >= 50 ? "#e6a817" : "#E17055" }}>
                {result.score}%
              </span>
            </p>

            {/* Desglose */}
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="font-bold text-[10px] tracking-wider text-gray-500 mb-1">DESGLOSE:</p>
            <div className="space-y-0.5">
              {topCats.map((c) => (
                <div key={c.name} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 w-20 flex-shrink-0">{c.name}</span>
                  <span className="flex-1">{bar(c.score, "█", "░", 6)}</span>
                  <span className="text-gray-500 w-8 text-right">{c.score}%</span>
                </div>
              ))}
            </div>

            {/* Ahorro */}
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="font-bold text-[10px] tracking-wider text-gray-500 mb-1">
              AHORRO PROYECTADO
            </p>
            <p className="text-sm font-bold" style={{ color: "#00B894" }}>
              {formatCOP(savingsAnnual)} / año
            </p>

            {/* Footer ticket */}
            <div className="border-t border-dashed border-gray-400 my-2" />
            <p className="text-center text-gray-500 text-[10px] italic">
              &ldquo;Elige con quién vivir.&rdquo;
            </p>
            <p className="text-center text-gray-400 text-[10px]">
              convive · Cali, Colombia
            </p>
          </div>

          {/* Dentado inferior */}
          <ZigZag flip />
        </div>

        {/* Botones fuera del ticket */}
        <div className="flex gap-3 mt-4 w-full max-w-[320px]">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: copied ? "rgba(0,184,148,0.15)" : "rgba(108,92,231,0.15)",
              color: copied ? "#00B894" : "#A29BFE",
              border: `1px solid ${copied ? "rgba(0,184,148,0.4)" : "rgba(108,92,231,0.4)"}`,
            }}
          >
            {copied ? "¡Copiado! ✓" : "Copiar texto"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(245,245,245,0.7)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
