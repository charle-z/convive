"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import StepIndicator from "@/components/onboarding/StepIndicator";
import ConvivenceForm from "@/components/onboarding/ConvivenceForm";
import type { SearchIntent } from "@/lib/types";
import {
  DEFAULT_INTENT,
  INTENT_STORAGE_KEY,
  normalizeIntent,
} from "@/lib/intent";

const STEP_LABELS: Record<SearchIntent, string[]> = {
  "busco-cuarto": ["¿Qué buscas?", "Tu perfil", "Tus matches"],
  "busco-grupo": ["¿Qué buscas?", "Tu perfil", "Personas compatibles"],
  "ofrezco-cuarto": ["Tu espacio", "Tu perfil", "Personas compatibles"],
};

const PROFILE_COPY: Record<SearchIntent, { title: string; description: string }> = {
  "busco-cuarto": {
    title: "Tu perfil de convivencia",
    description: "Sé honesto: más precisión en tus respuestas, mejores matches.",
  },
  "busco-grupo": {
    title: "Tu perfil para armar grupo",
    description:
      "Cuéntanos cómo te gustaría vivir para encontrar personas compatibles con quienes arrendar.",
  },
  "ofrezco-cuarto": {
    title: "¿Cómo eres como roomie?",
    description:
      "Tu espacio está listo. Ahora cuéntanos cómo eres para encontrar la persona más compatible.",
  },
};

export default function ProfilePage() {
  const [intent, setIntent] = useState<SearchIntent>(DEFAULT_INTENT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextIntent = normalizeIntent(window.localStorage.getItem(INTENT_STORAGE_KEY));
    setIntent(nextIntent);
    setReady(true);
  }, []);

  const copy = PROFILE_COPY[intent];
  const stepLabels = STEP_LABELS[intent];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-12">
            <StepIndicator currentStep={2} labels={stepLabels} />
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-3 text-text-secondary text-base max-w-sm mx-auto">
              {copy.description}
            </p>
          </div>

          {ready && <ConvivenceForm />}
        </div>
      </main>
    </>
  );
}
