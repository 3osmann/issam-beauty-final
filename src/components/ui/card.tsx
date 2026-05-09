"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  glass = false,
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        "rounded-2xl transition-all duration-300",
        glass
          ? "glass-card"
          : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md",
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
