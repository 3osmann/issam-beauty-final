import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        gold: {
          50: "#fff9eb",
          100: "#fef0c7",
          200: "#fde09a",
          300: "#fcca6d",
          400: "#fbb44c",
          500: "#d4a853",
          600: "#b8903a",
          700: "#9a7828",
          800: "#7d611d",
          900: "#664c16",
          950: "#3b2a0a",
        },
        nude: {
          50: "#fdf8f3",
          100: "#f9ede1",
          200: "#f3d9c0",
          300: "#ebbf9a",
          400: "#e2a374",
          500: "#da8b54",
          600: "#c4733c",
          700: "#a45c32",
          800: "#864b2d",
          900: "#6e3f28",
          950: "#3b1f13",
        },
        cream: "#FFF8F3",
        champagne: "#F7E8D0",
        blush: "#FFE4E1",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "luxury-gradient":
          "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #fce7f3 75%, #fdf2f8 100%)",
        "dark-gradient":
          "linear-gradient(135deg, #1e1b2e 0%, #2d1b36 50%, #1e1b2e 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #d4a853 0%, #fcca6d 50%, #d4a853 100%)",
        "rose-gradient":
          "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-lg": "0 8px 48px 0 rgba(31, 38, 135, 0.12)",
        "glass-xl": "0 8px 64px 0 rgba(31, 38, 135, 0.15)",
        luxury: "0 4px 24px rgba(212, 168, 83, 0.15)",
        "luxury-lg": "0 8px 40px rgba(212, 168, 83, 0.2)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
