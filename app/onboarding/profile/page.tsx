import Navbar from "@/components/shared/Navbar";
import StepIndicator from "@/components/onboarding/StepIndicator";
import ConvivenceForm from "@/components/onboarding/ConvivenceForm";

const STEP_LABELS = ["¿Qué buscas?", "Tu perfil", "Tus matches"];

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          {/* Step indicator */}
          <div className="mb-12">
            <StepIndicator currentStep={2} labels={STEP_LABELS} />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Tu perfil de convivencia
            </h1>
            <p className="mt-3 text-text-secondary text-base max-w-sm mx-auto">
              Sé honesto — más precisión en tus respuestas, mejores matches.
            </p>
          </div>

          {/* Quiz */}
          <ConvivenceForm />
        </div>
      </main>
    </>
  );
}
