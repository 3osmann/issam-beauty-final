"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "1", orderNumber: "IB-A1B2-C3D4", customer: "Sophie Martin", total: 530, status: "DELIVERED", payment: "COMPLETED", date: "2025-01-05" },
  { id: "2", orderNumber: "IB-E5F6-G7H8", customer: "Marie Dubois", total: 350, status: "PROCESSING", payment: "COMPLETED", date: "2025-01-04" },
  { id: "3", orderNumber: "IB-I9J0-K1L2", customer: "Camille Petit", total: 180, status: "PENDING", payment: "PENDING", date: "2025-01-03" },
  { id: "4", orderNumber: "IB-M3N4-O5P6", customer: "Julie Moreau", total: 290, status: "DELIVERED", payment: "COMPLETED", date: "2025-01-02" },
  { id: "5", orderNumber: "IB-Q7R8-S9T0", customer: "Emma Laurent", total: 160, status: "CANCELLED", payment: "REFUNDED", date: "2025-01-01" },
];

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  DELIVERED: "success",
  PROCESSING: "warning",
  PENDING: "default",
  CANCELLED: "danger",
};

const statusLabels: Record<string, string> = {
  DELIVERED: "Livrée",
  PROCESSING: "En cours",
  PENDING: "En attente",
  CANCELLED: "Annulée",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Commandes</h1>
        <p className="text-sm text-slate-500">{orders.length} commandes</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">N° Commande</th>
                <th className="text-left px-4 py-3 font-medium">Client</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Total</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Paiement</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono font-medium">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{order.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{order.total} TND</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusColors[order.status] || "default"} size="sm">
                      {statusLabels[order.status] || order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={order.payment === "COMPLETED" ? "success" : order.payment === "REFUNDED" ? "danger" : "warning"}
                      size="sm"
                    >
                      {order.payment === "COMPLETED" ? "Payée" : order.payment === "REFUNDED" ? "Remboursée" : "En attente"}
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
