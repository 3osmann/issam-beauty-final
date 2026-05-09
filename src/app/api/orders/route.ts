import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/utils";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        subtotal: parseFloat(body.subtotal),
        shippingCost: parseFloat(body.shippingCost || "0"),
        taxAmount: parseFloat(body.taxAmount || "0"),
        discountAmount: parseFloat(body.discountAmount || "0"),
        total: parseFloat(body.total),
        paymentMethod: body.paymentMethod,
        shippingMethod: body.shippingMethod,
        notes: body.notes,
        couponCode: body.couponCode,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price),
            total: parseFloat(item.total),
          })),
        },
        shippingAddress: body.shippingAddress
          ? {
              create: {
                firstName: body.shippingAddress.firstName,
                lastName: body.shippingAddress.lastName,
                phone: body.shippingAddress.phone,
                address1: body.shippingAddress.address1,
                address2: body.shippingAddress.address2,
                city: body.shippingAddress.city,
                state: body.shippingAddress.state,
                zipCode: body.shippingAddress.zipCode,
                country: body.shippingAddress.country || "TN",
              },
            }
          : undefined,
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}
