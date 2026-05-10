"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  TicketPercent,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Bell,
  Search,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/categories", label: "Catégories", icon: Layers },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/customers", label: "Clients", icon: Users },
  { href: "/admin/coupons", label: "Codes promo", icon: TicketPercent },
  { href: "/admin/analytics", label: "Analytiques", icon: BarChart3 },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login page - standalone, no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            {sidebarOpen ? (
              <span className="text-lg font-serif font-bold">
                <span className="text-gradient">IB</span> Admin
              </span>
            ) : (
              <span className="text-xl font-serif font-bold text-gradient">IB</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 text-slate-400 transition-transform ${
                !sidebarOpen && "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all cursor-pointer">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Déconnexion</span>}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 h-9 pl-9 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-rose-400 flex items-center justify-center text-white text-xs font-medium">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
