"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { auth } from "./auth";
import { slugify, generateOrderNumber } from "./utils";

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const sku = formData.get("sku") as string;

  await prisma.product.create({
    data: {
      name,
      slug: slugify(name),
      description: (formData.get("description") as string) || "",
      price,
      sku,
      quantity: parseInt(formData.get("quantity") as string) || 0,
      categoryId,
      images: {
        create: [{ url: "/placeholder.jpg", isPrimary: true }],
      },
    },
  });

  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.product.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      slug: slugify(formData.get("name") as string),
      description: (formData.get("description") as string) || "",
      price: parseFloat(formData.get("price") as string),
      sku: formData.get("sku") as string,
      quantity: parseInt(formData.get("quantity") as string) || 0,
      categoryId: formData.get("categoryId") as string,
    },
  });

  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });

  revalidatePath("/admin/orders");
}

export async function subscribeNewsletter(email: string) {
  const existing = await prisma.newsletter.findUnique({
    where: { email },
  });

  if (existing) {
    if (!existing.isActive) {
      await prisma.newsletter.update({
        where: { id: existing.id },
        data: { isActive: true },
      });
    }
    return { message: "Déjà inscrit" };
  }

  await prisma.newsletter.create({ data: { email } });
  return { message: "Inscription réussie" };
}
