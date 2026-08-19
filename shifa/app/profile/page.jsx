"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const emptyPatient = {
  id: "",
  full_name: "",
  blood_group: "B+",
  phone: "",
  date_of_birth: "",
  Patient_id: "",
  email: "",
  emergency_contact: "",
  allergies: "",
  chronic_conditions: "",
};

export default function ProfilePage() {
  const [patient, setPatient] = useState(emptyPatient);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setPatient({
          id: data.id || data.user_id || user.id,
          full_name: data.full_name || "",
          blood_group: data.blood_group || "B+",
          phone: data.phone || "",
          date_of_birth: data.date_of_birth || "",
          Patient_id: data.Patient_id || "",
          email: data.email || user.email || "",
          emergency_contact: data.emergency_contact || "",
          allergies: data.allergies || "None reported",
          chronic_conditions: data.chronic_conditions || "None reported",
        });
      } else if (error) {
        console.error("Error fetching profile:", error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updates = {
        full_name: patient.full_name,
        blood_group: patient.blood_group,
        phone: patient.phone,
        date_of_birth: patient.date_of_birth || null,
        email: patient.email,
        emergency_contact: patient.emergency_contact,
        allergies: patient.allergies,
        chronic_conditions: patient.chronic_conditions,
      };

      const { error } = await supabase
        .from("patients")
        .update(updates)
        .eq("user_id", user.id);

      if (error) {
        alert("Error updating profile: " + error.message);
      } else {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070e18]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Loading secure profile...</p>
        </div>
      </div>
    );
  }

  const initials = patient.full_name
    ? patient.full_name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AH";

  return (
    <div className="min-h-screen bg-[#070e18] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* PREMIUM HEADER / NAVBAR */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070e18]/80 px-6 py-4 backdrop-blur-xl lg:px-12">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20 transition group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H7.875C6.01104 4.5 4.5 6.01104 4.5 7.875C4.5 9.73896 6.01104 11.25 7.875 11.25H16.125C17.989 11.25 19.5 12.761 19.5 14.625C19.5 16.489 17.989 18 16.125 18H6.75C5.50736 18 4.5 16.9926 4.5 15.75C4.5 14.5074 5.50736 13.5 6.75 13.5H16.125C17.4303 13.5 18.5 12.4303 18.5 11.125C18.5 9.81972 17.4303 8.75 16.125 8.75H7.875C5.98604 8.75 4.45 7.21396 4.45 5.325C4.45 3.43604 5.98604 1.9 7.875 1.9H17.25C18.4926 1.9 19.5 2.90736 19.5 4.15V6.75Z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">SHIFA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition">Home</Link>
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition">Dashboard</Link>
            <Link href="/profile" className="text-sm font-semibold text-indigo-400 relative py-1">
              Profile
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500" />
            </Link>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer shadow-sm"
        >
          Logout
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">My Profile</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your secure medical records, personal credentials, and settings.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* LEFT SIDEBAR PROFILE CARD */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#101e35] to-[#0a1322] p-6 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
              
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-xl shadow-blue-900/40 ring-4 ring-white/10">
                {initials}
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Verified Patient
              </div>

              <h2 className="mt-3 text-lg font-bold text-white">{patient.full_name || "Arafat Habib"}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Patient Account</p>

              {/* ID Card preview widget */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950 via-[#102a52] to-indigo-950 p-4 text-left text-white shadow-inner border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-50 backdrop-blur-sm pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">SHIFA GLOBAL</p>
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                  </div>
                  <p className="text-xs font-bold mt-2 truncate">{patient.full_name || "Arafat Habib"}</p>
                  <p className="text-[11px] font-mono text-indigo-200 mt-1 tracking-wider">{patient.Patient_id || "SHF-BD-204871"}</p>
                </div>
              </div>
            </div>

            {/* SIDEBAR NAVIGATION TABS */}
            <div className="rounded-3xl border border-white/10 bg-[#0d1729] p-3 shadow-xl space-y-1.5">
              <button 
                onClick={() => setActiveTab("personal")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${activeTab === 'personal' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
              >
                Personal Information
              </button>
              <button 
                onClick={() => setActiveTab("health")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${activeTab === 'health' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
              >
                Health Information
              </button>
              <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-slate-200 transition">
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT FORM CONTAINER */}
          <div className="rounded-3xl border border-white/10 bg-[#0d1729] p-8 shadow-2xl lg:col-span-3 relative">
            <form onSubmit={handleUpdate} className="space-y-6">
              
              {activeTab === "personal" ? (
                <>
                  <div>
                    <h2 className="text-lg font-bold text-white">Personal Information</h2>
                    <p className="text-xs text-slate-400 mt-0.5">This information is used securely across your SHIFA ID and clinical appointments.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={patient.full_name} 
                        onChange={(e) => setPatient({...patient, full_name: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Date of Birth</label>
                      <input 
                        type="date" 
                        value={patient.date_of_birth} 
                        onChange={(e) => setPatient({...patient, date_of_birth: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={patient.phone} 
                        onChange={(e) => setPatient({...patient, phone: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={patient.email} 
                        onChange={(e) => setPatient({...patient, email: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Blood Group</label>
                      <select
                        value={patient.blood_group}
                        onChange={(e) => setPatient({...patient, blood_group: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      >
                        <option value="A+" className="bg-[#070e18]">A+</option>
                        <option value="A-" className="bg-[#070e18]">A-</option>
                        <option value="B+" className="bg-[#070e18]">B+</option>
                        <option value="B-" className="bg-[#070e18]">B-</option>
                        <option value="AB+" className="bg-[#070e18]">AB+</option>
                        <option value="AB-" className="bg-[#070e18]">AB-</option>
                        <option value="O+" className="bg-[#070e18]">O+</option>
                        <option value="O-" className="bg-[#070e18]">O-</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Emergency Contact</label>
                      <input 
                        type="text" 
                        value={patient.emergency_contact} 
                        onChange={(e) => setPatient({...patient, emergency_contact: e.target.value})}
                        placeholder="Emergency phone number"
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] px-4 py-3 text-sm font-medium text-white placeholder-slate-600 focus:bg-[#0d1729] focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">SHIFA Patient ID</label>
                    <input 
                      type="text" 
                      value={patient.Patient_id} 
                      onChange={(e) => setPatient({...patient, Patient_id: e.target.value})}
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-mono text-slate-400 cursor-not-allowed select-none"
                      disabled
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Your Patient ID is permanent and system-generated.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-lg font-bold text-white">Health Information</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Clinical details vital for physicians during treatments.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Known Allergies</label>
                      <textarea
                        rows={3}
                        value={patient.allergies}
                        onChange={(e) => setPatient({...patient, allergies: e.target.value})}
                        placeholder="e.g., Penicillin, Peanuts..."
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chronic Conditions</label>
                      <textarea
                        rows={3}
                        value={patient.chronic_conditions}
                        onChange={(e) => setPatient({...patient, chronic_conditions: e.target.value})}
                        placeholder="e.g., Hypertension, Asthma..."
                        className="w-full rounded-xl border border-white/10 bg-[#070e18] p-4 text-sm font-medium text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none transition shadow-inner"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => fetchProfile()}
                  className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition cursor-pointer"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}