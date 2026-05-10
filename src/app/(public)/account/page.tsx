"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/stores/wishlist-store";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

const tabs = [
  { id: "dashboard", label: "Tableau de bord", icon: User },
  { id: "orders", label: "Mes commandes", icon: Package },
  { id: "wishlist", label: "Mes favoris", icon: Heart },
  { id: "profile", label: "Mon profil", icon: Settings },
];

export default function AccountPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const wishlistItems = useWishlistStore((s) => s.items);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-8">Mon Compte</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
              <hr className="my-2 border-slate-200 dark:border-slate-700" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <LogOut className="w-4 h-4" />Déconnexion
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-serif font-semibold mb-1">Bienvenue, {session?.user?.name || "Chère Cliente"}</h2>
                    <p className="text-sm text-slate-500">{session?.user?.email}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card rounded-2xl p-4 text-center">
                      <Package className="w-5 h-5 mx-auto mb-2 text-primary-500" />
                      <div className="text-2xl font-bold font-serif">{orders.length}</div>
                      <div className="text-xs text-slate-500">Commandes</div>
                    </div>
                    <div className="glass-card rounded-2xl p-4 text-center">
                      <Heart className="w-5 h-5 mx-auto mb-2 text-primary-500" />
                      <div className="text-2xl font-bold font-serif">{wishlistItems.length}</div>
                      <div className="text-xs text-slate-500">Favoris</div>
                    </div>
                    <div className="glass-card rounded-2xl p-4 text-center">
                      <User className="w-5 h-5 mx-auto mb-2 text-primary-500" />
                      <div className="text-2xl font-bold font-serif">VIP</div>
                      <div className="text-xs text-slate-500">Statut</div>
                    </div>
                  </div>
                  {orders.length > 0 && (
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="font-semibold mb-4">Commandes récentes</h3>
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                          <div>
                            <p className="text-sm font-medium">{order.orderNumber}</p>
                            <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} article(s)</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${order.status === "DELIVERED" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}>
                            {order.status === "DELIVERED" ? "Livrée" : order.status === "PROCESSING" ? "En cours" : "En attente"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-6">Mes commandes</h2>
                  {orders.length === 0 ? (
                    <p className="text-slate-500">Aucune commande pour le moment</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <div>
                            <p className="text-sm font-medium">{order.orderNumber}</p>
                            <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{Number(order.total).toFixed(2)} TND</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${order.status === "DELIVERED" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}>
                              {order.status === "DELIVERED" ? "Livrée" : "En cours"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-4">Mes favoris</h2>
                  <p className="text-sm text-slate-500 mb-4">{wishlistItems.length} produit(s) dans vos favoris</p>
                  {wishlistItems.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.productId} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-6">Mon profil</h2>
                  <div className="space-y-4 max-w-md">
                    <Input label="Nom complet" defaultValue={session?.user?.name || ""} />
                    <Input label="Email" type="email" defaultValue={session?.user?.email || ""} />
                    <Button variant="primary">Enregistrer</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
