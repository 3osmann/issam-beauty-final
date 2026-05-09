"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

const tabs = [
  { id: "dashboard", label: "Tableau de bord", icon: User },
  { id: "orders", label: "Mes commandes", icon: Package },
  { id: "wishlist", label: "Mes favoris", icon: Heart },
  { id: "addresses", label: "Mes adresses", icon: MapPin },
  { id: "profile", label: "Mon profil", icon: Settings },
];

const orders = [
  { id: "1", orderNumber: "IB-A1B2-C3D4", status: "DELIVERED", total: 530, items: 3, date: "2024-12-20" },
  { id: "2", orderNumber: "IB-E5F6-G7H8", status: "PROCESSING", total: 250, items: 1, date: "2025-01-05" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-8">Mon Compte</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <hr className="my-2 border-slate-200 dark:border-slate-700" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-serif font-semibold mb-1">Bienvenue, Sophia</h2>
                    <p className="text-sm text-slate-500">sophia@email.com</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Commandes", value: "5", icon: Package },
                      { label: "Favoris", value: "12", icon: Heart },
                      { label: "Points Fidélité", value: "850", icon: CreditCard },
                    ].map((stat) => (
                      <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                        <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-500" />
                        <div className="text-2xl font-bold font-serif">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Commandes récentes</h3>
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{order.orderNumber}</p>
                          <p className="text-xs text-slate-400">{order.date} • {order.items} article(s)</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                            order.status === "DELIVERED" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                          }`}>
                            {order.status === "DELIVERED" ? "Livrée" : "En cours"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-6">Mes commandes</h2>
                  {orders.length === 0 ? (
                    <p className="text-slate-500">Aucune commande pour le moment</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <div>
                            <p className="text-sm font-medium">{order.orderNumber}</p>
                            <p className="text-xs text-slate-400">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{order.total.toFixed(2)} TND</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${
                              order.status === "DELIVERED" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                            }`}>
                              {order.status === "DELIVERED" ? "Livrée" : "En cours"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-6">Mon profil</h2>
                  <div className="space-y-4 max-w-md">
                    <Input label="Nom complet" defaultValue="Sophia" />
                    <Input label="Email" type="email" defaultValue="sophia@email.com" />
                    <Input label="Téléphone" type="tel" defaultValue="+216 XX XXX XXX" />
                    <Button variant="primary">Enregistrer</Button>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-semibold mb-6">Mes adresses</h2>
                  <p className="text-sm text-slate-500 mb-4">Aucune adresse enregistrée</p>
                  <Button variant="primary" size="sm">Ajouter une adresse</Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
