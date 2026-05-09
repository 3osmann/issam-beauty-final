"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    label: "Revenus totaux",
    value: "45,280 TND",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    label: "Commandes",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-primary-600 bg-primary-100 dark:bg-primary-900/30",
  },
  {
    label: "Produits",
    value: "1,245",
    change: "+3.1%",
    trend: "up",
    icon: Package,
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  },
  {
    label: "Clients",
    value: "892",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    color: "text-rose-600 bg-rose-100 dark:bg-rose-900/30",
  },
];

const recentOrders = [
  { id: "1", customer: "Sophie Martin", product: "J'adore Dior", amount: 250, status: "Livrée", date: "05 Jan 2025" },
  { id: "2", customer: "Marie Dubois", product: "Chanel N°5", amount: 350, status: "En cours", date: "04 Jan 2025" },
  { id: "3", customer: "Camille Petit", product: "Crème Hydratation", amount: 180, status: "En attente", date: "03 Jan 2025" },
  { id: "4", customer: "Julie Moreau", product: "Sérum Anti-Âge", amount: 290, status: "Livrée", date: "02 Jan 2025" },
  { id: "5", customer: "Emma Laurent", product: "Palette Ombres", amount: 160, status: "Livrée", date: "01 Jan 2025" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif">Tableau de bord</h1>
        <p className="text-slate-500 text-sm">Vue d&apos;ensemble de votre boutique</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-serif">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Revenus (30 jours)</h3>
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400">Graphique des revenus</p>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Commandes récentes</h3>
            <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{order.product}</p>
                  <p className="text-xs text-slate-400">{order.customer}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-medium">{order.amount} TND</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    order.status === "Livrée" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                    order.status === "En cours" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600" :
                    "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Products by Category Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
      >
        <h3 className="font-semibold mb-4">Produits par catégorie</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Parfums", count: 245, color: "bg-rose-500" },
            { name: "Maquillage", count: 380, color: "bg-primary-500" },
            { name: "Soins Visage", count: 290, color: "bg-emerald-500" },
            { name: "Soins Corps", count: 330, color: "bg-gold-500" },
          ].map((cat) => (
            <div key={cat.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-lg font-bold font-serif">{cat.count}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full ${cat.color} opacity-70`}
                  style={{ width: `${(cat.count / 380) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
