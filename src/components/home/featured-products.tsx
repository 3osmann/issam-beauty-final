"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import Button from "@/components/ui/button";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: any[];
  linkHref?: string;
  linkLabel?: string;
}

export default function FeaturedProducts({
  title,
  subtitle,
  products,
  linkHref = "/products",
  linkLabel = "Voir tout",
}: FeaturedProductsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products */}
        <ProductGrid products={products} />

        {/* CTA */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href={linkHref}>
              <Button variant="outline" size="lg">
                {linkLabel}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
