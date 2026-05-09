"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductGrid from "@/components/product/product-grid";

const categoryProducts: Record<string, any[]> = {
  parfums: [
    { id: "1", name: "J'adore Dior", slug: "jadore-dior", price: 250, comparePrice: 320, isNew: true, isBestSeller: true, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
    { id: "2", name: "Chanel N°5", slug: "chanel-no5", price: 350, comparePrice: null, isFeatured: true, images: [{ url: "/images/product-2.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
    { id: "7", name: "Sauvage Dior", slug: "sauvage-dior", price: 280, comparePrice: 350, images: [{ url: "/images/product-7.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
    { id: "9", name: "Miss Dior", slug: "miss-dior", price: 310, comparePrice: 390, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  ],
  maquillage: [
    { id: "5", name: "Palette Ombres", slug: "palette-ombres-paupieres", price: 160, comparePrice: 200, isTrending: true, images: [{ url: "/images/product-5.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }], category: { name: "Maquillage", slug: "maquillage" } },
    { id: "6", name: "Rouge à Lèvres Velours", slug: "rouge-levres-velours", price: 85, comparePrice: null, isNew: true, images: [{ url: "/images/product-6.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Maquillage", slug: "maquillage" } },
  ],
  "soins-visage": [
    { id: "3", name: "Crème Hydratation Premium", slug: "creme-hydratation-premium", price: 180, comparePrice: 240, isTrending: true, images: [{ url: "/images/product-3.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }], category: { name: "Soins Visage", slug: "soins-visage" } },
    { id: "4", name: "Sérum Anti-Âge Pro", slug: "serum-anti-age-pro", price: 290, comparePrice: null, isBestSeller: true, images: [{ url: "/images/product-4.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Soins Visage", slug: "soins-visage" } },
    { id: "10", name: "Masque Visage Luxe", slug: "masque-visage-luxe", price: 95, comparePrice: null, isTrending: true, images: [{ url: "/images/product-3.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }], category: { name: "Soins Visage", slug: "soins-visage" } },
  ],
  "soins-corps": [
    { id: "8", name: "Huile Corporelle Nourrissante", slug: "huile-corporelle-nourrissante", price: 120, comparePrice: null, isTrending: true, images: [{ url: "/images/product-8.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 4 }], category: { name: "Soins Corps", slug: "soins-corps" } },
  ],
};

const categoryNames: Record<string, string> = {
  parfums: "Parfums",
  maquillage: "Maquillage",
  "soins-visage": "Soins Visage",
  "soins-corps": "Soins Corps",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const products = categoryProducts[slug] || [];
  const name = categoryNames[slug] || slug;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-2">{name}</h1>
          <p className="text-slate-500">{products.length} produit(s)</p>
        </motion.div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
