import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalRevenue, totalOrders, totalProducts, totalCustomers] =
      await Promise.all([
        prisma.order.aggregate({
          _sum: { total: true },
          where: { paymentStatus: "COMPLETED" },
        }),
        prisma.order.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.user.count({ where: { isActive: true } }),
      ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { name: true } },
          },
        },
        user: { select: { name: true } },
      },
    });

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des stats" },
      { status: 500 }
    );
  }
}
