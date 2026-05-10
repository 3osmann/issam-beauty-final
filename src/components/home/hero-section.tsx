"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";

interface HeroSectionProps {
  settings?: Record<string, string>;
}

export default function HeroSection({ settings = {} }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-gradient dark:dark-hero-gradient" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200/30 to-rose-200/20 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-200/20 to-purple-200/20 blur-3xl"
        />
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-gold-400/40 rounded-full" />
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-primary-400/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-6 h-6 border border-primary-300/20 rounded-full" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 lg:px-6 w-full pt-20 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {settings.hero_badge || "Collection Printemps 2026"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[1.1] mb-6"
            >
              {(() => {
                const parts = (settings.hero_title || "La Beauté,\nUne Nouvelle\nDimension").split("\\n");
                return parts.map((line: string, i: number) => (
                  <span key={i}>
                    {i === 1 ? <span className="text-gradient">{line}</span> : line}
                    {i < parts.length - 1 && <br />}
                  </span>
                ));
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {settings.hero_subtitle || "Découvrez notre collection exclusive de parfums et cosmétiques de luxe.\nL'élégance à l'état pur."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/products">
                <Button variant="primary" size="xl" className="rounded-2xl">
                  {settings.hero_cta || "Découvrir la Collection"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="xl" className="rounded-2xl">
                  Nos Catégories
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12"
            >
              {[
                { value: "500+", label: "Produits" },
                { value: "50K+", label: "Clientes" },
                { value: "99%", label: "Satisfaites" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Floating circles */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-72 h-72 rounded-full bg-gradient-to-br from-primary-300/20 to-rose-300/20 backdrop-blur-sm border border-white/30"
              />
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-gold-300/20 to-amber-300/20 backdrop-blur-sm border border-white/30"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-tr from-rose-300/20 to-purple-300/20 backdrop-blur-sm border border-white/30"
              />
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-serif font-bold text-gradient">IB</p>
                  <p className="text-xs text-slate-400 mt-2">Since 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
