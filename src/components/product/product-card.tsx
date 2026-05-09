"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, getDiscountedPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    isFeatured?: boolean;
    isTrending?: boolean;
    isBestSeller?: boolean;
    isNew?: boolean;
    images: { url: string; alt: string | null; isPrimary: boolean }[];
    reviews: { rating: number }[];
    category?: { name: string; slug: string };
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } =
    useWishlistStore();

  const primaryImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url || "/placeholder.jpg";
  const discount = getDiscountedPrice(product.price, product.comparePrice);
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      : null;

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: primaryImage,
      maxQuantity: 99,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist({
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: primaryImage,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-4">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-colors",
                wishlisted
                  ? "text-red-500 hover:bg-red-50"
                  : "text-slate-600 hover:text-red-500"
              )}
            >
              <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-slate-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount && (
              <Badge variant="danger" size="sm">
                -{discount}%
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="primary" size="sm">
                Nouveau
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="gold" size="sm">
                Best-seller
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          {product.category && (
            <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {product.category.name}
            </p>
          )}
          <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-500">
                {avgRating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
