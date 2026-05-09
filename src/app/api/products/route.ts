import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const trending = searchParams.get("trending");
    const bestseller = searchParams.get("bestseller");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const where: any = { isActive: true };

    if (category) where.category = { slug: category };
    if (featured === "true") where.isFeatured = true;
    if (trending === "true") where.isTrending = true;
    if (bestseller === "true") where.isBestSeller = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };
    if (sort === "name") orderBy = { name: "asc" };

    const products = await prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        reviews: true,
      },
      orderBy,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDesc: body.shortDesc,
        price: parseFloat(body.price),
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        sku: body.sku,
        quantity: parseInt(body.quantity),
        categoryId: body.categoryId,
        brand: body.brand,
        isFeatured: body.isFeatured || false,
        isTrending: body.isTrending || false,
        isBestSeller: body.isBestSeller || false,
        gender: body.gender || "women",
        tags: body.tags || [],
        images: {
          create: (body.images || []).map((url: string, i: number) => ({
            url,
            isPrimary: i === 0,
            sortOrder: i,
          })),
        },
      },
      include: { images: true, category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
