"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      isIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:brightness-110",
      secondary:
        "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700",
      outline:
        "border-2 border-primary-500/40 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:border-primary-500",
      ghost:
        "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
      danger:
        "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
      gold: "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-white hover:from-gold-600 hover:via-gold-500 hover:to-gold-700 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:brightness-110",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs tracking-wide",
      md: "h-11 px-6 text-sm tracking-wide",
      lg: "h-13 px-8 text-base tracking-wide",
      xl: "h-14 px-10 text-lg tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:brightness-90 overflow-hidden",
          variants[variant],
          sizes[size],
          isIcon && "p-0 aspect-square",
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="absolute animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className={cn(isLoading && "opacity-0", "flex items-center gap-1.5")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
