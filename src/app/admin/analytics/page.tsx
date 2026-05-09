"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const metrics = [
  { label: "Taux de conversion", value: "3.2%", change: "+0.5%", trend: "up" },
  { label: "Panier moyen", value: "185 TND", change: "+12 TND", trend: "up" },
  { label: "Visiteurs", value: "12,450", change: "+8.3%", trend: "up" },
  { label: "Taux de rebond", value: "24.8%", change: "-2.1%", trend: "down" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Analytiques</h1>
        <p className="text-sm text-slate-500">Performances de votre boutique</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800"
          >
            <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold font-serif mb-1">{metric.value}</p>
            <span className={`flex items-center gap-0.5 text-xs font-medium ${
              metric.trend === "up" ? "text-emerald-600" : "text-red-500"
            }`}>
              {metric.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {metric.change}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <h3 className="font-semibold mb-2">Ventes par mois</h3>
          <p className="text-sm text-slate-400 mb-6">Évolution des ventes sur 12 mois</p>
          <div className="h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <h3 className="font-semibold mb-2">Produits les plus vendus</h3>
          <p className="text-sm text-slate-400 mb-6">Top 5 des produits</p>
          {[
            { name: "J'adore Dior", sales: 145, revenue: 36250 },
            { name: "Chanel N°5", sales: 98, revenue: 34300 },
            { name: "Sérum Anti-Âge Pro", sales: 76, revenue: 22040 },
            { name: "Crème Hydratation", sales: 65, revenue: 11700 },
            { name: "Sauvage Dior", sales: 54, revenue: 15120 },
          ].map((product, i) => (
            <div key={product.name} className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-400 w-5">{i + 1}.</span>
                <span className="text-sm">{product.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{product.sales} ventes</p>
                <p className="text-xs text-slate-400">{product.revenue} TND</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
