"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function CheckoutPage() {
  const { items, getTotal, getItemCount } = useCartStore();
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p>Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  s <= step
                    ? "bg-primary-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {s}
              </div>
              <span className={`text-sm hidden sm:block ${s <= step ? "text-primary-500 font-medium" : "text-slate-400"}`}>
                {s === 1 ? "Livraison" : s === 2 ? "Paiement" : "Confirmation"}
              </span>
              {s < 3 && <ChevronRight className="w-4 h-4 text-slate-300" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {step === 1 && (
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="text-xl font-serif font-semibold mb-4">Adresse de livraison</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Prénom" placeholder="Votre prénom" />
                    <Input label="Nom" placeholder="Votre nom" />
                  </div>
                  <Input label="Téléphone" type="tel" placeholder="+216 XX XXX XXX" />
                  <Input label="Adresse" placeholder="Rue, numéro..." />
                  <Input label="Complément d'adresse" placeholder="Appartement, étage..." />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Ville" placeholder="Ville" />
                    <Input label="Code postal" placeholder="Code postal" />
                  </div>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Continuer vers le paiement
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="text-xl font-serif font-semibold mb-4">Paiement sécurisé</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <Lock className="w-3 h-3" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <Input label="Numéro de carte" placeholder="1234 5678 9012 3456" icon={<CreditCard className="w-4 h-4" />} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Date d'expiration" placeholder="MM/AA" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                  <Input label="Nom sur la carte" placeholder="Comme sur la carte" />
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => setStep(3)}
                  >
                    Payer {formatPrice(getTotal())}
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif font-bold mb-2">Commande confirmée !</h2>
                  <p className="text-slate-500 mb-6">
                    Merci pour votre commande. Vous recevrez un email de confirmation.
                  </p>
                  <Button variant="primary">Voir ma commande</Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-serif font-semibold">Votre commande</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <hr className="border-slate-200 dark:border-slate-700" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sous-total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Livraison</span>
                  <span className="text-emerald-600">Offerter</span>
                </div>
              </div>
              <hr className="border-slate-200 dark:border-slate-700" />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary-600">{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
