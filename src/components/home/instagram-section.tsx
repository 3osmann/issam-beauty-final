"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const posts = [
  { id: 1, label: "Glamour" },
  { id: 2, label: "Luxury" },
  { id: 3, label: "Beauty" },
  { id: 4, label: "Elegance" },
  { id: 5, label: "Glow" },
  { id: 6, label: "Premium" },
];

export default function InstagramSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Instagram className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-medium">@issam_beauty</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            Suivez-nous sur Instagram
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Partagez votre beauté avec #IssamBeauty
          </p>
        </motion.div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800"
            >
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
                <Instagram className="w-8 h-8" />
              </div>
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {post.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
