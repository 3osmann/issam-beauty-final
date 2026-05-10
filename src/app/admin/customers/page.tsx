"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then(setCustomers);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Clients</h1>
        <p className="text-sm text-slate-500">{customers.length} clients</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Commandes</th>
              <th className="text-left px-4 py-3 font-medium">Total dépensé</th>
              <th className="text-left px-4 py-3 font-medium">Inscrit</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, i) => (
              <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-rose-400 flex items-center justify-center text-white text-xs font-medium">
                      {customer.name?.charAt(0) || "?"}
                    </div>
                    <span className="text-sm font-medium">{customer.name || "Anonyme"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" />{customer.email}</td>
                <td className="px-4 py-3 text-sm">{customer.orders}</td>
                <td className="px-4 py-3 text-sm font-medium">{Number(customer.spent).toFixed(2)} TND</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(customer.joined).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Badge variant={customer.isActive ? "success" : "danger"} size="sm">{customer.isActive ? "Actif" : "Inactif"}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-500"><Eye className="w-4 h-4" /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
