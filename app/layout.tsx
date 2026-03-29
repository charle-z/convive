import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

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
    "Motor de compatibilidad para roomies en Cali. Encuentra con quién sí y con quién no deberías vivir, antes de mudarte.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%236C5CE7'/><text y='.9em' font-size='80' x='10'>🏠</text></svg>",
  },
  openGraph: {
    title: "Convive — Elige con quién vivir",
    description:
      "Motor de compatibilidad para roomies en Cali. Sin registro. Sin intermediarios.",
    url: "http://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io",
    siteName: "Convive",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${outfit.variable} ${spaceMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
