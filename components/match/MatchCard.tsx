"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, AlertTriangle, ArrowRight } from "lucide-react";
import CompatibilityBar from "./CompatibilityBar";
import type { SeedProfile, MatchResult } from "@/lib/types";

interface MatchCardProps {
  profile: SeedProfile;
  result: MatchResult;
  index: number;
}

function scoreColor(score: number): string {
  if (score >= 75) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

function useCountUp(target: number, trigger: boolean, duration = 900): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return count;
}

export default function MatchCard({ profile, result, index }: MatchCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayScore = useCountUp(result.score, isInView);
  const color = scoreColor(result.score);

  // Top 3 categorías por score descendente
  const topCategories = [...result.categories]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="relative flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-surface border border-border/60 hover:border-border transition-colors"
    >
      {/* Dealbreaker badge */}
      {result.hasDealbreaker && (
        <div className="absolute -top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/15 border border-danger/30 text-danger text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Conflicto detectado
        </div>
      )}

      {/* Avatar + score */}
      <div className="flex sm:flex-col items-center gap-4 sm:gap-3 sm:w-24 flex-shrink-0">
        <div className="relative">
          <Image
            src={profile.foto}
            alt={profile.nombre}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-border"
          />
          {/* Score badge sobre avatar */}
          <div
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-bg text-[11px] font-bold font-mono"
            style={{ backgroundColor: color, color: "#fff" }}
          >
            {displayScore}
          </div>
        </div>

        {/* Score grande — solo en desktop */}
        <div className="hidden sm:flex flex-col items-center">
          <span
            className="text-3xl font-bold font-mono leading-none"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="text-[10px] text-text-secondary mt-0.5">
            compatible
          </span>
        </div>
      </div>

      {/* Info principal */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-semibold text-base leading-tight">
              {profile.nombre},{" "}
              <span className="text-text-secondary font-normal">
                {profile.edad}
              </span>
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {profile.ocupacion}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.barrio}
              </span>
            </div>
          </div>
          {/* Score mobile */}
          <span
            className="sm:hidden text-2xl font-bold font-mono flex-shrink-0"
            style={{ color }}
          >
            {displayScore}%
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-text-secondary mt-2 mb-3 line-clamp-2">
          {profile.descripcion}
        </p>

        {/* Barra de compatibilidad */}
        <CompatibilityBar score={result.score} />

        {/* Top 3 categorías */}
        <div className="flex flex-wrap gap-2 mt-3">
          {topCategories.map((cat) => {
            const catColor = scoreColor(cat.score);
            return (
              <span
                key={cat.name}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: catColor + "40",
                  color: catColor,
                  backgroundColor: catColor + "12",
                }}
              >
                {cat.name} {cat.score}%
              </span>
            );
          })}
        </div>

        {/* Conflictos */}
        {result.hasDealbreaker && result.dealbreakersFound.length > 0 && (
          <div className="mt-3 space-y-1">
            {result.dealbreakersFound.map((d, i) => (
              <p key={i} className="text-xs text-danger/80 flex items-start gap-1">
                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                {d}
              </p>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-4">
          <Link
            href={`/match/${profile.id}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Ver detalle completo
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
