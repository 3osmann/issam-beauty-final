"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, getDiscountedPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductGrid from "@/components/product/product-grid";
import toast from "react-hot-toast";

const product = {
  id: "1",
  name: "J'adore Dior",
  slug: "jadore-dior",
  description:
    "Un parfum floral féminin et sophistiqué. J'adore Dior incarne l'essence de la féminité avec un bouquet floral éclatant de fleurs blanches. Les notes de tête de ylang-ylang et de néroli s'ouvrent sur un cœur de jasmin et de rose, tandis que le fond boisé de santal et de vanille apporte une touche chaleureuse et sensuelle.",
  shortDesc: "Parfum floral féminin, symbole d'élégance intemporelle",
  price: 250,
  comparePrice: 320,
  sku: "DIOR-JD-001",
  quantity: 15,
  brand: "Dior",
  gender: "women",
  tags: ["floral", "élégant", "féminin", "luxe"],
  images: [
    { id: "1", url: "/images/product-1.jpg", alt: "J'adore Dior - Face", isPrimary: true },
    { id: "2", url: "/images/product-2.jpg", alt: "J'adore Dior - Side", isPrimary: false },
    { id: "3", url: "/images/product-3.jpg", alt: "J'adore Dior - Detail", isPrimary: false },
  ],
  reviews: [
    { id: "1", rating: 5, title: "Magnifique", comment: "Un parfum sublime qui dure toute la journée. Je reçois des compliments à chaque fois.", user: { name: "Sophie M.", image: null }, createdAt: "2024-12-15" },
    { id: "2", rating: 4, title: "Très beau parfum", comment: "Très belle fragrance, élégante et féminine.", user: { name: "Marie L.", image: null }, createdAt: "2024-11-20" },
    { id: "3", rating: 5, title: "Incontournable", comment: "Mon parfum préféré depuis des années. Qualité Dior exceptionnelle.", user: { name: "Camille D.", image: null }, createdAt: "2024-10-05" },
  ],
  category: { id: "1", name: "Parfums", slug: "parfums" },
};

const relatedProducts = [
  { id: "2", name: "Chanel N°5", slug: "chanel-no5", price: 350, comparePrice: null, images: [{ url: "/images/product-2.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "7", name: "Sauvage Dior", slug: "sauvage-dior", price: 280, comparePrice: 350, images: [{ url: "/images/product-7.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
  { id: "9", name: "Miss Diori", slug: "miss-diori", price: 310, comparePrice: 390, images: [{ url: "/images/product-1.jpg", alt: "", isPrimary: true }], reviews: [{ rating: 5 }], category: { name: "Parfums", slug: "parfums" } },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const discount = getDiscountedPrice(product.price, product.comparePrice);
  const wishlisted = isInWishlist(product.id);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
      : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0].url,
        maxQuantity: product.quantity,
      });
    }
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeWishlist(product.id);
      toast.success("Retiré des favoris");
    } else {
      addWishlist({
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0].url,
      });
      toast.success("Ajouté aux favoris");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-primary-500">Accueil</Link>
          <span>/</span>
          <Link href={`/categories/${product.category.slug}`} className="hover:text-primary-500">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-rose-100/20 dark:from-primary-900/10 dark:to-rose-900/10" />
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <span className="text-6xl font-serif text-slate-200 dark:text-slate-700">
                  {product.images[selectedImage]?.alt?.charAt(0) || "P"}
                </span>
              </div>
              {discount && (
                <Badge variant="danger" size="lg" className="absolute top-4 left-4">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 transition-all",
                    selectedImage === i
                      ? "border-primary-500 ring-2 ring-primary-500/20"
                      : "border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                  )}
                >
                  <span className="w-full h-full flex items-center justify-center text-sm text-slate-300">
                    {img.alt?.charAt(0) || "P"}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-primary-500 font-medium mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl lg:text-5xl font-serif font-bold">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-4 h-4",
                      star <= avgRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 dark:text-slate-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                {avgRating.toFixed(1)} ({product.reviews.length} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discount && (
                <Badge variant="danger">-{discount}%</Badge>
              )}
            </div>

            {/* Short desc */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantité</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-14 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {product.quantity > 0 ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-3 h-3" /> En stock
                  </span>
                ) : (
                  "Rupture de stock"
                )}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="primary"
                fullWidth
                onClick={handleAddToCart}
                className="rounded-2xl"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                isIcon
                onClick={handleWishlist}
                className="rounded-2xl"
              >
                <Heart
                  className={cn("w-5 h-5", wishlisted && "fill-red-500 text-red-500")}
                />
              </Button>
              <Button size="lg" variant="ghost" isIcon className="rounded-2xl">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {[
                { icon: Truck, label: "Livraison offerte", desc: "Dès 100 TND" },
                { icon: Shield, label: "Paiement sécurisé", desc: "100% sécurisé" },
                { icon: RotateCcw, label: "Retours", desc: "Sous 14 jours" },
              ].map((feat) => (
                <div key={feat.label} className="text-center">
                  <feat.icon className="w-5 h-5 mx-auto mb-1 text-primary-500" />
                  <p className="text-xs font-medium">{feat.label}</p>
                  <p className="text-[10px] text-slate-400">{feat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16 lg:mt-24">
          <div className="flex gap-8 border-b border-slate-200 dark:border-slate-700">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "pb-4 text-sm font-medium transition-all relative",
                  activeTab === tab
                    ? "text-primary-500"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
              >
                {tab === "description" ? "Description" : `Avis (${product.reviews.length})`}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose dark:prose-invert max-w-3xl"
              >
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">SKU</p>
                    <p className="text-sm font-medium">{product.sku}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Marque</p>
                    <p className="text-sm font-medium">{product.brand}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Catégorie</p>
                    <p className="text-sm font-medium">{product.category.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl space-y-6"
              >
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {review.user.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.user.name}</p>
                          <p className="text-xs text-slate-400">{review.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "w-3.5 h-3.5",
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200 dark:text-slate-600"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <h4 className="text-sm font-semibold mb-1">{review.title}</h4>
                    )}
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8">
            Vous aimerez aussi
          </h2>
          <ProductGrid products={relatedProducts} columns={3} />
        </div>
      </div>
    </div>
  );
}
