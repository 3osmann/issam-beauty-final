"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, TicketPercent } from "lucide-react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/coupons")
      .then((r) => r.json())
      .then(setCoupons);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Codes promo</h1>
          <p className="text-sm text-slate-500">{coupons.length} codes</p>
        </div>
        <Button variant="primary"><Plus className="w-4 h-4 mr-1.5" />Ajouter un code</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {coupons.map((coupon, i) => (
          <motion.div key={coupon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <TicketPercent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <code className="text-sm font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{coupon.code}</code>
                  <p className="text-xs text-slate-400 mt-1">{coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `${coupon.discountValue} TND`}</p>
                </div>
              </div>
              <Badge variant={coupon.isActive ? "success" : "danger"} size="sm">{coupon.isActive ? "Actif" : "Inactif"}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs text-slate-500 mb-4">
              <div><span className="block">Min. commande</span><span className="font-medium text-slate-700 dark:text-slate-300">{coupon.minOrderAmount || 0} TND</span></div>
              <div><span className="block">Utilisations</span><span className="font-medium text-slate-700 dark:text-slate-300">{coupon.usedCount}/{coupon.maxUses || "∞"}</span></div>
              <div><span className="block">Expire le</span><span className="font-medium text-slate-700 dark:text-slate-300">{coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "Jamais"}</span></div>
            </div>

            <div className="flex justify-end gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"><Edit2 className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
