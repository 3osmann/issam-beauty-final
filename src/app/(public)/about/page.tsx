"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient dark:dark-hero-gradient" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-serif font-bold mb-6"
          >
            L&apos;Art de la <span className="text-gradient">Beauté</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Issam Beauty est née d&apos;une passion pour l&apos;excellence et l&apos;élégance.
            Nous sélectionnons les plus belles créations pour révéler la beauté unique de chaque femme.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "Les plus grandes marques de luxe sélectionnées pour vous" },
              { icon: Sparkles, title: "Qualité", desc: "Des produits authentiques et certifiés" },
              { icon: Shield, title: "Confiance", desc: "Paiement sécurisé et service client premium" },
              { icon: Heart, title: "Passion", desc: "Une équipe dédiée à votre beauté et bien-être" },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Fondée en 2024, Issam Beauty est le fruit d&apos;une vision : créer une destination
                où le luxe rencontre la beauté. Notre sélection rigoureuse réunit les plus grandes
                maisons de parfumerie et cosmétiques.
              </p>
              <p>
                Chaque produit est choisi avec soin pour sa qualité exceptionnelle et son savoir-faire
                unique. Nous croyons que la beauté est un art, une expression de soi qui mérite
                le meilleur.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
