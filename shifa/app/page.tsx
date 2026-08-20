"use client";

import Link from "next/link";
import { useState } from "react";

const features = [
  {
    number: "01",
    title: "Healthcare Card",
    description:
      "Your essential healthcare information, organized in one secure digital card.",
    href: "/dashboard",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI SHIFA",
    description:
      "Understand your medical information in simple Bangla or English with your AI healthcare companion.",
    href: "/ai-shifa",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Medical Documents",
    description:
      "Add and organize your medical reports, prescriptions and important documents.",
    href: "/documents",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Previous Doctors",
    description:
      "Keep track of doctors you have consulted and your previous healthcare visits.",
    href: "/doctors",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.654 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Healthcare Suggestions",
    description:
      "Get relevant healthcare guidance based on your available medical information.",
    href: "/suggestions",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Medical Centers",
    description:
      "Discover clinics, hospitals and healthcare centers that fit your clinical needs.",
    href: "/clinics", // Clinic / Hospital / Medical ট্যাব হিসেবে কানেক্ট করা হয়েছে
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Unique Patient ID",
    description:
      "One unique identity that keeps your SHIFA healthcare information connected.",
    href: "/dashboard",
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3M15 12h3M15 15h3M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
    ),
  },
];

const timeline = [
  {
    year: "2026",
    title: "Blood Test — CBC Panel",
    place: "Popular Diagnostic Centre, Dhaka",
    status: "Report added",
  },
  {
    year: "2026",
    title: "Consultation — Dr. Rahman",
    place: "Endocrinology, Square Hospital",
    status: "Prescription added",
  },
  {
    year: "2025",
    title: "General Consultation",
    place: "SHIFA Partner Clinic, Rajshahi",
    status: "Visit recorded",
  },
];

const doctors = [
  {
    initials: "MR",
    name: "Dr. Mahmudul Rahman",
    specialty: "Endocrinology",
    experience: "12 years experience",
    location: "Square Hospital, Dhaka",
    availability: "Next: Today, 4:30 PM",
  },
  {
    initials: "NA",
    name: "Dr. Nusrat Ahmed",
    specialty: "Cardiology",
    experience: "9 years experience",
    location: "Rajshahi Medical Centre",
    availability: "Next: Tomorrow, 10:00 AM",
  },
  {
    initials: "KI",
    name: "Dr. Kamrul Islam",
    specialty: "General Physician",
    experience: "15 years experience",
    location: "SHIFA Partner Clinic, Rajshahi",
    availability: "Next: Today, 6:00 PM",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("bpm");

  return (
    <main className="min-h-screen bg-[#f8fbff] text-[#10233f] selection:bg-blue-600 selection:text-white overflow-x-hidden animate-fadeIn transition-all duration-300">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-[80px] max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-600/25 transition-transform duration-300 group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H7.875C6.01104 4.5 4.5 6.01104 4.5 7.875C4.5 9.73896 6.01104 11.25 7.875 11.25H16.125C17.989 11.25 19.5 12.761 19.5 14.625C19.5 16.489 17.989 18 16.125 18H6.75C5.50736 18 4.5 16.9926 4.5 15.75C4.5 14.5074 5.50736 13.5 6.75 13.5H16.125C17.4303 13.5 18.5 12.4303 18.5 11.125C18.5 9.81972 17.4303 8.75 16.125 8.75H7.875C5.98604 8.75 4.45 7.21396 4.45 5.325C4.45 3.43604 5.98604 1.9 7.875 1.9H17.25C18.4926 1.9 19.5 2.90736 19.5 4.15V6.75Z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-widest text-[#10233f]">
              SHIFA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[14px] font-semibold text-slate-600 md:flex">
            <Link href="/" className="text-blue-600 transition hover:text-blue-700">
              Home
            </Link>
            <Link href="#features" className="transition hover:text-blue-600">
              Features
            </Link>
            <Link href="#ai-shifa" className="transition hover:text-blue-600">
              AI SHIFA
            </Link>
            <Link href="#history" className="transition hover:text-blue-600">
              Timeline
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/doctor-portal"
              className="hidden sm:inline-flex rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:brightness-110"
            >
              Doctor Login
            </Link>
            <Link
              href="/login"
              className="rounded-xl px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-[#f8fbff] via-[#edf4ff] to-[#e2efff]">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/15 blur-[120px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto grid min-h-[680px] max-w-[1380px] grid-cols-1 items-center gap-12 px-4 sm:px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          
          <div className="max-w-[650px] relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Smart healthcare, organized around you
            </div>

            <h1 className="text-[38px] font-black leading-[1.1] tracking-tight text-[#10233f] sm:text-[56px] lg:text-[66px]">
              AI-Powered Healthcare
              <br />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                At Your Fingertips
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] sm:text-[17px] leading-8 text-slate-600 font-normal">
              SHIFA is your intelligent healthcare companion for a better and
              healthier life. Keep your healthcare information organized,
              understand your medical history, and make better-informed
              healthcare decisions seamlessly.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5"
              >
                Create SHIFA Account
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white/90 px-7 py-4 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-700 hover:-translate-y-0.5"
              >
                Login to SHIFA
              </Link>
            </div>
          </div>

          {/* HEALTH GRAPH WIDGET */}
          <div className="relative flex flex-col items-center justify-center lg:justify-end z-10 w-full">
            <div className="relative w-full max-w-[480px] rounded-[32px] bg-gradient-to-br from-[#0a1527] via-[#10233f] to-[#1c355e] p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(10,25,47,0.5)] border border-blue-500/30 overflow-hidden transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black shadow-lg shadow-blue-600/30 text-base">
                    📈
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-blue-500/30">
                      LIVE VITALS
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-1">Health Analytics</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Stable
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveTab("bpm")}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "bpm"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Heart Rate
                </button>
                <button
                  onClick={() => setActiveTab("bp")}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "bp"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Blood Pressure
                </button>
                <button
                  onClick={() => setActiveTab("sugar")}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "sugar"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Glucose
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-white/[0.03] border border-blue-500/20 p-5 backdrop-blur-md">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">
                      {activeTab === "bpm" && "Average Heart Rate"}
                      {activeTab === "bp" && "Systolic / Diastolic"}
                      {activeTab === "sugar" && "Blood Glucose Level"}
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-white mt-1 transition-all duration-300">
                      {activeTab === "bpm" && "72 BPM"}
                      {activeTab === "bp" && "120/80 mmHg"}
                      {activeTab === "sugar" && "5.6 mmol/L"}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    Normal Range
                  </span>
                </div>

                <div className="mt-6 h-28 w-full relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path
                      d="M 0,70 Q 50,20 100,50 T 200,30 T 300,40 L 300,100 L 0,100 Z"
                      fill="rgba(59, 130, 246, 0.2)"
                    />
                    <path
                      d="M 0,70 Q 50,20 100,50 T 200,30 T 300,40"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES (Updated with 7 Clean Cards) */}
      <section id="features" className="bg-[#f8fbff] py-28 text-[#10233f]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto mb-16 max-w-[720px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 backdrop-blur-sm">
              SHIFA Ecosystem
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-[#10233f]">
              Your healthcare, in one place
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Everything SHIFA is designed to help you manage your healthcare
              journey seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.number}
                href={feature.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/5 active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-inner transition group-hover:bg-blue-600 group-hover:text-white">
                    {feature.svgIcon}
                  </div>

                  <span className="text-xs font-extrabold tracking-widest text-blue-600/70">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold tracking-tight text-[#10233f] group-hover:text-blue-600 transition">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-600 opacity-80 group-hover:opacity-100 transition">
                  <span>Explore feature</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI SHIFA SECTION */}
      <section id="ai-shifa" className="border-y border-slate-200/60 bg-gradient-to-b from-[#f2f7ff] to-[#edf4ff] py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              AI SHIFA
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#10233f] md:text-5xl">
              A second opinion,
              <br />
              in plain language
            </h2>
            <p className="mt-5 max-w-[560px] text-[17px] leading-8 text-slate-600">
              AI SHIFA can help you understand your reports and healthcare
              information in a simpler way — in whichever language you are
              comfortable with.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white shadow-[0_30px_80px_rgba(25,85,209,0.12)] overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-100 bg-[#f4f7ff] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                ✦
              </div>
              <div>
                <h3 className="font-bold text-[#10233f]">AI SHIFA</h3>
                <p className="text-xs text-slate-500">Healthcare assistant</p>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-4 text-sm font-medium text-white shadow-sm">
                Can you explain my blood test report?
              </div>
              <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-[#f0f4fc] p-4 text-sm text-[#233957]">
                Your report can be reviewed and explained in simpler language with clinical insights.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-[#10233f]">SHIFA</span>
          </div>
          <div className="flex flex-wrap gap-6 font-medium">
            <Link href="/privacy" className="hover:text-blue-600 transition">Privacy</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <Link href="/doctor-portal" className="hover:text-amber-600 transition">Doctor Portal</Link>
          </div>
        </div>
        <div className="border-t border-slate-100 py-6 text-center text-xs font-semibold text-slate-500">
          Baseerah @ 2026
        </div>
      </footer>
    </main>
  );
}