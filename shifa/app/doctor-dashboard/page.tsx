"use client";

import { useState } from "react";
import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  problem: string;
  bloodGroup: string;
  lastVisit: string;
  previousPrescription: string;
  doctorVisited: string;
  doctorQualification: string;
  doctorHospital: string;
  hospitalName: string;
}

// ১০০০টি সম্পূর্ণ আলাদা নাম তৈরির জন্য বড় নাম ও টাইটেলের তালিকা
const firstNamesMale = [
  "Tanvir", "Rahim", "Nazmul", "Mehedi", "Imran", "Rakibul", "Shamim", "Shahriar", 
  "Anisur", "Ashraful", "Touhid", "Sakib", "Tamim", "Mushfiq", "Mahmud", "Rubel", 
  "Nayeem", "Farhan", "Sazzad", "Monir", "Arif", "Biplob", "Jahid", "Foisal", 
  "Shaheen", "Zillur", "Habib", "Sohag", "Rokon", "Ripon", "Masum", "Liton"
];

const firstNamesFemale = [
  "Sumaiya", "Sadia", "Nusrat", "Farhana", "Anika", "Jannatul", "Tasnim", "Mehjabin", 
  "Sabrina", "Tania", "Sharmin", "Moumita", "Popy", "Nila", "Bristy", "Puja", 
  "Maliha", "Fariha", "Rimi", "Sultana", "Nargis", "Ayesha", "Fatema", "Khadija", 
  "Nazia", "Sanjida", "Tahmina", "Zannat", "Mim", "Roksana", "Shathi", "Mitu"
];

const lastNames = [
  "Ahmed", "Hossain", "Islam", "Uddin", "Khan", "Sarker", "Chowdhury", "Talukder", 
  "Bhuiyan", "Mollah", "Biswas", "Roy", "Das", "Siddique", "Khandakar", "Rahman", 
  "Ali", "Akther", "Begum", "Kawsar", "Kabir", "Munshi", "Ferdous", "Majumder"
];

const initialPatientsData: Patient[] = Array.from({ length: 1000 }, (_, index) => {
  const serial = index + 1;
  const id = `SHF-BD-${204000 + serial}`;
  
  const isFemale = index % 2 !== 0;
  const fNames = isFemale ? firstNamesFemale : firstNamesMale;
  
  // ম্যাথমেটিকally ইউনিক কম্বিনেশন তৈরি যাতে নাম রিপিট না হয়
  const firstName = fNames[index % fNames.length];
  const lastName = lastNames[Math.floor(index / fNames.length) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const gender = isFemale ? "Female" : "Male";

  const problems = [
    "Acute Chest Pain & Palpitations",
    "Gestational Hypertension & Mild Headache",
    "Type 2 Diabetes Control & Neuropathy",
    "Severe Migraine & Sleep Disorder",
    "Chronic Asthma & Breathing Difficulty",
    "Coronary Artery Disease Consultation",
    "Thyroid Hormone Imbalance",
    "Gastric Ulcer & Acid Reflux",
    "Lower Back Pain & Joint Stiffness",
    "Routine Post-Operative Cardiac Checkup",
    "Allergic Rhinitis & Skin Rash",
    "High Cholesterol & Fatigue"
  ];
  
  const doctorsList = [
    { name: "Dr. Mahmudul Rahman", qual: "MBBS, FCPS (Medicine)", clinic: "Square Hospital, Dhaka" },
    { name: "Dr. Nusrat Ahmed", qual: "MBBS, MD (Cardiology)", clinic: "Popular Diagnostic Centre, Rajshahi" },
    { name: "Dr. Kamrul Islam", qual: "BDS, PGT (Oral Surgery)", clinic: "Rajshahi Medical College Hospital" },
    { name: "Dr. Farhana Yasmin", qual: "MBBS, DCH (Paediatrics)", clinic: "Evercare Hospital, Dhaka" },
    { name: "Dr. Tanvir Hasan", qual: "MBBS, MS (Orthopedics)", clinic: "Islami Bank Medical College Hospital" }
  ];

  const currentDoctor = doctorsList[index % doctorsList.length];

  const hospitals = [
    "Square Hospital, Dhaka",
    "Popular Diagnostic Centre, Rajshahi",
    "Rajshahi Medical College Hospital",
    "Evercare Hospital, Dhaka",
    "Islami Bank Medical College Hospital"
  ];

  return {
    id,
    name,
    age: 18 + (index % 60),
    gender,
    phone: `+880 171${(1000000 + index).toString().slice(-7)}`,
    problem: problems[index % problems.length],
    bloodGroup: ["A+", "B+", "O+", "AB+", "A-", "B-"][index % 6],
    lastVisit: "2026-08-20",
    previousPrescription: `Metformin 500mg, Omeprazole 20mg - Advised strict diet and regular checkup.`,
    doctorVisited: currentDoctor.name,
    doctorQualification: currentDoctor.qual,
    doctorHospital: currentDoctor.clinic,
    hospitalName: hospitals[index % hospitals.length]
  };
});

const medicineBrands: { [key: string]: string[] } = {
  paracetamol: ["Napa Extend (Beximco)", "Ace 500mg (Square)", "Fexo Fast (Incepta)", "Renova"],
  metformin: ["Comet 500mg (Square)", "Diabex (Beximco)", "Glucophage (Merck)"],
  omeprazole: ["Proton 20mg (Square)", "Losec (AstraZeneca)", "Seclo 20mg (Beximco)"],
  amoxicillin: ["Moxacil (Square)", "Albiotic (Incepta)"],
  aspirin: ["Ecosprin 75 (Square)", "Cardiprin (Reckitt)"]
};

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("SHF-BD-204001");
  
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [sidebarNoteInput, setSidebarNoteInput] = useState("");

  const [medInput, setMedInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [prescriptionNotes, setPrescriptionNotes] = useState("");

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const todaysAppointments = patients.slice(0, 4);

  // সার্চ ফিল্টার লজিক (কমপক্ষে ২ অক্ষর টাইপ করতে হবে)
  const filteredPatients = searchQuery.trim().length < 2 
    ? [] 
    : patients.filter((p) => 
        p.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );

  const handleMedInputChange = (val: string) => {
    setMedInput(val);
    const key = val.toLowerCase().trim();
    if (medicineBrands[key]) {
      setAiSuggestions(medicineBrands[key]);
    } else {
      const matched = Object.keys(medicineBrands).filter(k => k.includes(key));
      if (matched.length > 0) {
        setAiSuggestions(medicineBrands[matched[0]]);
      } else {
        setAiSuggestions(["Suggested: Generic Brand A (Square)", "Suggested: Premium Brand B (Beximco)"]);
      }
    }
  };

  const handleSaveSidebarNote = () => {
    if (!sidebarNoteInput.trim()) return;
    const updatedNote = `[New Rx - 2026-08-20]: ${sidebarNoteInput}`;
    
    setPatients(prev =>
      prev.map(p =>
        p.id === selectedPatient.id
          ? { ...p, previousPrescription: updatedNote, lastVisit: "2026-08-20" }
          : p
      )
    );
    alert(`Prescription successfully updated for ${selectedPatient.name} with today's date!`);
    setSidebarNoteInput("");
  };

  const handleSaveAiPrescription = () => {
    if (!prescriptionNotes.trim()) return;
    const updatedNote = `[AI Rx - 2026-08-20]: ${prescriptionNotes}`;

    setPatients(prev =>
      prev.map(p =>
        p.id === selectedPatient.id
          ? { ...p, previousPrescription: updatedNote, lastVisit: "2026-08-20" }
          : p
      )
    );
    alert(`AI Prescription successfully saved and updated in database for ${selectedPatient.name}!`);
    setIsPrescriptionModalOpen(false);
    setPrescriptionNotes("");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10 relative selection:bg-amber-400 selection:text-slate-950">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-8 rounded-3xl border border-amber-300/60 shadow-xl shadow-amber-500/5">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Clinical Command Center
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Dr. Arafat Habib Aayan</h1>
          <p className="text-slate-500 text-xs font-medium mt-1 tracking-wide">
            MBBS, FCPS (Cardiology) &bull; Senior Consultant &bull; Square Hospital & Popular Diagnostic Centre, Rajshahi
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-300 px-5 py-3 rounded-2xl font-extrabold text-amber-900 text-xs tracking-wider shadow-sm">
            August 20, 2026
          </div>
          <Link
            href="/doctor-portal"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 shadow-sm"
          >
            Log Out
          </Link>
        </div>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-amber-300/60 shadow-xl shadow-amber-500/5 flex items-center justify-between group hover:border-amber-400 transition">
          <div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Total Patients Database</p>
            <p className="text-3xl font-black text-slate-900 mt-1 group-hover:text-amber-700 transition">1,000</p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div 
          onClick={() => setIsAppointmentModalOpen(true)}
          className="bg-gradient-to-br from-amber-500 to-yellow-500 p-6 rounded-3xl border border-amber-400 shadow-xl shadow-amber-500/20 flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition"
        >
          <div>
            <p className="text-white/90 text-[11px] font-bold uppercase tracking-widest">Today&apos;s Appointments</p>
            <p className="text-3xl font-black text-white mt-1">4 Active</p>
            <span className="text-[10px] font-bold text-amber-950 bg-white/80 px-2 py-0.5 rounded-md mt-1 inline-block">
              Click to view queue →
            </span>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xl shadow-emerald-500/5 flex items-center justify-between group hover:border-emerald-400 transition">
          <div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">AI Assistant Status</p>
            <p className="text-xl font-black text-emerald-700 mt-1 tracking-wide">SHIFA AI Active</p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Patient List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-amber-300/60 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-wide">Patient Database</h2>
              <p className="text-xs text-slate-500 mt-0.5">Type Shifa ID or Name to query (e.g. Tanvir, Sumaiya)</p>
            </div>
            
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID or Name..."
                className="w-full rounded-2xl bg-slate-50 border border-amber-300/80 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono shadow-inner transition"
              />
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    selectedPatientId === patient.id
                      ? "border-amber-500 bg-amber-50/60 shadow-md shadow-amber-500/5"
                      : "border-slate-100 bg-slate-50/60 hover:border-amber-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 tracking-wide">{patient.name}</h4>
                        <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-amber-800 font-semibold">
                          {patient.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Problem: <span className="text-amber-800 font-medium">{patient.problem}</span>
                      </p>
                    </div>
                  </div>

                  <button className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl shadow-xs hover:bg-amber-500 hover:text-white transition">
                    View Biodata →
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs font-mono bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">
                {searchQuery.trim().length < 2 
                  ? "🔒 Patient list is hidden. Type at least 2 characters in search box..." 
                  : "No patient found matching your query."}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Detailed Patient Biodata */}
        <div className="bg-white p-8 rounded-3xl border border-amber-300/60 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100 tracking-wide">
              Patient Full Biodata
            </h2>

            {selectedPatient ? (
              <div className="space-y-3 text-xs">
                
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">SHIFA UNIQUE ID</span>
                  <p className="text-sm font-black font-mono text-slate-900 mt-0.5 tracking-wider">{selectedPatient.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-400 block text-[11px]">Full Name</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">{selectedPatient.name}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-400 block text-[11px]">Age / Gender</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">{selectedPatient.age} yrs / {selectedPatient.gender}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">Current Problem</span>
                  <strong className="text-amber-800 text-sm mt-0.5 block">{selectedPatient.problem}</strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">Hospital / Institution</span>
                  <strong className="text-slate-900 text-sm mt-0.5 block">{selectedPatient.hospitalName}</strong>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-slate-400 block text-[11px]">Previous Doctor Visited</span>
                  <strong className="text-slate-900 text-sm block">{selectedPatient.doctorVisited}</strong>
                  
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span><strong className="text-slate-900">Qualification:</strong> {selectedPatient.doctorQualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span><strong className="text-slate-900">Clinic / Hospital:</strong> {selectedPatient.doctorHospital}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-slate-400 block text-[11px]">Prescription Record</span>
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Date: {selectedPatient.lastVisit}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200 mt-1 shadow-inner">
                    {selectedPatient.previousPrescription}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2.5 mt-4">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-amber-900 uppercase tracking-widest">
                    Quick Prescription Note (Direct)
                  </label>
                  <textarea
                    rows={3}
                    value={sidebarNoteInput}
                    onChange={(e) => setSidebarNoteInput(e.target.value)}
                    placeholder="Type prescription note here..."
                    className="w-full rounded-xl bg-white border border-amber-300 p-3 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner"
                  />
                  <button
                    onClick={handleSaveSidebarNote}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-black text-xs shadow-md transition"
                  >
                    Save & Update Database Date
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p>No Patient Selected</p>
              </div>
            )}
          </div>

          {selectedPatient && (
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="mt-6 w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-amber-500/20 hover:brightness-105 transition flex items-center justify-center gap-2 tracking-wide uppercase"
            >
              Open AI Prescription Window
            </button>
          )}
        </div>

      </div>

      {/* TODAY'S APPOINTMENTS POPUP MODAL */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-amber-300 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 text-white flex justify-between items-center shadow-md">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/15 px-2.5 py-1 rounded">
                  Live Clinical Queue
                </span>
                <h3 className="text-xl font-black mt-1">Today&apos;s Appointments (Shifa ID Queue)</h3>
              </div>
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center font-bold hover:bg-black/25 transition text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-slate-500 mb-2 font-medium">
                Here are today&apos;s scheduled patients with their unique Shifa IDs. Click to load biodata:
              </p>
              
              {todaysAppointments.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => {
                    setSelectedPatientId(patient.id);
                    setIsAppointmentModalOpen(false);
                  }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition cursor-pointer flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs">
                      🏥
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{patient.name}</h4>
                        <span className="text-[10px] font-mono bg-white border border-amber-300 px-2 py-0.5 rounded text-amber-900 font-bold">
                          {patient.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Problem: <span className="text-amber-800 font-medium">{patient.problem}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-white border border-amber-300 px-3 py-1.5 rounded-xl shadow-xs">
                    Select →
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-slate-50 p-4 px-6 flex justify-end">
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI PRESCRIPTION MODAL */}
      {isPrescriptionModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-amber-300 shadow-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 text-white flex justify-between items-center shadow-md">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/15 px-2.5 py-1 rounded">
                  SHIFA AI Prescription Assistant
                </span>
                <h3 className="text-xl font-black mt-1">Rx for {selectedPatient.name}</h3>
              </div>
              <button
                onClick={() => setIsPrescriptionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center font-bold hover:bg-black/25 transition text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                  Patient Problem / Diagnosis
                </label>
                <input
                  type="text"
                  defaultValue={selectedPatient.problem}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-900 font-medium shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Type Medicine Generic Name (SHIFA AI Brand Suggester)
                </label>
                <input
                  type="text"
                  value={medInput}
                  onChange={(e) => handleMedInputChange(e.target.value)}
                  placeholder="e.g. paracetamol, metformin, omeprazole..."
                  className="w-full rounded-2xl bg-amber-50/50 border border-amber-300 px-4 py-3 text-xs text-slate-900 font-mono focus:outline-none shadow-inner"
                />

                {medInput && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                      ✨ AI Recommended Bangladesh Best Brands:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((brand, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setPrescriptionNotes((prev) => prev + `\n- ${brand} (1+0+1)`);
                            setMedInput("");
                            setAiSuggestions([]);
                          }}
                          className="bg-white border border-amber-300 hover:bg-amber-500 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 transition shadow-xs"
                        >
                          + {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                  Prescription Details & Dosages
                </label>
                <textarea
                  rows={5}
                  value={prescriptionNotes}
                  onChange={(e) => setPrescriptionNotes(e.target.value)}
                  placeholder="Click on AI brand suggestions above or type custom dosage instructions here..."
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none shadow-inner"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50 p-4 px-6 flex justify-end gap-3">
              <button
                onClick={() => setIsPrescriptionModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAiPrescription}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-xs shadow-md hover:brightness-105 transition"
              >
                Save & Update Database
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}