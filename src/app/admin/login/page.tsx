"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect");
      setIsLoading(false);
      return;
    }

    // Check if user has admin role
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    const role = session?.user?.role;

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Accès non autorisé. Compte administrateur requis.");
      await signIn("credentials", { redirect: false, email: "", password: "" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-white mb-1">
              <span className="text-gradient">IB</span> Admin
            </h1>
            <p className="text-sm text-slate-400">Espace administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email administrateur"
              type="email"
              placeholder="admin@issam-beauty.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />
            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-2 text-center">{error}</p>
            )}

            <Button type="submit" fullWidth size="lg" variant="primary" isLoading={isLoading}>
              Accéder à l&apos;administration
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
