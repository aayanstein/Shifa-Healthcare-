"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // সেশন রিফ্রেশ করে সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h1 className="text-3xl font-bold text-blue-700 text-center tracking-tight">
          SHIFA
        </h1>

        <p className="text-center text-slate-500 mt-2 text-sm">
          Welcome back to your healthcare account
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium text-center">
            {message}
          </div>
        )}

        {/* Register Page Link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}