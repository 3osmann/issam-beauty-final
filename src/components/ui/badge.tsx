import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  size = "md",
  children,
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    primary: "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300",
    success: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
    danger: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    gold: "bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-lg",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
