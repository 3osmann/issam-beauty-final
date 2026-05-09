"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import Input from "@/components/ui/input";

const allProducts = [
  { id: "1", name: "J'adore Dior", slug: "jadore-dior", price: 250, comparePrice: 320, isNew: true, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "2", name: "Chanel N°5", slug: "chanel-no5", price: 350, comparePrice: null, isFeatured: true, images: [{ url: "/images/product-2.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "3", name: "Crème Hydratation Premium", slug: "creme-hydratation-premium", price: 180, comparePrice: 240, images: [{ url: "/images/product-3.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }], category: { name: "Soins Visage", slug: "soins-visage" } },
  { id: "4", name: "Sérum Anti-Âge Pro", slug: "serum-anti-age-pro", price: 290, comparePrice: null, images: [{ url: "/images/product-4.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Soins Visage", slug: "soins-visage" } },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allProducts);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(allProducts);
      return;
    }
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="max-w-xl mx-auto mb-8">
          <Input
            icon={<SearchIcon className="w-5 h-5" />}
            placeholder="Rechercher un produit, une marque, une catégorie..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-14 text-lg rounded-2xl"
            autoFocus
          />
        </div>

        {query && (
          <p className="text-sm text-slate-500 mb-6">
            {results.length} résultat(s) pour &ldquo;{query}&rdquo;
          </p>
        )}

        <ProductGrid products={results} />

        {results.length === 0 && query && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 mx-auto text-slate-200 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-sm text-slate-500">
              Essayez d&apos;autres termes de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
