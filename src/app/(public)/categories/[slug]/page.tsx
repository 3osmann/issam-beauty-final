"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductGrid from "@/components/product/product-grid";

const categoryNames: Record<string, string> = {
  parfums: "Parfums", maquillage: "Maquillage",
  "soins-visage": "Soins Visage", "soins-corps": "Soins Corps",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?category=${slug}`)
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [slug]);

  const name = categoryNames[slug] || slug;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-2">{name}</h1>
          <p className="text-slate-500">{loading ? "Chargement..." : `${products.length} produit(s)`}</p>
        </motion.div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
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
    </div>
  );
}
