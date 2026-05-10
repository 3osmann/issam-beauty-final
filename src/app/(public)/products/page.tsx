"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";

const categories = ["Tout", "Parfums", "Maquillage", "Soins Visage", "Soins Corps"];
const sortOptions = [
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "popular", label: "Popularité" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "Tout") params.set("category", activeCategory);
    if (sortBy) params.set("sort", sortBy);

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4">Notre Collection</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Découvrez l&apos;excellence de la beauté à travers notre sélection exclusive de produits de luxe
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 lg:top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-transparent border-none focus:outline-none text-slate-600 dark:text-slate-300"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <p className="text-sm text-slate-500 mb-6">{loading ? "Chargement..." : `${products.length} produit(s) trouvé(s)`}</p>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </div>
  );
}
