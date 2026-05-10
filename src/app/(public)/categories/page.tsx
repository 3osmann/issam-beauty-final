"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const gradients = [
    "from-rose-400/20 to-purple-400/20",
    "from-primary-400/20 to-rose-400/20",
    "from-emerald-400/20 to-teal-400/20",
    "from-gold-400/20 to-amber-400/20",
  ];

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4">Nos Catégories</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Explorez notre sélection de produits de beauté haut de gamme</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat: any, i: number) => (
            <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={`/categories/${cat.slug}`} className="group block relative h-64 rounded-3xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <Layers className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-1">{cat.name}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{cat.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                      <span>{cat._count?.products || 0} produits</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
