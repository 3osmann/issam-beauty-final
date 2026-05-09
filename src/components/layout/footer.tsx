"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

const footerLinks = {
  boutique: [
    { label: "Parfums", href: "/categories/parfums" },
    { label: "Maquillage", href: "/categories/maquillage" },
    { label: "Soins Visage", href: "/categories/soins-visage" },
    { label: "Soins Corps", href: "/categories/soins-corps" },
    { label: "Nouveautés", href: "/products?sort=newest" },
    { label: "Promotions", href: "/products?discount=true" },
  ],
  service: [
    { label: "Aide & Contact", href: "/contact" },
    { label: "Livraison", href: "/livraison" },
    { label: "Retours", href: "/retours" },
    { label: "FAQ", href: "/faq" },
    { label: "Carte Cadeau", href: "/carte-cadeau" },
    { label: "Fidélité", href: "/fidelite" },
  ],
  marque: [
    { label: "À Propos", href: "/about" },
    { label: "Nos Magasins", href: "/magasins" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Presse", href: "/presse" },
    { label: "Partenaires", href: "/partenaires" },
  ],
  legal: [
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "CGV", href: "/cgv" },
    { label: "Mentions Légales", href: "/mentions-legales" },
    { label: "Paramètres Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
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
              Restez <span className="text-gradient">Inspirée</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400 mb-8"
            >
              Recevez nos offres exclusives, nouveautés et conseils beauté en avant-première
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
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="h-12"
                />
              </div>
              <Button type="submit" size="lg" variant="primary">
                S&apos;abonner
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/">
              <h3 className="text-2xl font-serif font-bold mb-4">
                <span className="text-gradient">ISSAM</span>
                <span className="text-slate-900 dark:text-white"> BEAUTY</span>
              </h3>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Issam Beauty est votre destination de luxe pour les parfums et cosmétiques haut de gamme.
              Découvrez l&apos;excellence de la beauté.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Boutique
            </h4>
            <ul className="space-y-3">
              {footerLinks.boutique.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Service
            </h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Marque
            </h4>
            <ul className="space-y-3">
              {footerLinks.marque.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>Tunis, Tunisie</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>+216 XX XXX XXX</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>contact@issam-beauty.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Issam Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>Paiement sécurisé</span>
            <span>•</span>
            <span>Livraison offerte dès 100 TND</span>
            <span>•</span>
            <span>Retours sous 14 jours</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
