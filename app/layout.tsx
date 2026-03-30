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
  title: "Convive | Elige con quien vivir",
  description:
    "Motor de compatibilidad para roomies en Cali. Descubre con quien si y con quien no deberias vivir antes de mudarte.",
  applicationName: "Convive",
  alternates: {
    canonical: DEFAULT_APP_URL,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Convive | Elige con quien vivir",
    description:
      "Compara compatibilidad, detecta posibles conflictos y decide mejor con quien vivir antes de mudarte.",
    url: DEFAULT_APP_URL,
    siteName: "Convive",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Convive - compatibilidad para roomies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convive | Elige con quien vivir",
    description:
      "Compara compatibilidad y detecta conflictos antes de mudarte.",
    images: ["/opengraph-image"],
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
