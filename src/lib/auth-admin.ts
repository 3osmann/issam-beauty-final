import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function getAdminSession() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const role = (session.user as any).role;
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") redirect("/");
  return session;
}

export async function getSession() {
  return await auth();
}
