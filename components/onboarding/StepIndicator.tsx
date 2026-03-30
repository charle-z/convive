"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  labels: string[];
}

export default function StepIndicator({ currentStep, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-start justify-center w-full">
      {labels.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={i} className="flex items-start min-w-0">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2 w-[72px] sm:w-[92px] min-w-0">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "var(--success)"
                    : isActive
                    ? "var(--primary)"
                    : "transparent",
                  borderColor: isCompleted
                    ? "var(--success)"
                    : isActive
                    ? "var(--primary)"
                    : "var(--border)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-white" : "text-text-secondary"
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
              </motion.div>

              <span
                className={`text-[11px] sm:text-xs text-center whitespace-normal leading-tight transition-colors duration-200 ${
                  isActive
                    ? "text-text font-medium"
                    : isCompleted
                    ? "text-success"
                    : "text-text-secondary"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line between steps */}
            {i < labels.length - 1 && (
              <div className="relative w-10 sm:w-20 md:w-28 h-0.5 bg-border mx-2 sm:mx-3 mt-4 flex-shrink-0">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full bg-primary"
                  initial={false}
                  animate={{ width: stepNum < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
