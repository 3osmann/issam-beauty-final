import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  // Create admin
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.create({
    data: {
      name: "Admin Issam Beauty",
      email: "admin@issam-beauty.com",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Admin: ${admin.email} / admin123`);

  // Create demo users
  const userPassword = await bcrypt.hash("client123", 12);
  const users = await Promise.all([
    prisma.user.create({
      data: { name: "Sophie Martin", email: "client@demo.com", password: userPassword, phone: "+216 50 123 456" },
    }),
    prisma.user.create({
      data: { name: "Marie Dubois", email: "marie@email.com", password: userPassword, phone: "+216 52 789 012" },
    }),
    prisma.user.create({
      data: { name: "Camille Petit", email: "camille@email.com", password: userPassword, phone: "+216 54 345 678" },
    }),
    prisma.user.create({
      data: { name: "Julie Moreau", email: "julie@email.com", password: userPassword, phone: "+216 55 901 234" },
    }),
  ]);
  console.log(`✅ ${users.length} users created`);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Parfums", slug: "parfums", description: "Parfums de luxe pour elle et lui", sortOrder: 1 },
    }),
    prisma.category.create({
      data: { name: "Maquillage", slug: "maquillage", description: "Maquillage professionnel premium", sortOrder: 2 },
    }),
    prisma.category.create({
      data: { name: "Soins Visage", slug: "soins-visage", description: "Soins visage anti-âge et hydratation", sortOrder: 3 },
    }),
    prisma.category.create({
      data: { name: "Soins Corps", slug: "soins-corps", description: "Soins corporelset bien-être", sortOrder: 4 },
    }),
  ]);
  console.log(`✅ ${categories.length} categories created`);

  // Create products
  const productsData = [
    {
      name: "J'adore Dior",
      slug: "jadore-dior",
      description: "Un parfum floral féminin et sophistiqué. J'adore Dior incarne l'essence de la féminité avec un bouquet floral éclatant de fleurs blanches. Notes de tête d'ylang-ylang et néroli, cœur de jasmin et rose, fond boisé de santal et vanille.",
      shortDesc: "Parfum floral féminin, symbole d'élégance intemporelle",
      price: 250, comparePrice: 320, sku: "DIOR-JD-001",
      quantity: 45, brand: "Dior", gender: "women",
      isFeatured: true, isBestSeller: true, isTrending: true,
      tags: ["floral", "élégant", "féminin", "luxe", "dior"],
      categoryIdx: 0,
    },
    {
      name: "Chanel N°5",
      slug: "chanel-no5",
      description: "Le parfum légendaire de Chanel. Un bouquet floral aldéhydé intemporel qui a défini la parfumerie moderne. Notes de rose de mai, jasmin, ylang-ylang et vanille.",
      shortDesc: "Le parfum légendaire, icône intemporelle de la féminité",
      price: 350, comparePrice: null, sku: "CHANEL-N5-001",
      quantity: 30, brand: "Chanel", gender: "women",
      isFeatured: true, isBestSeller: true,
      tags: ["légendaire", "intemporel", "floral", "luxe", "chanel"],
      categoryIdx: 0,
    },
    {
      name: "Sauvage Dior",
      slug: "sauvage-dior",
      description: "Une composition radicalement fraîche et sauvage. Notes de bergamote de Calabre, ambroxan et bois d'ambre. La force de la nature sauvage.",
      shortDesc: "Parfum masculin frais et puissant",
      price: 280, comparePrice: 350, sku: "DIOR-SV-001",
      quantity: 38, brand: "Dior", gender: "men",
      isFeatured: true, isTrending: true,
      tags: ["masculin", "frais", "puissant", "sauvage", "dior"],
      categoryIdx: 0,
    },
    {
      name: "Miss Dior",
      slug: "miss-dior",
      description: "Un parfum d'amour et de bonheur. Notes de rose Grasse, muguet et iris. L'esprit libre et audacieux des femmes Dior.",
      shortDesc: "Parfum floral frais, l'esprit Dior",
      price: 310, comparePrice: 390, sku: "DIOR-MD-001",
      quantity: 25, brand: "Dior", gender: "women",
      isBestSeller: true,
      tags: ["floral", "frais", "romantique", "dior"],
      categoryIdx: 0,
    },
    {
      name: "Bleu de Chanel",
      slug: "bleu-chanel",
      description: "Un parfum boisé aromatique pour l'homme libre et audacieux. Notes de pamplemousse, gingembre, encens et bois de santal.",
      shortDesc: "Parfum masculin boisé et aromatique",
      price: 320, comparePrice: null, sku: "CHANEL-BC-001",
      quantity: 20, brand: "Chanel", gender: "men",
      isTrending: true,
      tags: ["masculin", "boisé", "aromatique", "chanel"],
      categoryIdx: 0,
    },
    {
      name: "Crème Hydratation Premium",
      slug: "creme-hydratation-premium",
      description: "Une crème riche et luxueuse qui hydrate intensément et restaure l'éclat naturel. Enrichie en acide hyaluronique et extraits de rose.",
      shortDesc: "Hydratation intense et éclat retrouvé",
      price: 180, comparePrice: 240, sku: "SKIN-CH-001",
      quantity: 50, brand: "La Mer", gender: "women",
      isFeatured: true, isTrending: true, isBestSeller: true,
      tags: ["hydratation", "soin", "visage", "luxe", "anti-âge"],
      categoryIdx: 2,
    },
    {
      name: "Sérum Anti-Âge Pro",
      slug: "serum-anti-age-pro",
      description: "Sérum concentré anti-âge à la vitamine C pure et acide hyaluronique. Texture légère, pénétration rapide. Résultats visibles dès 7 jours.",
      shortDesc: "Sérum concentré anti-âge à la vitamine C",
      price: 290, comparePrice: null, sku: "SKIN-SA-001",
      quantity: 35, brand: "Estée Lauder", gender: "women",
      isFeatured: true, isBestSeller: true,
      tags: ["anti-âge", "sérum", "vitamine C", "soin"],
      categoryIdx: 2,
    },
    {
      name: "Masque Visage Éclat",
      slug: "masque-visage-eclat",
      description: "Masque visage illuminateur à l'or 24 carats et extraits de perle. Éclat instantané et nutrition profonde.",
      shortDesc: "Masque illuminateur à l'or 24 carats",
      price: 95, comparePrice: null, sku: "SKIN-MV-001",
      quantity: 60, brand: "Givenchy", gender: "women",
      isTrending: true,
      tags: ["masque", "éclat", "soin", "visage"],
      categoryIdx: 2,
    },
    {
      name: "Palette Ombres À Paupières",
      slug: "palette-ombres-paupieres",
      description: "Palette de 12 ombres à paupières aux finis variés. Pigmentation intense, tenue longue durée. Couleurs luxueuses pour tous les looks.",
      shortDesc: "Palette 12 couleurs, pigmentation intense",
      price: 160, comparePrice: 200, sku: "MAKE-PO-001",
      quantity: 40, brand: "Dior", gender: "women",
      isFeatured: true, isTrending: true,
      tags: ["maquillage", "palette", "paupières", "dior"],
      categoryIdx: 1,
    },
    {
      name: "Rouge à Lèvres Velours",
      slug: "rouge-levres-velours",
      description: "Rouge à lèvres velouté haute tenue. Formule enrichie en huile d'argan pour des lèvres douces et colorées toute la journée.",
      shortDesc: "Rouge à lèvres velours haute tenue",
      price: 85, comparePrice: null, sku: "MAKE-RL-001",
      quantity: 75, brand: "YSL", gender: "women",
      isNew: true, isTrending: true,
      tags: ["maquillage", "lèvres", "rouge", "ysl"],
      categoryIdx: 1,
    },
    {
      name: "Mascara Volume Extra",
      slug: "mascara-volume-extra",
      description: "Mascara volume extra noir intense. Brosse innovante pour un volume spectaculaire et un cils parfaitement séparés.",
      shortDesc: "Mascara volume extra, noir intense",
      price: 65, comparePrice: 85, sku: "MAKE-MS-001",
      quantity: 90, brand: "Lancôme", gender: "women",
      isBestSeller: true,
      tags: ["maquillage", "mascara", "cils", "volume"],
      categoryIdx: 1,
    },
    {
      name: "Huile Corporelle Nourrissante",
      slug: "huile-corporelle-nourrissante",
      description: "Huile corporelle sèche à l'huile d'amande douce et vitamine E. Nutrition intense, pénétration rapide, parfum délicat.",
      shortDesc: "Huile corporelle sèche nourrissante",
      price: 120, comparePrice: null, sku: "BODY-HC-001",
      quantity: 55, brand: "L'Occitane", gender: "women",
      isTrending: true,
      tags: ["corps", "huile", "nourrissant", "soin"],
      categoryIdx: 3,
    },
    {
      name: "Gommage Corps Luxe",
      slug: "gommage-corps-luxe",
      description: "Gommage corps aux sels de la Mer Morte et huiles essentielles. Exfolie en douceur et laisse la peau soyeuse.",
      shortDesc: "Gommage corps aux sels de la Mer Morte",
      price: 75, comparePrice: null, sku: "BODY-GC-001",
      quantity: 40, brand: "Clarins", gender: "women",
      tags: ["corps", "gommage", "exfoliant", "soin"],
      categoryIdx: 3,
    },
    {
      name: "Baume Corps Réparateur",
      slug: "baume-corps-reparateur",
      description: "Baume corps riche au beurre de karité et aloe vera. Répare et protège les peaux sèches et sensibles.",
      shortDesc: "Baume réparateur au beurre de karité",
      price: 95, comparePrice: 130, sku: "BODY-BR-001",
      quantity: 30, brand: "L'Occitane", gender: "women",
      isBestSeller: true,
      tags: ["corps", "baume", "réparateur", "soin"],
      categoryIdx: 3,
    },
  ];

  const products = [];
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        name: p.name, slug: p.slug, description: p.description,
        shortDesc: p.shortDesc, price: p.price, comparePrice: p.comparePrice,
        sku: p.sku, quantity: p.quantity, brand: p.brand, gender: p.gender,
        isFeatured: p.isFeatured || false, isTrending: p.isTrending || false,
        isBestSeller: p.isBestSeller || false, isNew: p.isNew || false,
        tags: p.tags, categoryId: categories[p.categoryIdx].id,
        images: {
          create: [
            { url: `https://picsum.photos/seed/${p.slug}/600/800`, alt: p.name, isPrimary: true, sortOrder: 0 },
            { url: `https://picsum.photos/seed/${p.slug}-2/600/800`, alt: `${p.name} - Vue 2`, isPrimary: false, sortOrder: 1 },
            { url: `https://picsum.photos/seed/${p.slug}-3/600/800`, alt: `${p.name} - Vue 3`, isPrimary: false, sortOrder: 2 },
          ],
        },
      },
      include: { images: true },
    });
    products.push(product);
  }
  console.log(`✅ ${products.length} products created`);

  // Create reviews
  const reviewTexts = [
    { rating: 5, title: "Magnifique", comment: "Produit exceptionnel, je recommande vivement ! Qualité supérieure." },
    { rating: 4, title: "Très satisfaite", comment: "Très beau produit, conforme à mes attentes. Livraison rapide." },
    { rating: 5, title: "Coup de cœur", comment: "Je suis tombée amoureuse de ce produit. Il dépasse toutes mes attentes." },
    { rating: 4, title: "Excellent rapport qualité/prix", comment: "Produit de grande qualité à un prix raisonnable. Je rachèterai." },
    { rating: 3, title: "Bon produit", comment: "Bon produit mais je m'attendais à mieux vu le prix." },
  ];

  for (const product of products.slice(0, 8)) {
    for (let i = 0; i < 2; i++) {
      const user = users[i % users.length];
      await prisma.review.create({
        data: {
          rating: reviewTexts[i].rating,
          title: reviewTexts[i].title,
          comment: reviewTexts[i].comment,
          userId: user.id,
          productId: product.id,
        },
      });
    }
  }
  console.log(`✅ Reviews created`);

  // Create orders
  const orderStatuses = ["DELIVERED", "PROCESSING", "PENDING", "DELIVERED", "DELIVERED"] as const;
  for (let i = 0; i < 5; i++) {
    const user = users[i % users.length];
    const orderProducts = products.slice(i * 2, i * 2 + 2);
    const subtotal = orderProducts.reduce((sum, p) => sum + Number(p.price), 0);
    const total = subtotal + 10;

    const order = await prisma.order.create({
      data: {
        orderNumber: `IB-${Date.now().toString(36).toUpperCase()}-${i.toString(36).toUpperCase()}`,
        userId: user.id,
        status: orderStatuses[i],
        paymentStatus: orderStatuses[i] === "PENDING" ? "PENDING" : "COMPLETED",
        subtotal,
        shippingCost: 10,
        taxAmount: 0,
        discountAmount: 0,
        total,
        items: {
          create: orderProducts.map((p) => ({
            productId: p.id,
            quantity: 1,
            price: Number(p.price),
            total: Number(p.price),
          })),
        },
      },
    });
  }
  console.log(`✅ Orders created`);

  // Create coupons
  await prisma.coupon.create({
    data: { code: "BIENVENUE20", description: "20% sur votre première commande", discountType: "percentage", discountValue: 20, minOrderAmount: 100, maxUses: 200, expiresAt: new Date("2026-12-31") },
  });
  await prisma.coupon.create({
    data: { code: "VIP10", description: "10% pour les clients VIP", discountType: "percentage", discountValue: 10, maxUses: 50, expiresAt: new Date("2026-06-30") },
  });
  await prisma.coupon.create({
    data: { code: "ETE2025", description: "50 TND de réduction", discountType: "fixed", discountValue: 50, minOrderAmount: 200, maxUses: 100, expiresAt: new Date("2025-09-30") },
  });
  console.log(`✅ Coupons created`);

  // Create settings
  const initialSettings = {
    store_name: "Issam Beauty",
    store_logo_accent: "ISSAM",
    store_logo_text: " BEAUTY",
    hero_title: "La Beauté,\\nUne Nouvelle\\nDimension",
    hero_subtitle: "Découvrez notre collection exclusive de parfums et cosmétiques de luxe.",
    hero_cta: "Découvrir la Collection",
    hero_badge: "Collection Printemps 2026",
    featured_title: "Produits Phares",
    featured_subtitle: "Les pièces incontournables de notre collection",
    bestseller_title: "Meilleures Ventes",
    bestseller_subtitle: "Les produits les plus aimés par nos clientes",
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
    social_instagram: "https://instagram.com/issam_beauty",
    social_facebook: "https://facebook.com/issambeauty",
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

  for (const [key, value] of Object.entries(initialSettings)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log(`✅ ${Object.keys(initialSettings).length} settings created`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin: admin@issam-beauty.com / admin123");
  console.log("   Client: client@demo.com / client123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
