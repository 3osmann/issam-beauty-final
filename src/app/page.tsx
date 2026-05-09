import HeroSection from "@/components/home/hero-section";
import FeaturedProducts from "@/components/home/featured-products";
import CategoriesShowcase from "@/components/home/categories-showcase";
import InstagramSection from "@/components/home/instagram-section";

// Demo data - will be replaced with real database queries
const demoProducts = [
  {
    id: "1",
    name: "J'adore Dior",
    slug: "jadore-dior",
    price: 250,
    comparePrice: 320,
    isNew: true,
    isBestSeller: true,
    images: [{ url: "/images/product-1.jpg", alt: "J'adore Dior", isPrimary: true }],
    reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }],
    category: { name: "Parfums", slug: "parfums" },
  },
  {
    id: "2",
    name: "Chanel N°5",
    slug: "chanel-no5",
    price: 350,
    comparePrice: null,
    isFeatured: true,
    images: [{ url: "/images/product-2.jpg", alt: "Chanel N°5", isPrimary: true }],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
    category: { name: "Parfums", slug: "parfums" },
  },
  {
    id: "3",
    name: "Crème Hydratation Premium",
    slug: "creme-hydratation-premium",
    price: 180,
    comparePrice: 240,
    isTrending: true,
    images: [{ url: "/images/product-3.jpg", alt: "Crème Hydratation", isPrimary: true }],
    reviews: [{ rating: 4 }, { rating: 5 }],
    category: { name: "Soins Visage", slug: "soins-visage" },
  },
  {
    id: "4",
    name: "Sérum Anti-Âge Pro",
    slug: "serum-anti-age-pro",
    price: 290,
    comparePrice: null,
    isBestSeller: true,
    images: [{ url: "/images/product-4.jpg", alt: "Sérum Anti-Âge", isPrimary: true }],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
    category: { name: "Soins Visage", slug: "soins-visage" },
  },
  {
    id: "5",
    name: "Palette Ombres À Paupières",
    slug: "palette-ombres-paupieres",
    price: 160,
    comparePrice: 200,
    isTrending: true,
    images: [{ url: "/images/product-5.jpg", alt: "Palette Ombres", isPrimary: true }],
    reviews: [{ rating: 4 }, { rating: 4 }],
    category: { name: "Maquillage", slug: "maquillage" },
  },
  {
    id: "6",
    name: "Rouge à Lèvres Velours",
    slug: "rouge-levres-velours",
    price: 85,
    comparePrice: null,
    isNew: true,
    images: [{ url: "/images/product-6.jpg", alt: "Rouge à Lèvres", isPrimary: true }],
    reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }],
    category: { name: "Maquillage", slug: "maquillage" },
  },
  {
    id: "7",
    name: "Sauvage Dior",
    slug: "sauvage-dior",
    price: 280,
    comparePrice: 350,
    isFeatured: true,
    images: [{ url: "/images/product-7.jpg", alt: "Sauvage Dior", isPrimary: true }],
    reviews: [{ rating: 5 }, { rating: 5 }],
    category: { name: "Parfums", slug: "parfums" },
  },
  {
    id: "8",
    name: "Huile Corporelle Nourrissante",
    slug: "huile-corporelle-nourrissante",
    price: 120,
    comparePrice: null,
    isTrending: true,
    images: [{ url: "/images/product-8.jpg", alt: "Huile Corporelle", isPrimary: true }],
    reviews: [{ rating: 4 }, { rating: 5 }, { rating: 4 }],
    category: { name: "Soins Corps", slug: "soins-corps" },
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts
        title="Produits Phares"
        subtitle="Les pièces incontournables de notre collection"
        products={demoProducts.slice(0, 4)}
        linkHref="/products?filter=featured"
      />
      <CategoriesShowcase />
      <FeaturedProducts
        title="Meilleures Ventes"
        subtitle="Les produits les plus aimés par nos clientes"
        products={demoProducts.slice(4, 8)}
        linkHref="/products?filter=bestsellers"
      />
      <InstagramSection />

      {/* Promo Banner */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-500/10 via-rose-500/10 to-primary-500/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 text-xs font-medium uppercase tracking-wider mb-4">
            Offre Exclusive
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            -20% sur votre première commande
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            Inscrivez-vous à notre newsletter et recevez un code promo exclusif
            pour bénéficier de 20% de réduction.
          </p>
          <div className="text-2xl font-serif font-bold text-gradient-gold tracking-wide">
            BIENVENUE20
          </div>
        </div>
      </section>
    </>
  );
}
