import Navbar from "@/components/shared/Navbar";
import StepIndicator from "@/components/onboarding/StepIndicator";
import PathSelector from "@/components/onboarding/PathSelector";

const STEP_LABELS = ["¿Qué buscas?", "Tu perfil", "Tus matches"];

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="mb-12">
            <StepIndicator currentStep={1} labels={STEP_LABELS} />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              ¿Qué estás buscando?
            </h1>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-md mx-auto">
              Cuéntanos qué necesitas para mostrarte los matches correctos.
            </p>
          </div>

          {/* Selector de intención */}
          <PathSelector />
        </div>
      </main>
    </>
  );
}
