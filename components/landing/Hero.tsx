"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HEADLINE_WORDS = ["Elige", "con", "quién", "vivir."];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        {/* Blob 1 — primary */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.18) 0%, transparent 70%)",
            top: "5%",
            left: "10%",
          }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob 2 — primary-light */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(162,155,254,0.12) 0%, transparent 70%)",
            top: "30%",
            right: "5%",
          }}
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Blob 3 — success accent */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,184,148,0.08) 0%, transparent 70%)",
            bottom: "15%",
            left: "30%",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Grid overlay sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Motor de matching para roomies · Cali, Colombia
        </span>
      </motion.div>

      {/* Headline con stagger */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-[1.05] tracking-tight max-w-4xl"
      >
        {HEADLINE_WORDS.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              word === "quién" ? "text-primary" : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.8}
        className="mt-6 text-lg sm:text-xl text-text-secondary text-center max-w-xl leading-relaxed"
      >
        No es otro portal de anuncios. Es el motor que te dice con quién{" "}
        <span className="text-text">sí</span> y con quién{" "}
        <span className="text-danger">no</span> deberías vivir, antes de
        mudarte.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.1}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/onboarding"
          className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          Encuentra tu roomie ideal
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href="#como-funciona"
          className="px-6 py-3.5 rounded-xl border border-border hover:border-primary/50 text-text-secondary hover:text-text text-base font-medium transition-all duration-200"
        >
          Ver cómo funciona
        </a>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.4}
        className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
      >
        {[
          { value: "15", label: "variables de convivencia" },
          { value: "87%", label: "precisión en matches" },
          { value: "0", label: "sorpresas después de mudarte" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold font-mono text-primary">
              {stat.value}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-text-secondary/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
