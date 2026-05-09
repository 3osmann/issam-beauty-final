"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Parfums",
    slug: "parfums",
    description: "Parfums de luxe pour elle et lui",
    image: "/images/category-perfume.jpg",
    gradient: "from-rose-400/20 to-purple-400/20",
  },
  {
    name: "Maquillage",
    slug: "maquillage",
    description: "Maquillage professionnel premium",
    image: "/images/category-makeup.jpg",
    gradient: "from-primary-400/20 to-rose-400/20",
  },
  {
    name: "Soins Visage",
    slug: "soins-visage",
    description: "Soins visage anti-âge et hydratation",
    image: "/images/category-skincare.jpg",
    gradient: "from-emerald-400/20 to-teal-400/20",
  },
  {
    name: "Soins Corps",
    slug: "soins-corps",
    description: "Soins corpores & bien-être",
    image: "/images/category-body.jpg",
    gradient: "from-gold-400/20 to-amber-400/20",
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            Nos Catégories
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Explorez notre sélection de produits de beauté haut de gamme
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500 z-10`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800">
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    {cat.name.charAt(0)}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <h3 className="text-lg font-serif font-semibold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/70 mb-3 line-clamp-1">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                    Découvrir
                    <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
