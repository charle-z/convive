import type { Metadata } from "next";
import { Outfit, Space_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convive — Elige con quién vivir",
  description:
    "Plataforma de compatibilidad para convivencia compartida. Encuentra roomies compatibles, no solo disponibles.",
  openGraph: {
    title: "Convive — Elige con quién vivir",
    description:
      "Motor de matching que te dice con quién sí y con quién NO deberías vivir, antes de mudarte.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${outfit.variable} ${spaceMono.variable} font-outfit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
