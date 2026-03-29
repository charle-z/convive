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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%236C5CE7'/><path d='M16 8L7 16h3v8h5v-5h2v5h5v-8h3L16 8z' fill='white'/></svg>",
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
