"use client";

import { motion } from "framer-motion";
import { Mail, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const customers = [
  { id: "1", name: "Sophie Martin", email: "sophie@email.com", orders: 5, spent: 1250, status: "active", joined: "Dec 2024" },
  { id: "2", name: "Marie Dubois", email: "marie@email.com", orders: 3, spent: 780, status: "active", joined: "Nov 2024" },
  { id: "3", name: "Camille Petit", email: "camille@email.com", orders: 8, spent: 2100, status: "active", joined: "Oct 2024" },
  { id: "4", name: "Julie Moreau", email: "julie@email.com", orders: 1, spent: 290, status: "inactive", joined: "Jan 2025" },
  { id: "5", name: "Emma Laurent", email: "emma@email.com", orders: 12, spent: 3450, status: "active", joined: "Sep 2024" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Clients</h1>
        <p className="text-sm text-slate-500">{customers.length} clients</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
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
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-rose-400 flex items-center justify-center text-white text-xs font-medium">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{customer.orders}</td>
                  <td className="px-4 py-3 text-sm font-medium">{customer.spent} TND</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{customer.joined}</td>
                  <td className="px-4 py-3">
                    <Badge variant={customer.status === "active" ? "success" : "danger"} size="sm">
                      {customer.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-500">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
