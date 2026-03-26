"use client";

import { motion } from "framer-motion";
import { BarChart3, AlertTriangle, MapPin, Eye } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Score explicado",
    description:
      "No solo un número. Ves exactamente en qué categorías coinciden: presupuesto, limpieza, horarios, mascotas. Cada punto tiene sentido.",
    tag: "Transparencia",
    color: "#6C5CE7",
    gradient: "from-[#6C5CE7]/10 to-transparent",
  },
  {
    icon: Eye,
    title: "Semáforo de conflicto",
    description:
      "Verde, amarillo, rojo por cada categoría. Un vistazo y sabes dónde hay sintonía y dónde hay riesgo. El rojo parpadea, no lo puedes ignorar.",
    tag: "Visual",
    color: "#00B894",
    gradient: "from-[#00B894]/10 to-transparent",
  },
  {
    icon: AlertTriangle,
    title: "Dealbreakers visibles",
    description:
      "Si alguien tiene gato y tú no los aceptas, aparece el conflicto antes de contactar. Sin sorpresas el día de la mudanza.",
    tag: "Preventivo",
    color: "#FDCB6E",
    gradient: "from-[#FDCB6E]/10 to-transparent",
  },
  {
    icon: MapPin,
    title: "Datos reales de Cali",
    description:
      "Barrios reales, precios reales en COP, perfiles con personalidad. Granada, San Fernando, El Peñón — no datos de demostración genéricos.",
    tag: "Local",
    color: "#A29BFE",
    gradient: "from-[#A29BFE]/10 to-transparent",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Por qué Convive
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            No vendemos &ldquo;cuarto barato&rdquo;.
            <br />
            <span className="text-primary-light">
              Vendemos paz mental.
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Cada feature está diseñada para que sepas exactamente en qué te
            estás metiendo antes de firmar nada.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
                className="group relative p-6 lg:p-8 rounded-2xl bg-surface border border-border/60 hover:border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  boxShadow: "0 0 0 0 transparent",
                }}
                whileHover={{
                  boxShadow: `0 20px 40px -12px ${feature.color}20`,
                }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: feature.color + "20" }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: feature.color + "18",
                        color: feature.color,
                      }}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
