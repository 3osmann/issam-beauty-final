"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { useLocale } from "@/lib/locale-context";
import { formatPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/button";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } =
    useCartStore();
  const { isCartOpen, setCartOpen } = useUIStore();
  const { t } = useLocale();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-serif font-semibold">{t("cart.title")}</h2>
                <p className="text-sm text-slate-500">{getItemCount()} {t("product.items")}</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-slate-200 dark:text-slate-700 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("cart.empty")}</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    {t("cart.empty_desc")}
                  </p>
                  <Button onClick={() => setCartOpen(false)}>
                    {t("cart.continue_shopping")}
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="text-sm font-medium hover:text-primary-500 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm font-semibold text-primary-600 mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{t("cart.subtotal")}</span>
                  <span className="text-lg font-semibold">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t("cart.shipping")} calculée à l&apos;étape suivante
                </p>
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button fullWidth size="lg">
                    {t("cart.checkout")}
                  </Button>
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-sm text-slate-500 hover:text-primary-500 transition-colors"
                >
                  {t("cart.continue_shopping")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
