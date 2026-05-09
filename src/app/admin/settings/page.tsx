"use client";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Paramètres</h1>
        <p className="text-sm text-slate-500">Configuration de la boutique</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-semibold">Informations générales</h3>
        <Input label="Nom de la boutique" defaultValue="Issam Beauty" />
        <Input label="Email de contact" type="email" defaultValue="contact@issam-beauty.com" />
        <Input label="Téléphone" type="tel" defaultValue="+216 XX XXX XXX" />
        <Input label="Adresse" defaultValue="Tunis, Tunisie" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-semibold">Frais de livraison</h3>
        <Input label="Frais de livraison standard" type="number" defaultValue="10" />
        <Input label="Commande minimum livraison offerte" type="number" defaultValue="100" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-semibold">SEO</h3>
        <Input label="Meta title" defaultValue="Issam Beauty - Parfumerie & Cosmétiques de Luxe" />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Meta description
          </label>
          <textarea
            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
            defaultValue="Découvrez Issam Beauty, votre destination de luxe pour les parfums et cosmétiques haut de gamme."
          />
        </div>
      </div>

      <Button variant="primary">Enregistrer les modifications</Button>
    </div>
  );
}
