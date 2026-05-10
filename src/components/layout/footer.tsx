"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  let footerLinksBoutique: { label: string; href: string }[] = [];
  let footerLinksService: { label: string; href: string }[] = [];
  let footerLinksMarque: { label: string; href: string }[] = [];
  let footerLegal: { label: string; href: string }[] = [];

  try { footerLinksBoutique = JSON.parse(settings.footer_links_boutique || "[]"); } catch {}
  try { footerLinksService = JSON.parse(settings.footer_links_service || "[]"); } catch {}
  try { footerLinksMarque = JSON.parse(settings.footer_links_marque || "[]"); } catch {}
  try { footerLegal = JSON.parse(settings.footer_legal || "[]"); } catch {}

  const aboutText = settings.footer_about_text || "Issam Beauty est votre destination de luxe pour les parfums et cosmétiques haut de gamme.";
  const email = settings.footer_email || "contact@issam-beauty.com";
  const phone = settings.footer_phone || "+216 XX XXX XXX";
  const address = settings.footer_address || "Tunis, Tunisie";

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Newsletter */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-rose-500/5 to-primary-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-serif font-bold mb-4"
            >
              {settings.newsletter_title || "Restez Inspirée"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400 mb-8"
            >
              {settings.newsletter_subtitle || "Recevez nos offres exclusives et nouveautés en avant-première"}
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <Input type="email" placeholder={settings.newsletter_placeholder || "Votre adresse email"} className="h-12" />
              </div>
              <Button type="submit" size="lg" variant="primary">
                {settings.newsletter_cta || "S'abonner"}
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/">
              <h3 className="text-2xl font-serif font-bold mb-4">
                <span className="text-gradient">{settings.store_logo_accent || "ISSAM"}</span>
                <span className="text-slate-900 dark:text-white">{settings.store_logo_text ? settings.store_logo_text.replace(settings.store_logo_accent || "", "") : " BEAUTY"}</span>
              </h3>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {aboutText}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: settings.social_instagram || "#" },
                { icon: Facebook, href: settings.social_facebook || "#" },
                { icon: Twitter, href: settings.social_twitter || "#" },
                { icon: Youtube, href: settings.social_youtube || "#" },
              ].map((social, i) => (
                <a key={i} href={social.href}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Boutique</h4>
            <ul className="space-y-3">
              {footerLinksBoutique.map((link: any) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Service</h4>
            <ul className="space-y-3">
              {footerLinksService.map((link: any) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Marque</h4>
            <ul className="space-y-3">
              {footerLinksMarque.map((link: any) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLegal.map((link: any) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {settings.store_name || "Issam Beauty"}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>Paiement sécurisé</span><span>•</span><span>Livraison offerte dès 100 TND</span><span>•</span><span>Retours sous 14 jours</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
