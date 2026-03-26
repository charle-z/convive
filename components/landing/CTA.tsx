"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(108,92,231,0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Home className="w-7 h-7 text-primary" />
          </div>

          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Tu próxima convivencia{" "}
              <span className="text-primary">empieza aquí.</span>
            </h2>
            <p className="mt-5 text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              5 minutos. 15 preguntas. Y sabrás exactamente con quién sí
              podrías vivir en Cali.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/onboarding"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Encuentra tu roomie ideal
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/publish"
              className="flex items-center justify-center px-8 py-4 rounded-xl border border-border hover:border-primary/50 text-text-secondary hover:text-text font-medium text-lg transition-all duration-200"
            >
              Publicar mi espacio
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-xs text-text-secondary/50 mt-2">
            Sin registro requerido · 100% gratuito durante el hackathon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
