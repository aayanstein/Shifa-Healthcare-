"use client";

import { useState } from "react";
import Link from "next/link";

const hospitalsData = {
  Rajshahi: [
    { name: "Rajshahi Medical College Hospital (RMCH)", type: "Govt", address: "Laxmipur, Rajshahi", phone: "0721-772150" },
    { name: "Islami Bank Medical College Hospital", type: "Private", address: "Binodpur, Rajshahi", phone: "01917-089705" },
    { name: "Zamzam Islami Hospital", type: "Private", address: "Kazihata, Rajshahi", phone: "01711-192600" },
    { name: "Barind Medical College & Hospital", type: "Private", address: "Rajshahi", phone: "01712-674803" },
    { name: "Rajshahi Metropolitan Hospital Ltd", type: "Private", address: "Laxmipur, Rajshahi", phone: "0721-773456" },
    { name: "Labaid Diagnostic, Rajshahi", type: "Diagnostic", address: "Greater Road, Rajshahi", phone: "09666-710006" },
    { name: "Popular Diagnostic Centre", type: "Diagnostic", address: "Laxmipur, Rajshahi", phone: "09613-787807" },
    { name: "Christian Mission Hospital", type: "Private", address: "Kazihata, Rajshahi", phone: "01733-845247" },
    { name: "Shah Mokhdum Medical College Hospital", type: "Private", address: "Kharkhari, Rajshahi", phone: "01712-674803" },
    { name: "Rajshahi Shisu Hospital", type: "Private", address: "Medical Road, Rajshahi", phone: "0721-770506" },
    { name: "Rajshahi General Hospital", type: "Diagnostic", address: "Sher Shah Rd, Rajshahi", phone: "01707-006151" },
    { name: "TB Hospital, Rajshahi", type: "Govt", address: "TB Pukur, Rajshahi", phone: "0721-000000" },
  ],
  Dhaka: [
    { name: "Square Hospital Ltd", type: "Private", address: "Panthapath, Dhaka", phone: "09612-007788" },
    { name: "Evercare Hospital Dhaka", type: "Private", address: "Bashundhara, Dhaka", phone: "09611-677677" },
    { name: "United Hospital Limited", type: "Private", address: "Gulshan-2, Dhaka", phone: "09666-710666" },
    { name: "Labaid Specialized Hospital", type: "Private", address: "Dhanmondi, Dhaka", phone: "01713-333333" },
    { name: "BIRDEM General Hospital", type: "Govt", address: "Shahbag, Dhaka", phone: "02-9661551" },
    { name: "Ibn Sina Specialized Hospital", type: "Private", address: "Dhanmondi, Dhaka", phone: "09610-010615" },
    { name: "Asgar Ali Hospital", type: "Private", address: "Gandaria, Dhaka", phone: "01787-669966" },
    { name: "Bangladesh Specialized Hospital", type: "Private", address: "Mirpur, Dhaka", phone: "09666-700100" },
    { name: "Monowara Hospital (Pvt) Ltd", type: "Private", address: "Eskaton, Dhaka", phone: "02-9359333" },
    { name: "Dhaka Medical College Hospital", type: "Govt", address: "Bakshibazar, Dhaka", phone: "02-55165088" },
    { name: "Popular Diagnostic Centre", type: "Diagnostic", address: "Dhanmondi, Dhaka", phone: "09613-787801" },
    { name: "Green Life Hospital", type: "Private", address: "Green Road, Dhaka", phone: "09618-801801" },
  ],
  Chittagong: [
    { name: "Chattogram Medical College Hospital", type: "Govt", address: "Panchlaish, Chittagong", phone: "031-611480" },
    { name: "Evercare Hospital Chattogram", type: "Private", address: "Ananna, Chittagong", phone: "09612-922911" },
    { name: "Parkview Hospital Ltd", type: "Private", address: "Panchlaish, Chittagong", phone: "031-655042" },
    { name: "Apollo Imperial Hospitals", type: "Private", address: "Pahartali, Chittagong", phone: "09610-847847" },
    { name: "Chattogram Maa-O-Shishu Hospital", type: "Private", address: "Agrabad, Chittagong", phone: "031-2512142" },
    { name: "National Hospital Chattogram", type: "Private", address: "Mehedibag, Chittagong", phone: "031-619213" },
    { name: "Max Hospital Ltd", type: "Private", address: "Mehedibag, Chittagong", phone: "031-622514" },
    { name: "CSCR (Pvt) Ltd", type: "Private", address: "O.R. Nizam Rd, Chittagong", phone: "031-656565" },
    { name: "Metropolitan Hospital", type: "Private", address: "Panchlaish, Chittagong", phone: "01814-651077" },
    { name: "Memon Maternity Hospital", type: "Private", address: "Anderkilla, Chittagong", phone: "031-617838" },
    { name: "Chittagong Diabetic General Hospital", type: "Private", address: "Panchlaish, Chittagong", phone: "031-657788" },
    { name: "Bangabandhu Memorial Hospital", type: "Private", address: "Khulshi, Chittagong", phone: "031-681682" },
  ],
  Rangpur: [
    { name: "Rangpur Medical College Hospital", type: "Govt", address: "Medical East Gate, Rangpur", phone: "0521-62325" },
    { name: "Prime Medical College Hospital", type: "Private", address: "Badargonj Rd, Rangpur", phone: "0521-63870" },
    { name: "Rangpur Community Medical College", type: "Private", address: "Shalbon, Rangpur", phone: "0521-65487" },
    { name: "Islami Bank Community Hospital", type: "Private", address: "Ganeshpur, Rangpur", phone: "0521-62287" },
    { name: "Rangpur Central Hospital", type: "Private", address: "Medical Road, Rangpur", phone: "0521-555666" },
    { name: "Northern Private Medical College", type: "Private", address: "Rangpur", phone: "0521-666777" },
    { name: "Good Health Hospital", type: "Private", address: "Rangpur", phone: "0521-000111" },
    { name: "Kasir Uddin Memorial Hospital", type: "Private", address: "Rangpur", phone: "0521-000222" },
    { name: "Hypertension & Research Center", type: "Private", address: "Medical Road, Rangpur", phone: "0521-000333" },
    { name: "Radisson Specialized Hospital", type: "Private", address: "Rangpur", phone: "0521-000444" },
    { name: "Doctor's Community Hospital", type: "Private", address: "Shalbon, Rangpur", phone: "0521-000555" },
    { name: "Rangpur General Hospital", type: "Govt", address: "Rangpur", phone: "0521-000666" },
  ],
};

export default function ClinicsPage() {
  const [selectedCity, setSelectedCity] = useState("Rajshahi");
  const currentHospitals = hospitalsData[selectedCity] || [];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#10233f]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/85 px-6 py-4 backdrop-blur-md lg:px-12">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H7.875C6.01104 4.5 4.5 6.01104 4.5 7.875C4.5 9.73896 6.01104 11.25 7.875 11.25H16.125C17.989 11.25 19.5 12.761 19.5 14.625C19.5 16.489 17.989 18 16.125 18H6.75C5.50736 18 4.5 16.9926 4.5 15.75C4.5 14.5074 5.50736 13.5 6.75 13.5H16.125C17.4303 13.5 18.5 12.4303 18.5 11.125C18.5 9.81972 17.4303 8.75 16.125 8.75H7.875C5.98604 8.75 4.45 7.21396 4.45 5.325C4.45 3.43604 5.98604 1.9 7.875 1.9H17.25C18.4926 1.9 19.5 2.90736 19.5 4.15V6.75Z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wider text-[#10233f]">SHIFA</span>
          </Link>
        </div>
        <div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#10233f]">Find Clinic or Hospital</h1>
          <p className="mt-1 text-sm text-slate-500">Select your preferred city to view top hospitals, clinics, and diagnostic centers.</p>
        </div>

        {/* CITY FILTER BUTTONS */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Object.keys(hospitalsData).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition cursor-pointer shadow-sm ${
                selectedCity === city
                  ? "bg-blue-600 text-white shadow-blue-600/20 shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* HOSPITALS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentHospitals.map((h, i) => (
            <div key={i} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#10233f] leading-snug">{h.name}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    h.type === "Govt" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : h.type === "Private"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {h.type}
                  </span>
                </div>
                
                <div className="space-y-1.5 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">📍</span>
                    <span className="text-slate-600 font-medium">{h.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">📞</span>
                    <span className="font-bold text-slate-700">{h.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a 
                  href={`tel:${h.phone}`} 
                  className="rounded-xl border border-slate-200 bg-white py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 shadow-sm transition"
                >
                  📞 Call
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ", " + h.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-xl bg-blue-600 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700 flex items-center justify-center gap-1 shadow-md shadow-blue-600/20 transition"
                >
                  🗺️ Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}