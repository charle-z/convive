import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Home className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold">
                convive<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              Elige con quién vivir antes de descubrir que fue un error.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Producto
              </p>
              <Link
                href="/onboarding"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Encuentra roomie
              </Link>
              <Link
                href="/publish"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Encuentra roomie para tu espacio
              </Link>
              <Link
                href="/test"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                ¿Qué tipo de roomie eres?
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Ciudades
              </p>
              <span className="text-sm text-text-secondary">
                Cali{" "}
                <span className="text-xs text-success/80 ml-1">activo</span>
              </span>
              <span className="text-sm text-text-secondary/50">
                Medellín{" "}
                <span className="text-xs ml-1">próximamente</span>
              </span>
              <span className="text-sm text-text-secondary/50">
                Bogotá{" "}
                <span className="text-xs ml-1">próximamente</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary/60">
            © 2026 Convive · Hackathon CubePath
          </p>
          <p className="text-xs text-text-secondary/40 font-mono">
            Cali, Colombia 🇨🇴
          </p>
        </div>
      </div>
    </footer>
  );
}
