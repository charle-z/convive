"use client";

import Navbar from "@/components/shared/Navbar";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-surface-hover/80 ${className ?? ""}`}
      style={style}
    />
  );
}

export default function MatchDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 mt-4">
            <SkeletonBlock className="h-4 w-4 rounded-full" />
            <SkeletonBlock className="h-4 w-28 rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-surface border border-border/60 mb-6">
            <SkeletonBlock className="w-20 h-20 rounded-full flex-shrink-0" />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="space-y-2">
                  <SkeletonBlock className="h-8 w-52" />
                  <SkeletonBlock className="h-4 w-44 rounded-full" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <SkeletonBlock className="h-12 w-16" />
                  <SkeletonBlock className="h-3 w-20 rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-full rounded-full" />
                <SkeletonBlock className="h-4 w-[92%] rounded-full" />
                <SkeletonBlock className="h-4 w-[70%] rounded-full" />
              </div>

              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
                Cargando compatibilidad...
              </div>
            </div>
          </div>

          <section className="mb-6">
            <SkeletonBlock className="h-6 w-64 mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-surface border border-border/60"
                >
                  <div className="flex items-center justify-between gap-3">
                    <SkeletonBlock className="h-5 w-32" />
                    <SkeletonBlock className="h-4 w-10 rounded-full" />
                  </div>
                  <SkeletonBlock className="h-2.5 w-full rounded-full mt-3" />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 p-5 rounded-2xl bg-surface border border-border/60 space-y-4">
            <SkeletonBlock className="h-6 w-40" />
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-full rounded-full" />
              <SkeletonBlock className="h-4 w-[88%] rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock
                  key={index}
                  className="h-7 w-28 rounded-full"
                />
              ))}
            </div>
          </section>

          <div className="flex flex-col items-center gap-2">
            <SkeletonBlock
              className="w-full h-14"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,211,102,0.22), rgba(18,140,126,0.22))",
              }}
            />
            <SkeletonBlock className="h-3 w-36 rounded-full" />
          </div>
        </div>
      </main>
    </>
  );
}
