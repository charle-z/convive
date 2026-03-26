"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            convive
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Nav links — ocultos en mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#como-funciona"
            className="text-sm text-text-secondary hover:text-text transition-colors"
          >
            Cómo funciona
          </a>
          <a
            href="#features"
            className="text-sm text-text-secondary hover:text-text transition-colors"
          >
            Por qué Convive
          </a>
        </nav>

        {/* CTA */}
        <Link
          href="/onboarding"
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
        >
          Comenzar
        </Link>
      </div>
    </motion.header>
  );
}
