"use client";

import { motion } from "framer-motion";

interface CompatibilityBarProps {
  score: number; // 0-100
  showLabel?: boolean;
}

function scoreColor(score: number): string {
  if (score >= 75) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

export default function CompatibilityBar({
  score,
  showLabel = false,
}: CompatibilityBarProps) {
  const color = scoreColor(score);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-text-secondary">Compatibilidad</span>
          <span
            className="text-xs font-mono font-semibold"
            style={{ color }}
          >
            {score}%
          </span>
        </div>
      )}
      <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
        />
      </div>
    </div>
  );
}
