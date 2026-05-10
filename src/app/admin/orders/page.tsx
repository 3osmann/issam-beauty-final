"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  DELIVERED: "success", PROCESSING: "warning", PENDING: "default", CANCELLED: "danger",
};
const statusLabels: Record<string, string> = {
  DELIVERED: "Livrée", PROCESSING: "En cours", PENDING: "En attente", CANCELLED: "Annulée",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Commandes</h1>
        <p className="text-sm text-slate-500">{orders.length} commandes</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
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
              <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-mono font-medium">{order.orderNumber}</td>
                <td className="px-4 py-3 text-sm">{order.user?.name || "Client"}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm font-medium">{Number(order.total).toFixed(2)} TND</td>
                <td className="px-4 py-3">
                  <Badge variant={statusColors[order.status] || "default"} size="sm">{statusLabels[order.status] || order.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={order.paymentStatus === "COMPLETED" ? "success" : order.paymentStatus === "REFUNDED" ? "danger" : "warning"} size="sm">
                    {order.paymentStatus === "COMPLETED" ? "Payée" : order.paymentStatus === "REFUNDED" ? "Remboursée" : "En attente"}
                  </Badge>
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
