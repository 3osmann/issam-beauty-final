"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Layers } from "lucide-react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Catégories</h1>
          <p className="text-sm text-slate-500">{categories.length} catégories</p>
        </div>
        <Button variant="primary"><Plus className="w-4 h-4 mr-1.5" />Ajouter une catégorie</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Nom</th>
              <th className="text-left px-4 py-3 font-medium">Slug</th>
              <th className="text-left px-4 py-3 font-medium">Produits</th>
              <th className="text-left px-4 py-3 font-medium">Ordre</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat: any, i: number) => (
              <motion.tr key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-primary-500" />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">/{cat.slug}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{cat._count?.products || 0}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{cat.sortOrder}</td>
                <td className="px-4 py-3">
                  <Badge variant={cat.isActive !== false ? "success" : "danger"} size="sm">{cat.isActive !== false ? "Active" : "Inactive"}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
