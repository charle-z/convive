import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Convive | Elige con quien vivir";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #06070d 0%, #111427 55%, #1d2240 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at top left, rgba(108, 92, 231, 0.32), transparent 36%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.2), transparent 30%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "56px 64px",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "72%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#6C5CE7",
                  boxShadow: "0 20px 60px rgba(108, 92, 231, 0.35)",
                  fontSize: 36,
                  fontWeight: 800,
                }}
              >
                C
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 54,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  convive.
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 20,
                    color: "rgba(248, 250, 252, 0.72)",
                  }}
                >
                  Compatibilidad para roomies en Cali
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 70,
                  lineHeight: 1.02,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  maxWidth: 760,
                }}
              >
                Elige con quien vivir antes de descubrir que fue un error.
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: "rgba(248, 250, 252, 0.78)",
                  maxWidth: 760,
                }}
              >
                Compara compatibilidad, detecta fricciones y toma mejores
                decisiones antes de mudarte.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 250,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: "24px 26px",
                borderRadius: 28,
                background: "rgba(15, 23, 42, 0.74)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#8b9cff",
                }}
              >
                Match score
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                }}
              >
                92%
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  lineHeight: 1.45,
                  color: "rgba(248, 250, 252, 0.72)",
                  maxWidth: 180,
                }}
              >
                Recibo de compatibilidad y pactos de convivencia sugeridos.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
