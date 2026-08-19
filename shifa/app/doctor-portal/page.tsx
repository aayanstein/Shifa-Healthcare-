"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorPortalLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // সিম্পল লগইন লজিক
    if (email === "iamarafathabib@gmail.com" && password === "password123") {
      // সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট করবে
      router.push("/doctor-dashboard");
    } else {
      alert("Invalid Credentials! Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-amber-400">
      
      {/* NAVBAR */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 p-2 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.707.353a1 1 0 01-1.353-.293l-1.5-2.5a1 1 0 01.293-1.353l.707-.353a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-1.022-1.022 2 2 0 00-2.387.477l-1.5 2.5a1 1 0 01-1.353 1.353l-.353-.707a6 6 0 00-3.86-.517L3.428 5.428a2 2 0 00-1.022 1.022l.477 2.387a6 6 0 00.517 3.86l.353.707a1 1 0 01-1.353 1.353l-2.5-1.5a1 1 0 01-1.353 1.353z" />
            </svg>
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">SHIFA <span className="text-amber-600 font-medium text-xs block -mt-1">DOCTOR PORTAL</span></span>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="text-xs font-bold text-slate-500 hover:text-amber-600 transition flex items-center gap-1.5 border border-slate-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:border-amber-200"
        >
          ← Back to Home
        </button>
      </nav>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_-15px_rgba(217,119,6,0.15)] relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 p-4 rounded-2xl shadow-lg shadow-amber-500/30">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div className="text-center mt-12 mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Doctor's Portal</h2>
          <p className="text-xs text-slate-500 mt-2 font-medium">Enter your credentials to access clinical dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Doctor ID / Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              placeholder="iamarafathabib@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded accent-amber-500" /> Remember me
            </label>
            <a href="#" className="text-amber-600 hover:text-amber-700">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign In to Clinical Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            Protected by 256-bit HIPAA compliant encryption.
          </p>
        </div>
      </div>
    </main>
  );
}