"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { QRCodeSVG } from "qrcode.react";

type Patient = {
  id: string;
  full_name: string;
  patient_id: string;
  blood_group: string;
  phone: string;
  date_of_birth: string;
  email: string;
};

const emptyPatient: Patient = {
  id: "",
  full_name: "",
  patient_id: "",
  blood_group: "B+",
  phone: "",
  date_of_birth: "",
  email: "",
};

const recentTimeline = [
  {
    year: "2026",
    items: [
      {
        title: "Blood Test — CBC Panel",
        place: "Popular Diagnostic Centre, Dhaka",
        date: "Aug 3",
        status: "Reviewed",
        statusColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      },
      {
        title: "Consultation — Dr. Rahman",
        place: "Endocrinology, Square Hospital",
        date: "Jul 22",
        status: "Prescription added",
        statusColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      },
      {
        title: "Follow-up Report Pending",
        place: "Rajshahi Medical Centre",
        date: "Aug 25",
        status: "Pending",
        statusColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      },
    ],
  },
];

const upcomingAppointments = [
  {
    doctor: "Dr. Mahmudul Rahman",
    specialty: "Endocrinology",
    date: "Today, 4:30 PM",
    location: "Square Hospital",
    mapQuery: "Square+Hospital+Dhaka",
    phone: "+8809612007788",
    initials: "MR",
  },
  {
    doctor: "Dr. Kamal Islam",
    specialty: "General Physician",
    date: "Aug 25, 6:00 PM",
    location: "SHIFA Partner Clinic, Rajshahi",
    mapQuery: "Rajshahi+Medical+College+Hospital",
    phone: "+880721772150",
    initials: "KI",
  },
];

export default function DashboardPage() {
  const [patientData, setPatientData] = useState<Patient>(emptyPatient);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    loadPatient();
  }, []);

  async function loadPatient() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data } = await supabase
        .from("patients")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setPatientData(data);
      }
    } catch (error) {
      console.error("Error loading patient:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b14]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500 shadow-lg shadow-blue-500/20" />
          <p className="text-sm font-medium text-slate-400 tracking-wide">Loading your SHIFA secure dashboard...</p>
        </div>
      </div>
    );
  }

  const patientName = patientData.full_name || "Arafat Habib Aayan";
  const patientId = patientData.patient_id || "SHF-BD-204871";
  const bloodGroup = patientData.blood_group || "B+";
  const initials = patientName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* TOP HEADER NAVBAR */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800/80 bg-[#070b14]/90 px-4 py-3.5 backdrop-blur-xl lg:px-12">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H7.875C6.01104 4.5 4.5 6.01104 4.5 7.875C4.5 9.73896 6.01104 11.25 7.875 11.25H16.125C17.989 11.25 19.5 12.761 19.5 14.625C19.5 16.489 17.989 18 16.125 18H6.75C5.50736 18 4.5 16.9926 4.5 15.75C4.5 14.5074 5.50736 13.5 6.75 13.5H16.125C17.4303 13.5 18.5 12.4303 18.5 11.125C18.5 9.81972 17.4303 8.75 16.125 8.75H7.875C5.98604 8.75 4.45 7.21396 4.45 5.325C4.45 3.43604 5.98604 1.9 7.875 1.9H17.25C18.4926 1.9 19.5 2.90736 19.5 4.15V6.75Z" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">SHIFA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold text-blue-400 transition relative py-1">
              Dashboard
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm shadow-blue-500" />
            </Link>
            <Link href="/profile" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition">
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 relative">
          <button 
            onClick={handleLogout}
            className="hidden sm:inline-block rounded-xl border border-slate-800 bg-slate-900/50 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer shadow-sm"
          >
            Logout
          </button>

          {/* MOBILE PROFILE DROPDOWN TRIGGER */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-md shadow-blue-500/20 border border-white/20 focus:outline-none"
            >
              {initials}
            </button>

            {/* DROPDOWN MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-white truncate">{patientName}</p>
                  <p className="text-[10px] text-blue-400 font-mono mt-0.5">{patientId}</p>
                </div>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
                >
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
                >
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </Link>
                <Link 
                  href="/documents" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
                >
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Medical Documents
                </Link>
                <div className="border-t border-slate-800 my-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 text-left rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <svg className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>Welcome back,</span> 
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent break-words">{patientName}</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">Here's a comprehensive overview of your biometric and clinical wellness.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2 shadow-lg backdrop-blur-md self-start sm:self-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Patient ID:</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-blue-400 tracking-wide">{patientId}</span>
          </div>
        </div>

        {/* TOP ROW: ID CARD & AI CARD */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* FLIPPABLE ID CARD */}
          <div className="group [perspective:1000px] w-full h-[210px] lg:col-span-1">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
              {/* FRONT SIDE */}
              <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1b33] to-[#122c54] p-5 text-white [backface-visibility:hidden] shadow-2xl flex flex-col justify-between border border-blue-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-black tracking-widest bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">SHIFA</p>
                    <p className="text-[9px] uppercase text-blue-300 font-semibold tracking-wider">SECURE DIGITAL PASS</p>
                  </div>
                  <div className="h-7 w-11 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-md border border-amber-300/40 flex items-center justify-center">
                    <span className="text-[8px] font-extrabold tracking-wider text-amber-950 uppercase">CHIP</span>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] uppercase text-slate-400 tracking-wider">HOLDER NAME</p>
                  <p className="text-base font-bold tracking-wide text-white truncate">{patientName}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] uppercase text-slate-400 tracking-wider">ID NUMBER</p>
                    <p className="text-xs font-mono font-bold text-blue-300">{patientId}</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase text-slate-400 tracking-wider">BLOOD GROUP</p>
                    <p className="text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">{bloodGroup}</p>
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-[#122c54] via-[#0d1b33] to-slate-900 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl flex flex-col items-center justify-center border border-blue-500/20">
                <p className="text-[10px] font-bold mb-2 text-blue-300 uppercase tracking-widest">Scan Digital Pass</p>
                <div className="bg-white p-2 rounded-2xl shadow-inner">
                  <QRCodeSVG value={`https://shifa-app.com/dashboard/${patientId}`} size={70} level="H" />
                </div>
                <p className="text-[9px] mt-2 text-slate-400 font-mono">{patientId}</p>
              </div>
            </div>
          </div>

          {/* SMART HEALTH AI CARD */}
          <Link href="/ai-shifa" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 shadow-2xl flex flex-col justify-between h-[210px] lg:col-span-2 border border-blue-500/30 transition-all hover:scale-[1.01] hover:border-blue-400/50">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none group-hover:bg-blue-500/30 transition-all"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/20 backdrop-blur-xl border border-blue-400/30 text-blue-400 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                  <path d="M12 16v6"></path>
                  <path d="M18 9h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path>
                  <path d="M6 9H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"></path>
                  <rect x="8" y="9" width="8" height="8" rx="2"></rect>
                  <circle cx="10.5" cy="13" r="1" fill="currentColor"></circle>
                  <circle cx="13.5" cy="13" r="1" fill="currentColor"></circle>
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300 border border-blue-500/30 backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                Neural Diagnostics Active
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-2xl font-black text-white tracking-tight">Smart Health AI</p>
              <p className="text-xs text-slate-300/80 mt-1 font-medium leading-relaxed max-w-lg">
                Analyze your symptoms instantly with advanced clinical intelligence, diagnostic correlations, and real-time medical insights.
              </p>
            </div>
          </Link>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/clinics" className="group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 shadow-lg backdrop-blur-md transition hover:border-blue-500/50 hover:bg-slate-900/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Find Clinic Near Me</span>
          </Link>

          <Link href="/ai-shifa" className="group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 shadow-lg backdrop-blur-md transition hover:border-blue-500/50 hover:bg-slate-900/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">AI Symptom Checker</span>
          </Link>

          <Link href="/documents" className="group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 shadow-lg backdrop-blur-md transition hover:border-blue-500/50 hover:bg-slate-900/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Upload Report</span>
          </Link>

          <Link href="/doctors" className="group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 shadow-lg backdrop-blur-md transition hover:border-blue-500/50 hover:bg-slate-900/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Find a Doctor</span>
          </Link>
        </div>

        {/* BOTTOM SECTIONS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* RECENT MEDICAL HISTORY */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6 shadow-xl backdrop-blur-md lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">Recent Medical History</h2>
              <Link href="#" className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition">View all →</Link>
            </div>
            <div className="space-y-5">
              {recentTimeline.map((group) => (
                <div key={group.year} className="relative pl-5 border-l-2 border-blue-500/20">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-slate-900 bg-blue-500 shadow-md" />
                  <p className="mb-3 text-xs font-black uppercase tracking-wider text-blue-400">{group.year}</p>
                  <div className="space-y-3">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3.5 transition hover:border-slate-700">
                        <div>
                          <p className="font-bold text-slate-100 text-xs sm:text-sm">{item.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{item.place} • <span className="text-slate-500">{item.date}</span></p>
                        </div>
                        <span className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${item.statusColor}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING APPOINTMENTS */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6 shadow-xl backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">Upcoming Appointments</h2>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 transition hover:border-slate-700">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                      {apt.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs sm:text-sm text-slate-100 truncate">{apt.doctor}</p>
                      <p className="text-[11px] text-blue-400 font-medium mt-0.5">{apt.specialty}</p>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">{apt.date}</span>
                    <span className="text-slate-400 truncate max-w-[120px]">{apt.location}</span>
                  </div>
                  
                  {/* Call, Map & Detail Buttons */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <a 
                      href={`tel:${apt.phone}`} 
                      className="rounded-xl border border-slate-800 bg-slate-900/80 py-1.5 text-center text-[11px] font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-1 shadow-sm"
                    >
                      <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call
                    </a>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${apt.mapQuery}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="rounded-xl border border-blue-500/20 bg-blue-500/10 py-1.5 text-center text-[11px] font-semibold text-blue-400 hover:bg-blue-500/20 transition flex items-center justify-center gap-1 shadow-sm"
                    >
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Map
                    </a>
                    <Link 
                      href="/ai-shifa" 
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 text-center text-[11px] font-semibold text-white hover:brightness-110 transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}