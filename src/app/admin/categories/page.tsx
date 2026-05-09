"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Layers } from "lucide-react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "1", name: "Parfums", slug: "parfums", products: 245, isActive: true, sortOrder: 1 },
  { id: "2", name: "Maquillage", slug: "maquillage", products: 380, isActive: true, sortOrder: 2 },
  { id: "3", name: "Soins Visage", slug: "soins-visage", products: 290, isActive: true, sortOrder: 3 },
  { id: "4", name: "Soins Corps", slug: "soins-corps", products: 330, isActive: true, sortOrder: 4 },
  { id: "5", name: "Promotions", slug: "promotions", products: 0, isActive: false, sortOrder: 5 },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Catégories</h1>
          <p className="text-sm text-slate-500">{categories.length} catégories</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-1.5" />
          Ajouter une catégorie
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
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
              {categories.map((cat, i) => (
                <motion.tr
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
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
                  <td className="px-4 py-3 text-sm text-slate-500">{cat.products}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{cat.sortOrder}</td>
                  <td className="px-4 py-3">
                    <Badge variant={cat.isActive ? "success" : "danger"} size="sm">
                      {cat.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
