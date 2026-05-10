import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      where: { role: "USER" },
      include: {
        _count: { select: { orders: true } },
        orders: { select: { total: true }, where: { paymentStatus: "COMPLETED" } },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      orders: c._count.orders,
      spent: c.orders.reduce((sum, o) => sum + Number(o.total), 0),
      isActive: c.isActive,
      joined: c.createdAt,
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
