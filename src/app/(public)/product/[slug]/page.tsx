"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Heart, ShoppingBag, Share2, Check, Minus, Plus, Truck, Shield, RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, getDiscountedPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductGrid from "@/components/product/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetch(`/api/products?slug=${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        const p = Array.isArray(data) ? data[0] : data;
        setProduct(p);
        if (p?.category) {
          fetch(`/api/products?category=${p.category.slug}`)
            .then((r) => r.json())
            .then((relatedData) => {
              setRelated((Array.isArray(relatedData) ? relatedData : []).filter((rp: any) => rp.id !== p.id).slice(0, 3));
            });
        }
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton variant="rectangular" className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-2">Produit non trouvé</h2>
          <Link href="/products"><Button>Voir tous les produits</Button></Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountedPrice(product.price, product.comparePrice);
  const wishlisted = isInWishlist(product.id);
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.price),
        image: product.images?.[0]?.url || "/placeholder.jpg",
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
        price: Number(product.price),
        image: product.images?.[0]?.url || "/placeholder.jpg",
      });
      toast.success("Ajouté aux favoris");
    }
  };

  const images = product.images?.length
    ? product.images
    : [{ id: "0", url: "/placeholder.jpg", alt: product.name, isPrimary: true }];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-primary-500">Accueil</Link>
          <span>/</span>
          <Link href={`/categories/${product.category?.slug}`} className="hover:text-primary-500">{product.category?.name}</Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-rose-100/20 dark:from-primary-900/10 dark:to-rose-900/10" />
              <img
                src={images[selectedImage]?.url}
                alt={images[selectedImage]?.alt || product.name}
                className="w-full h-full object-cover"
              />
              {discount && <Badge variant="danger" size="lg" className="absolute top-4 left-4">-{discount}%</Badge>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: any, i: number) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 transition-all ${
                      selectedImage === i ? "border-primary-500 ring-2 ring-primary-500/20" : "border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                    }`}
                  >
                    <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              {product.brand && <p className="text-sm uppercase tracking-widest text-primary-500 font-medium mb-2">{product.brand}</p>}
              <h1 className="text-3xl lg:text-5xl font-serif font-bold">{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={cn("w-4 h-4", star <= avgRating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600")} />
                ))}
              </div>
              <span className="text-sm text-slate-500">{avgRating.toFixed(1)} ({product.reviews?.length || 0} avis)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
              {discount && <Badge variant="danger">-{discount}%</Badge>}
            </div>

            {product.shortDesc && <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{product.shortDesc}</p>}

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantité</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-14 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {product.quantity > 0 ? (
                  <span className="flex items-center gap-1 text-emerald-600"><Check className="w-3 h-3" /> En stock</span>
                ) : "Rupture de stock"}
              </span>
            </div>

            <div className="flex gap-3">
              <Button size="lg" variant="primary" fullWidth onClick={handleAddToCart} className="rounded-2xl">
                <ShoppingBag className="w-5 h-5 mr-2" /> Ajouter au panier
              </Button>
              <Button size="lg" variant="outline" isIcon onClick={handleWishlist} className="rounded-2xl">
                <Heart className={cn("w-5 h-5", wishlisted && "fill-red-500 text-red-500")} />
              </Button>
              <Button size="lg" variant="ghost" isIcon className="rounded-2xl">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

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

        <div className="mt-16 lg:mt-24">
          <div className="flex gap-8 border-b border-slate-200 dark:border-slate-700">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn("pb-4 text-sm font-medium transition-all relative", activeTab === tab ? "text-primary-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
              >
                {tab === "description" ? "Description" : `Avis (${product.reviews?.length || 0})`}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {product.sku && <div><p className="text-sm text-slate-400">SKU</p><p className="text-sm font-medium">{product.sku}</p></div>}
                  {product.brand && <div><p className="text-sm text-slate-400">Marque</p><p className="text-sm font-medium">{product.brand}</p></div>}
                  {product.category && <div><p className="text-sm text-slate-400">Catégorie</p><p className="text-sm font-medium">{product.category.name}</p></div>}
                  {product.tags?.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-400">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.tags.map((tag: string) => <Badge key={tag} variant="default" size="sm">{tag}</Badge>)}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
                {product.reviews?.length > 0 ? product.reviews.map((review: any) => (
                  <div key={review.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{review.user?.name?.charAt(0) || "A"}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.user?.name || "Anonyme"}</p>
                          <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={cn("w-3.5 h-3.5", star <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600")} />
                        ))}
                      </div>
                    </div>
                    {review.title && <h4 className="text-sm font-semibold mb-1">{review.title}</h4>}
                    <p className="text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
                  </div>
                )) : <p className="text-slate-400">Aucun avis pour le moment.</p>}
              </motion.div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8">Vous aimerez aussi</h2>
            <ProductGrid products={related} columns={3} />
          </div>
        )}
      </div>
    </div>
  );
}
