"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Heart className="w-20 h-20 mx-auto text-slate-200 dark:text-slate-700 mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-3">Vos favoris sont vides</h1>
          <p className="text-slate-500 mb-8">
            Ajoutez vos produits préférés à vos favoris
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Découvrir la boutique
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-8">Mes Favoris</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <Link href={`/product/${item.slug}`}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-3">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeItem(item.productId);
                        toast.success("Retiré des favoris");
                      }}
                      className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
              <div className="space-y-1">
                <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                <p className="text-sm font-semibold text-primary-600">{formatPrice(item.price)}</p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      productId: item.productId,
                      name: item.name,
                      slug: item.slug,
                      price: item.price,
                      image: item.image,
                      maxQuantity: 99,
                    });
                    toast.success("Ajouté au panier");
                  }}
                  className="mt-2"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Ajouter au panier
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
