"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const statCards = stats ? [
    { label: "Revenus totaux", value: `${Number(stats.totalRevenue).toLocaleString()} TND`, change: "+12.5%", trend: "up", icon: DollarSign, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Commandes", value: stats.totalOrders.toString(), change: "+8.2%", trend: "up", icon: ShoppingCart, color: "text-primary-600 bg-primary-100 dark:bg-primary-900/30" },
    { label: "Produits", value: stats.totalProducts.toString(), change: "+3.1%", trend: "up", icon: Package, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
    { label: "Clients", value: stats.totalCustomers.toString(), change: "+5.4%", trend: "up", icon: Users, color: "text-rose-600 bg-rose-100 dark:bg-rose-900/30" },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Tableau de bord</h1>
        <p className="text-sm text-slate-500">Vue d&apos;ensemble de votre boutique</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-serif">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <h3 className="font-semibold mb-4">Produits par catégorie</h3>
          <div className="grid grid-cols-2 gap-4">
            {[{ name: "Parfums", color: "bg-rose-500" }, { name: "Maquillage", color: "bg-primary-500" }, { name: "Soins Visage", color: "bg-emerald-500" }, { name: "Soins Corps", color: "bg-gold-500" }].map((cat) => (
              <div key={cat.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <h3 className="font-semibold mb-4">Commandes récentes</h3>
          {stats?.recentOrders?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{order.items?.[0]?.product?.name || `Commande ${order.orderNumber}`}</p>
                    <p className="text-xs text-slate-400">{order.user?.name || "Client"}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium">{Number(order.total).toFixed(2)} TND</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      order.status === "DELIVERED" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                      order.status === "PROCESSING" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600" :
                      "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Aucune commande récente</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
