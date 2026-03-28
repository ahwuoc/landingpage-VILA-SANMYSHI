"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const from = searchParams.get("from") ?? "/admin";
      router.push(from);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Đăng nhập thất bại");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-inverse-surface flex items-center justify-center p-4 font-sans">
      {/* Background glow dùng màu primary từ design system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-10 gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl ring-2 ring-primary/30">
            <Image src="/images/logo.jpg" alt="Logo VILA SANMYSHI" fill className="object-contain" priority />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Hệ thống quản trị</p>
            <h1 className="text-2xl font-black text-inverse-on-surface tracking-tight">VILA SANMYSHI</h1>
          </div>
        </div>

        {/* Card — dùng surface container */}
        <div className="bg-inverse-on-surface/5 border border-inverse-on-surface/10 rounded-[2rem] p-10 backdrop-blur-sm">
          <h2 className="text-sm font-black text-inverse-on-surface uppercase tracking-[0.3em] mb-8">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-inverse-on-surface/40 mb-2">
                Tên đăng nhập
              </label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full bg-inverse-on-surface/5 border border-inverse-on-surface/10 rounded-2xl px-5 py-4 text-inverse-on-surface text-sm font-medium placeholder:text-inverse-on-surface/20 focus:outline-none focus:border-primary focus:bg-inverse-on-surface/10 transition-all"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-inverse-on-surface/40 mb-2">
                Mật khẩu
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-inverse-on-surface/5 border border-inverse-on-surface/10 rounded-2xl px-5 py-4 text-inverse-on-surface text-sm font-medium placeholder:text-inverse-on-surface/20 focus:outline-none focus:border-primary focus:bg-inverse-on-surface/10 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-error text-xs font-bold bg-error/10 border border-error/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 shadow-[var(--shadow-glow-primary)]"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>
        </div>

        <p className="text-center text-inverse-on-surface/20 text-[10px] font-black uppercase tracking-widest mt-8">
          © 2026 Vila Sanmyshi — Nội bộ
        </p>
      </div>
    </div>
  );
}
