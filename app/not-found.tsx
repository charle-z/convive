"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Blob animado */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* 404 decorativo de fondo */}
      <div
        className="absolute select-none pointer-events-none font-mono font-bold leading-none"
        style={{
          fontSize: "clamp(120px, 30vw, 220px)",
          color: "rgba(108,92,231,0.1)",
          letterSpacing: "-0.05em",
        }}
      >
        404
      </div>

      {/* Contenido */}
      <div className="relative flex flex-col items-center text-center gap-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(108,92,231,0.15)", border: "1px solid rgba(108,92,231,0.3)" }}
          >
            <Home className="w-8 h-8" style={{ color: "var(--primary-light)" }} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          Parece que este cuarto no existe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-text-secondary text-lg"
        >
          O ya lo rentaron. Estas cosas pasan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-border hover:border-primary/50 text-sm font-medium transition-all duration-200 hover:bg-surface"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/onboarding"
            className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--primary), #8B7CF6)",
            }}
          >
            Buscar roomie
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
