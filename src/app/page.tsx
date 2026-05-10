import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import HeroSection from "@/components/home/hero-section";
import FeaturedProducts from "@/components/home/featured-products";
import CategoriesShowcase from "@/components/home/categories-showcase";
import InstagramSection from "@/components/home/instagram-section";

export default async function HomePage() {
  const [featured, bestsellers, settings] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        reviews: true,
        category: { select: { name: true, slug: true } },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { isActive: true, isBestSeller: true },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        reviews: true,
        category: { select: { name: true, slug: true } },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    getSettings(),
  ]);

  const serialize = (products: any[]) =>
    products.map((p) => ({
      ...p,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
      images: p.images.map((img: any) => ({ ...img, url: img.url || "/placeholder.jpg" })),
      reviews: p.reviews.map((r: any) => ({ rating: r.rating })),
    }));

  return (
    <>
      <HeroSection settings={settings} />
      <FeaturedProducts
        title={settings.featured_title || "Produits Phares"}
        subtitle={settings.featured_subtitle || "Les pièces incontournables de notre collection"}
        products={serialize(featured)}
        linkHref={settings.featured_link || "/products?filter=featured"}
      />
      <CategoriesShowcase />
      <FeaturedProducts
        title={settings.bestseller_title || "Meilleures Ventes"}
        subtitle={settings.bestseller_subtitle || "Les produits les plus aimés par nos clientes"}
        products={serialize(bestsellers)}
        linkHref={settings.bestseller_link || "/products?filter=bestsellers"}
      />
      <InstagramSection />
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-500/10 via-rose-500/10 to-primary-500/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 text-xs font-medium uppercase tracking-wider mb-4">
            {settings.promo_banner_badge || "Offre Exclusive"}
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            {settings.promo_banner_title || "-20% sur votre première commande"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            {settings.promo_banner_subtitle || "Inscrivez-vous à notre newsletter et recevez un code promo exclusif."}
          </p>
          <div className="text-2xl font-serif font-bold text-gradient-gold tracking-wide">
            {settings.promo_banner_code || "BIENVENUE20"}
          </div>
        </div>
      </section>
    </>
  );
}
