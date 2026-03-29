import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_APP_URL } from "@/lib/site-url";

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
  metadataBase: new URL(DEFAULT_APP_URL),
  title: "Convive — Elige con quién vivir",
  description:
    "Motor de compatibilidad para roomies en Cali. Encuentra con quién sí y con quién no deberías vivir, antes de mudarte.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Convive — Elige con quién vivir",
    description:
      "Motor de compatibilidad para roomies en Cali. Sin registro. Sin intermediarios.",
    url: DEFAULT_APP_URL,
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
