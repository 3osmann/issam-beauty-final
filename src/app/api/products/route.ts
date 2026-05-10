import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const trending = searchParams.get("trending");
    const bestseller = searchParams.get("bestseller");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const discount = searchParams.get("discount");

    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          category: true,
          reviews: {
            include: { user: { select: { name: true, image: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      return NextResponse.json(product);
    }

    const where: any = { isActive: true };

    if (category) {
      where.category = { slug: category };
    }
    if (featured === "true") where.isFeatured = true;
    if (trending === "true") where.isTrending = true;
    if (bestseller === "true") where.isBestSeller = true;
    if (discount === "true") {
      where.comparePrice = { not: null };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
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
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
      orderBy,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
