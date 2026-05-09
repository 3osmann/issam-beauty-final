"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, Save } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function NewProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Nouveau produit</h1>
          <p className="text-sm text-slate-500">Ajouter un produit à la boutique</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button variant="primary">
            <Save className="w-4 h-4 mr-1.5" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <h3 className="font-semibold">Informations</h3>
            <Input label="Nom du produit" placeholder="Ex: J'adore Dior" />
            <Input label="Slug" placeholder="ex: jadore-dior" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Description courte
              </label>
              <textarea
                className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none"
                placeholder="Brève description du produit"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Description complète
              </label>
              <textarea
                className="w-full h-40 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none"
                placeholder="Description détaillée du produit..."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <h3 className="font-semibold">Images</h3>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                >
                  <button className="absolute top-1 right-1 p-1 rounded-lg bg-red-500 text-white">
                    <X className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-slate-400">Image {i + 1}</span>
                </div>
              ))}
              <button className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 hover:border-primary-500 transition-colors">
                <Plus className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] text-slate-400">Ajouter</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <h3 className="font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium"
                >
                  {tag}
                  <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Ajouter un tag..."
                className="flex-1 h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
              />
              <Button variant="secondary" size="sm" onClick={addTag}>
                Ajouter
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <h3 className="font-semibold">Prix & Stock</h3>
            <Input label="Prix (TND)" type="number" placeholder="0.00" />
            <Input label="Prix comparatif" type="number" placeholder="0.00" />
            <Input label="SKU" placeholder="EX-PROD-001" />
            <Input label="Quantité" type="number" defaultValue="0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <h3 className="font-semibold">Organisation</h3>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Catégorie
              </label>
              <select className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="">Sélectionner...</option>
                <option value="1">Parfums</option>
                <option value="2">Maquillage</option>
                <option value="3">Soins Visage</option>
                <option value="4">Soins Corps</option>
              </select>
            </div>
            <Input label="Marque" placeholder="Ex: Dior, Chanel..." />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Genre
              </label>
              <select className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="women">Femme</option>
                <option value="men">Homme</option>
                <option value="unisex">Mixte</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <h3 className="font-semibold">Mise en avant</h3>
            {[
              { label: "Produit phare", key: "isFeatured" },
              { label: "Tendance", key: "isTrending" },
              { label: "Meilleure vente", key: "isBestSeller" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
