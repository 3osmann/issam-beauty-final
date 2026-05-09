import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/layout/cart-drawer";
import Toaster from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Issam Beauty - Parfumerie & Cosmétiques de Luxe",
    template: "%s | Issam Beauty",
  },
  description:
    "Découvrez Issam Beauty, votre destination de luxe pour les parfums, cosmétiques et soins haut de gamme. Collection exclusive de marques prestigieuses.",
  keywords: [
    "parfumerie",
    "cosmétiques",
    "luxe",
    "beauté",
    "soins visage",
    "maquillage",
    "parfum",
    "Issam Beauty",
  ],
  authors: [{ name: "Issam Beauty" }],
  creator: "Issam Beauty",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Issam Beauty",
    title: "Issam Beauty - Parfumerie & Cosmétiques de Luxe",
    description:
      "Découvrez Issam Beauty, votre destination de luxe pour les parfums et cosmétiques haut de gamme.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
