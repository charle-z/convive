"use client";

import { motion } from "framer-motion";
import { ClipboardList, Zap, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Perfil de convivencia",
    description:
      "Respondes 15 preguntas clave: presupuesto, zona, horarios, limpieza, mascotas y más. No es un formulario, es un quiz rápido.",
    accent: "#6C5CE7",
  },
  {
    number: "02",
    icon: Zap,
    title: "Matching inteligente",
    description:
      "Nuestro motor cruza tus respuestas con todos los perfiles disponibles y calcula un score de compatibilidad real, no un número inventado.",
    accent: "#A29BFE",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Decide con confianza",
    description:
      "Ves el score por categoría, los puntos de conflicto en rojo y los dealbreakers visibles antes de escribirle a alguien.",
    accent: "#00B894",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
  }),
};

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Cómo funciona
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Tres pasos. Cero sorpresas.
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Del cero al match compatible en menos de 5 minutos.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line — solo desktop */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/20 via-primary-light/40 to-primary/20" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex flex-col gap-5 p-6 rounded-2xl bg-surface border border-border/60 hover:border-border transition-colors"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-4xl font-bold font-mono leading-none"
                    style={{ color: step.accent + "33" }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: step.accent + "20" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: step.accent }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Accent bottom border */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-40"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
