"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Users, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchIntent } from "@/lib/types";
import { INTENT_STORAGE_KEY, normalizeIntent } from "@/lib/intent";

const OPTIONS: {
  id: SearchIntent;
  Icon: React.ElementType;
  title: string;
  description: string;
}[] = [
  {
    id: "busco-cuarto",
    Icon: Search,
    title: "Busco un cuarto",
    description:
      "Quiero encontrar un espacio donde vivir con roomies compatibles.",
  },
  {
    id: "ofrezco-cuarto",
    Icon: Home,
    title: "Tengo un espacio disponible",
    description:
      "Quiero encontrar el roomie ideal para mi cuarto o apartamento.",
  },
  {
    id: "busco-grupo",
    Icon: Users,
    title: "Quiero armar grupo",
    description:
      "Busco personas compatibles para arrendar un apartamento juntos.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PathSelector() {
  const [selected, setSelected] = useState<SearchIntent | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedIntent = window.localStorage.getItem(INTENT_STORAGE_KEY);
    if (storedIntent) {
      setSelected(normalizeIntent(storedIntent));
    }
  }, []);

  const handleSelect = (id: SearchIntent) => {
    setSelected(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(INTENT_STORAGE_KEY, id);
    }
  };

  const handleContinue = () => {
    if (!selected) return;
    router.push(selected === "ofrezco-cuarto" ? "/publish" : "/onboarding/profile");
  };

  const continueLabel =
    selected === "ofrezco-cuarto"
      ? "Describir mi espacio"
      : selected === "busco-grupo"
      ? "Crear mi perfil"
      : "Continuar";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {OPTIONS.map((opt) => {
          const Icon = opt.Icon;
          const isSelected = selected === opt.id;

          return (
            <motion.div
              key={opt.id}
              variants={cardVariants}
              onClick={() => handleSelect(opt.id)}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 32px -8px rgba(108,92,231,0.35)",
              }}
              whileTap={{ scale: 0.99 }}
              className={`relative cursor-pointer p-5 rounded-2xl border transition-colors duration-200 select-none ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface hover:border-border/80"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                    isSelected ? "bg-primary/20" : "bg-surface-hover"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isSelected ? "text-primary-light" : "text-text-secondary"
                    }`}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base text-text">
                    {opt.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {opt.description}
                  </p>
                </div>

                {/* Checkmark animado */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Botón continuar — aparece solo cuando hay selección */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-6"
          >
            <button
              onClick={handleContinue}
              className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
            >
              {continueLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
