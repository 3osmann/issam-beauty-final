"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import toast from "react-hot-toast";

const defaultSettings = {
  store_name: "Issam Beauty",
  logo_type: "text",
  logo_image: "",
  store_logo_accent: "ISSAM",
  store_logo_text: " BEAUTY",
  hero_title: "La Beauté,\nUne Nouvelle Dimension",
  hero_subtitle: "Découvrez notre collection exclusive de parfums et cosmétiques de luxe.",
  hero_cta: "Découvrir la Collection",
  hero_badge: "Collection Printemps 2026",
  promo_banner_title: "-20% sur votre première commande",
  promo_banner_subtitle: "Inscrivez-vous à notre newsletter et recevez un code promo exclusif.",
  promo_banner_code: "BIENVENUE20",
  promo_banner_badge: "Offre Exclusive",
  newsletter_title: "Restez Inspirée",
  newsletter_subtitle: "Recevez nos offres exclusives en avant-première",
  footer_email: "contact@issam-beauty.com",
  footer_phone: "+216 XX XXX XXX",
  footer_address: "Tunis, Tunisie",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => setSettings({ ...defaultSettings, ...data }))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Paramètres enregistrés");
      } else {
        toast.error("Erreur lors de l'enregistrement");
      }
    } catch {
      toast.error("Erreur");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: string) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        update("logo_image", data.url);
        update("logo_type", "image");
        toast.success("Logo téléchargé");
      }
    } catch {
      toast.error("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = () => {
    update("logo_image", "");
    update("logo_type", "text");
    toast.success("Logo réinitialisé au texte");
  };

  const tabs = [
    { id: "general", label: "Général" },
    { id: "logo", label: "Logo" },
    { id: "hero", label: "Hero" },
    { id: "promo", label: "Promotion" },
    { id: "newsletter", label: "Newsletter" },
    { id: "footer", label: "Footer" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Paramètres du site</h1>
          <p className="text-sm text-slate-500">Contrôlez tout le contenu du site</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setSettings(defaultSettings)}
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Réinitialiser
          </Button>
          <Button variant="primary" onClick={handleSave} isLoading={saving}>
            <Save className="w-4 h-4 mr-1.5" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
      >
        {activeTab === "general" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-semibold mb-4">Informations générales</h3>
            <Input
              label="Nom de la boutique"
              value={settings.store_name}
              onChange={(e) => update("store_name", e.target.value)}
            />
          </div>
        )}

        {activeTab === "logo" && (
          <div className="space-y-6 max-w-xl">
            <h3 className="font-semibold mb-4">Logo de la boutique</h3>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => update("logo_type", "text")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${settings.logo_type === "text" ? "bg-primary-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
              >
                Texte
              </button>
              <button
                onClick={() => update("logo_type", "image")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${settings.logo_type === "image" ? "bg-primary-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
              >
                Image
              </button>
            </div>

            {settings.logo_type === "text" ? (
              <div className="space-y-4">
                <Input
                  label="Texte accent (en rose)"
                  value={settings.store_logo_accent || "ISSAM"}
                  onChange={(e) => update("store_logo_accent", e.target.value)}
                />
                <Input
                  label="Texte secondaire"
                  value={settings.store_logo_text || " BEAUTY"}
                  onChange={(e) => update("store_logo_text", e.target.value)}
                />
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                  <h2 className="text-3xl font-serif font-bold">
                    <span className="text-gradient">{settings.store_logo_accent || "ISSAM"}</span>
                    <span className="text-slate-900 dark:text-white">{settings.store_logo_text || " BEAUTY"}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-2">Aperçu du logo texte</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {settings.logo_image ? (
                  <div className="space-y-3">
                    <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <Image src={settings.logo_image} alt="Logo" width={200} height={60} className="h-12 w-auto object-contain" />
                    </div>
                    <Button variant="danger" size="sm" onClick={removeLogo}>
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Supprimer le logo
                    </Button>
                  </div>
                ) : (
                  <div className="p-10 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                    <p className="text-sm text-slate-500 mb-4">Cliquez pour télécharger un logo</p>
                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()} isLoading={uploading}>
                      <Upload className="w-4 h-4 mr-1.5" />
                      Choisir une image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadLogo(file);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "hero" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-semibold mb-4">Section Hero (Accueil)</h3>
            <Input
              label="Badge"
              value={settings.hero_badge}
              onChange={(e) => update("hero_badge", e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Titre</label>
              <textarea
                className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                value={settings.hero_title}
                onChange={(e) => update("hero_title", e.target.value)}
              />
              <p className="text-xs text-slate-400">Utilisez \n pour un saut de ligne</p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Sous-titre</label>
              <textarea
                className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                value={settings.hero_subtitle}
                onChange={(e) => update("hero_subtitle", e.target.value)}
              />
            </div>
            <Input
              label="Texte du bouton"
              value={settings.hero_cta}
              onChange={(e) => update("hero_cta", e.target.value)}
            />
          </div>
        )}

        {activeTab === "promo" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-semibold mb-4">Bannière Promotion</h3>
            <Input
              label="Badge"
              value={settings.promo_banner_badge}
              onChange={(e) => update("promo_banner_badge", e.target.value)}
            />
            <Input
              label="Titre"
              value={settings.promo_banner_title}
              onChange={(e) => update("promo_banner_title", e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Sous-titre</label>
              <textarea
                className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                value={settings.promo_banner_subtitle}
                onChange={(e) => update("promo_banner_subtitle", e.target.value)}
              />
            </div>
            <Input
              label="Code promo"
              value={settings.promo_banner_code}
              onChange={(e) => update("promo_banner_code", e.target.value)}
            />
          </div>
        )}

        {activeTab === "newsletter" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-semibold mb-4">Section Newsletter</h3>
            <Input
              label="Titre"
              value={settings.newsletter_title}
              onChange={(e) => update("newsletter_title", e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Sous-titre</label>
              <textarea
                className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                value={settings.newsletter_subtitle}
                onChange={(e) => update("newsletter_subtitle", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === "footer" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-semibold mb-4">Footer</h3>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Texte À propos</label>
              <textarea
                className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                value={settings.footer_about_text || ""}
                onChange={(e) => update("footer_about_text", e.target.value)}
              />
            </div>
            <Input
              label="Email"
              value={settings.footer_email}
              onChange={(e) => update("footer_email", e.target.value)}
            />
            <Input
              label="Téléphone"
              value={settings.footer_phone}
              onChange={(e) => update("footer_phone", e.target.value)}
            />
            <Input
              label="Adresse"
              value={settings.footer_address}
              onChange={(e) => update("footer_address", e.target.value)}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
