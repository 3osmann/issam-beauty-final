"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import Input from "@/components/ui/input";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      fetch("/api/products")
        .then((r) => r.json())
        .then(setResults);
      return;
    }
    setLoading(true);
    fetch(`/api/products?search=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then(setResults)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="max-w-xl mx-auto mb-8">
          <Input
            icon={<SearchIcon className="w-5 h-5" />}
            placeholder="Rechercher un produit, une marque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 text-lg rounded-2xl"
            autoFocus
          />
        </div>

        {query && (
          <p className="text-sm text-slate-500 mb-6">
            {loading ? "Recherche..." : `${results.length} résultat(s) pour "${query}"`}
          </p>
        )}

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
          <ProductGrid products={results} />
        )}

        {!loading && results.length === 0 && query && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 mx-auto text-slate-200 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-sm text-slate-500">Essayez d&apos;autres termes de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}
