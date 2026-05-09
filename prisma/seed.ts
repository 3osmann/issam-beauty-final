import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@issam-beauty.com" },
    update: {},
    create: {
      name: "Admin Issam Beauty",
      email: "admin@issam-beauty.com",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash("client123", 12);
  const user = await prisma.user.upsert({
    where: { email: "client@demo.com" },
    update: {},
    create: {
      name: "Sophie Martin",
      email: "client@demo.com",
      password: userPassword,
      phone: "+216 XX XXX XXX",
    },
  });
  console.log("Demo user created:", user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "parfums" },
      update: {},
      create: {
        name: "Parfums",
        slug: "parfums",
        description: "Parfums de luxe pour elle et lui",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "maquillage" },
      update: {},
      create: {
        name: "Maquillage",
        slug: "maquillage",
        description: "Maquillage professionnel premium",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "soins-visage" },
      update: {},
      create: {
        name: "Soins Visage",
        slug: "soins-visage",
        description: "Soins visage anti-âge et hydratation",
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "soins-corps" },
      update: {},
      create: {
        name: "Soins Corps",
        slug: "soins-corps",
        description: "Soins corporels et bien-être",
        sortOrder: 4,
      },
    }),
  ]);
  console.log("Categories created:", categories.length);

  // Create coupons
  await Promise.all([
    prisma.coupon.upsert({
      where: { code: "BIENVENUE20" },
      update: {},
      create: {
        code: "BIENVENUE20",
        description: "20% de réduction sur la première commande",
        discountType: "percentage",
        discountValue: 20,
        minOrderAmount: 100,
        maxUses: 200,
        expiresAt: new Date("2025-12-31"),
      },
    }),
    prisma.coupon.upsert({
      where: { code: "VIP10" },
      update: {},
      create: {
        code: "VIP10",
        description: "10% de réduction pour les clients VIP",
        discountType: "percentage",
        discountValue: 10,
        maxUses: 50,
        expiresAt: new Date("2025-06-30"),
      },
    }),
  ]);
  console.log("Coupons created");

  // Create settings
  await Promise.all([
    prisma.setting.upsert({
      where: { key: "store_name" },
      update: {},
      create: { key: "store_name", value: "Issam Beauty" },
    }),
    prisma.setting.upsert({
      where: { key: "store_email" },
      update: {},
      create: { key: "store_email", value: "contact@issam-beauty.com" },
    }),
    prisma.setting.upsert({
      where: { key: "store_phone" },
      update: {},
      create: { key: "store_phone", value: "+216 XX XXX XXX" },
    }),
  ]);
  console.log("Settings created");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
