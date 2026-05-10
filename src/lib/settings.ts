import { prisma } from "./prisma";

const defaultSettings: Record<string, string> = {
  store_name: "Issam Beauty",
  store_logo_text: "ISSAM BEAUTY",
  store_logo_accent: "ISSAM",
  store_tagline: "Parfumerie & Cosmétiques de Luxe",

  hero_title: "La Beauté,\nUne Nouvelle Dimension",
  hero_subtitle: "Découvrez notre collection exclusive de parfums et cosmétiques de luxe. L'élégance à l'état pur.",
  hero_cta: "Découvrir la Collection",
  hero_badge: "Collection Printemps 2026",

  featured_title: "Produits Phares",
  featured_subtitle: "Les pièces incontournables de notre collection",
  featured_link: "/products?filter=featured",

  bestseller_title: "Meilleures Ventes",
  bestseller_subtitle: "Les produits les plus aimés par nos clientes",
  bestseller_link: "/products?filter=bestsellers",

  newsletter_title: "Restez Inspirée",
  newsletter_subtitle: "Recevez nos offres exclusives, nouveautés et conseils beauté en avant-première",
  newsletter_placeholder: "Votre adresse email",
  newsletter_cta: "S'abonner",

  promo_banner_title: "-20% sur votre première commande",
  promo_banner_subtitle: "Inscrivez-vous à notre newsletter et recevez un code promo exclusif pour bénéficier de 20% de réduction.",
  promo_banner_code: "BIENVENUE20",
  promo_banner_badge: "Offre Exclusive",

  footer_about_text: "Issam Beauty est votre destination de luxe pour les parfums et cosmétiques haut de gamme. Découvrez l'excellence de la beauté.",
  footer_email: "contact@issam-beauty.com",
  footer_phone: "+216 XX XXX XXX",
  footer_address: "Tunis, Tunisie",

  social_instagram: "#",
  social_facebook: "#",
  social_twitter: "#",
  social_youtube: "#",

  nav_links: JSON.stringify([
    { label: "Nouveautés", href: "/products?sort=newest" },
    { label: "Parfums", href: "/categories/parfums" },
    { label: "Maquillage", href: "/categories/maquillage" },
    { label: "Soins", href: "/categories/soins-visage" },
    { label: "Promotions", href: "/products?discount=true" },
  ]),

  footer_links_boutique: JSON.stringify([
    { label: "Parfums", href: "/categories/parfums" },
    { label: "Maquillage", href: "/categories/maquillage" },
    { label: "Soins Visage", href: "/categories/soins-visage" },
    { label: "Soins Corps", href: "/categories/soins-corps" },
    { label: "Nouveautés", href: "/products?sort=newest" },
    { label: "Promotions", href: "/products?discount=true" },
  ]),

  footer_links_service: JSON.stringify([
    { label: "Aide & Contact", href: "/contact" },
    { label: "Livraison", href: "/livraison" },
    { label: "Retours", href: "/retours" },
    { label: "FAQ", href: "/faq" },
    { label: "Carte Cadeau", href: "/carte-cadeau" },
  ]),

  footer_links_marque: JSON.stringify([
    { label: "À Propos", href: "/about" },
    { label: "Nos Magasins", href: "/magasins" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Presse", href: "/presse" },
  ]),

  footer_legal: JSON.stringify([
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "CGV", href: "/cgv" },
    { label: "Mentions Légales", href: "/mentions-legales" },
  ]),
};

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const dbSettings = await prisma.setting.findMany();
    const settings: Record<string, string> = { ...defaultSettings };

    for (const s of dbSettings) {
      settings[s.key] = s.value;
    }

    return settings;
  } catch {
    return defaultSettings;
  }
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function updateSettings(
  settings: Record<string, string>
): Promise<void> {
  for (const [key, value] of Object.entries(settings)) {
    await updateSetting(key, value);
  }
}

export function parseJsonArray(value: string): any[] {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}
