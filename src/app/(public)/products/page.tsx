"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import Button from "@/components/ui/button";

// Demo data same as homepage for now
const allProducts = [
  { id: "1", name: "J'adore Dior", slug: "jadore-dior", price: 250, comparePrice: 320, isNew: true, isBestSeller: true, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }, { rating: 4 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "2", name: "Chanel N°5", slug: "chanel-no5", price: 350, comparePrice: null, isFeatured: true, images: [{ url: "/images/product-2.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }, { rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "3", name: "Crème Hydratation Premium", slug: "creme-hydratation-premium", price: 180, comparePrice: 240, isTrending: true, images: [{ url: "/images/product-3.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }, { rating: 5 }], category: { name: "Soins Visage", slug: "soins-visage" } },
  { id: "4", name: "Sérum Anti-Âge Pro", slug: "serum-anti-age-pro", price: 290, comparePrice: null, isBestSeller: true, images: [{ url: "/images/product-4.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }, { rating: 4 }], category: { name: "Soins Visage", slug: "soins-visage" } },
  { id: "5", name: "Palette Ombres", slug: "palette-ombres-paupieres", price: 160, comparePrice: 200, isTrending: true, images: [{ url: "/images/product-5.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }, { rating: 4 }], category: { name: "Maquillage", slug: "maquillage" } },
  { id: "6", name: "Rouge à Lèvres Velours", slug: "rouge-levres-velours", price: 85, comparePrice: null, isNew: true, images: [{ url: "/images/product-6.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }, { rating: 4 }], category: { name: "Maquillage", slug: "maquillage" } },
  { id: "7", name: "Sauvage Dior", slug: "sauvage-dior", price: 280, comparePrice: 350, isFeatured: true, images: [{ url: "/images/product-7.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }, { rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "8", name: "Huile Corporelle", slug: "huile-corporelle-nourrissante", price: 120, comparePrice: null, isTrending: true, images: [{ url: "/images/product-8.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }, { rating: 5 }], category: { name: "Soins Corps", slug: "soins-corps" } },
  { id: "9", name: "Miss Diori", slug: "miss-diori", price: 310, comparePrice: 390, isNew: true, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "10", name: "Masque Visage Luxe", slug: "masque-visage-luxe", price: 95, comparePrice: null, isTrending: true, images: [{ url: "/images/product-3.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }, { rating: 4 }], category: { name: "Soins Visage", slug: "soins-visage" } },
];

const categories = ["Tout", "Parfums", "Maquillage", "Soins Visage", "Soins Corps"];
const sortOptions = [
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "popular", label: "Popularité" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = allProducts.filter(
    (p) => activeCategory === "Tout" || p.category.name === activeCategory
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <section className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4">
              Notre Collection
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Découvrez l&apos;excellence de la beauté à travers notre sélection
              exclusive de produits de luxe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
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
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <p className="text-sm text-slate-500 mb-6">
            {filtered.length} produit(s) trouvé(s)
          </p>
          <ProductGrid products={filtered} />
        </div>
      </section>
    </div>
  );
}
