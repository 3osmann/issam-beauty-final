"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
           p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Produits</h1>
          <p className="text-sm text-slate-500">{products.length} produits</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary"><Plus className="w-4 h-4 mr-1.5" />Ajouter un produit</Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Produit</th>
                <th className="text-left px-4 py-3 font-medium">SKU</th>
                <th className="text-left px-4 py-3 font-medium">Catégorie</th>
                <th className="text-left px-4 py-3 font-medium">Prix</th>
                <th className="text-left px-4 py-3 font-medium">Stock</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3"><span className="text-sm font-medium">{product.name}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{product.category?.name || "-"}</td>
                  <td className="px-4 py-3 text-sm font-medium">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3"><span className={`text-sm ${product.quantity === 0 ? "text-red-500" : "text-slate-500"}`}>{product.quantity}</span></td>
                  <td className="px-4 py-3">
                    <Badge variant={product.isActive ? "success" : "danger"} size="sm">{product.isActive ? "Actif" : "Inactif"}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-500"><Eye className="w-4 h-4" /></button>
                      <Link href={`/admin/products/${product.id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"><Edit2 className="w-4 h-4" /></Link>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
