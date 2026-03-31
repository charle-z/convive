"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Match demo con presupuesto alineado, buena compatibilidad en limpieza y fricción baja desde el inicio.",
    name: "Escenario A",
    meta: "Presupuesto alineado · Granada, Cali",
    foto: "https://i.pravatar.cc/150?img=5",
  },
  {
    quote:
      "Caso de demo para alguien que necesitaba detectar choques en horarios y visitas antes de mudarse.",
    name: "Escenario B",
    meta: "Horarios compatibles · El Peñón, Cali",
    foto: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "Escenario de roomie para espacio propio, con aporte esperado, zona y reglas del hogar compatibles.",
    name: "Escenario C",
    meta: "Espacio propio · San Fernando, Cali",
    foto: "https://i.pravatar.cc/150?img=32",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Casos simulados de convivencia
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-border"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Quote */}
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={t.foto}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.meta}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-center text-xs mt-6"
          style={{ color: "rgba(139,139,163,0.4)" }}
        >
          * Escenarios de demo con avatares referenciales, no testimonios de usuarios reales
        </motion.p>
      </div>
    </section>
  );
}
