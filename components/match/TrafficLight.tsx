"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  MapPin,
  Sparkles,
  Volume2,
  Clock,
  Users,
  PawPrint,
  Wind,
  UtensilsCrossed,
  PartyPopper,
  Heart,
  Receipt,
  Star,
} from "lucide-react";
import CompatibilityBar from "./CompatibilityBar";

// ─── Mapa de iconos ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign,
  MapPin,
  Sparkles,
  Volume2,
  Clock,
  Users,
  PawPrint,
  Wind,
  UtensilsCrossed,
  PartyPopper,
  Heart,
  Receipt,
};

// ─── Props ─────────────────────────────────────────────────────────────────────

interface TrafficLightProps {
  name: string;
  score: number;
  icon: string;
  weight: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function dotColor(score: number): string {
  if (score >= 75) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

// ─── Componente ────────────────────────────────────────────────────────────────

export default function TrafficLight({
  name,
  score,
  icon,
  weight,
}: TrafficLightProps) {
  const Icon = ICON_MAP[icon] ?? Star;
  const color = dotColor(score);

  // Velocidad del pulso según urgencia: verde lento, rojo rápido
  const pulseDuration = score >= 75 ? 3 : score >= 50 ? 2 : 1.2;

  // El rojo tiene shake sutil además del pulso
  const redShake =
    score < 50
      ? { x: [0, -2, 2, -1, 1, 0], transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 } }
      : {};

  return (
    <div className="p-4 rounded-xl bg-surface border border-border/50">
      {/* Fila superior */}
      <div className="flex items-center gap-3 mb-3">
        {/* Semáforo */}
        <motion.div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
          animate={{ scale: [1, 1.25, 1], opacity: [1, 0.65, 1], ...redShake }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ícono + nombre */}
        <Icon className="w-4 h-4 text-text-secondary flex-shrink-0" />
        <span className="text-sm font-medium flex-1">{name}</span>

        {/* Score + peso */}
        <span className="text-xs font-mono flex-shrink-0">
          <span className="font-semibold" style={{ color }}>
            {score}%
          </span>
          <span className="text-text-secondary">
            {" "}
            · peso {Math.round(weight * 100)}%
          </span>
        </span>
      </div>

      {/* Barra */}
      <CompatibilityBar score={score} />
    </div>
  );
}
