"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function EditProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Modifier le produit</h1>
          <p className="text-sm text-slate-500">J&apos;adore Dior</p>
        </div>
        <div className="flex gap-3">
          <Button variant="danger">
            <Trash2 className="w-4 h-4 mr-1.5" />
            Supprimer
          </Button>
          <Button variant="primary">
            <Save className="w-4 h-4 mr-1.5" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold">Informations</h3>
            <Input label="Nom du produit" defaultValue="J'adore Dior" />
            <Input label="Slug" defaultValue="jadore-dior" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Description courte</label>
              <textarea className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none" defaultValue="Parfum floral féminin, symbole d'élégance" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Description complète</label>
              <textarea className="w-full h-40 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none" defaultValue="Un parfum floral féminin et sophistiqué..." />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold">Prix & Stock</h3>
            <Input label="Prix" type="number" defaultValue="250" />
            <Input label="Prix comparatif" type="number" defaultValue="320" />
            <Input label="SKU" defaultValue="DIOR-JD-001" />
            <Input label="Quantité" type="number" defaultValue="45" />
          </div>
        </div>
      </div>
    </div>
  );
}
