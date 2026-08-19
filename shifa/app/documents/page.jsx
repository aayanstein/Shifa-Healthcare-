"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Initial documents data
const initialDocuments = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    category: "Lab Report",
    date: "2026-02-12",
    facility: "Popular Diagnostic Centre",
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Endocrinology Prescription",
    category: "Prescription",
    date: "2025-12-20",
    facility: "Square Hospital, Dhaka",
    fileSize: "850 KB",
    fileType: "JPG",
  },
  {
    id: 3,
    title: "Thyroid Function Test",
    category: "Lab Report",
    date: "2025-11-05",
    facility: "Rajshahi Medical Centre",
    fileSize: "2.1 MB",
    fileType: "PDF",
  },
];

// Pure SVG Icon components
const Icons = {
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  ),
  Upload: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  FileCheck: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ArrowLeft: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Lab Report",
    facility: "",
    date: "",
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !selectedFile) {
      alert("Please provide a document title and select a file.");
      return;
    }

    const newDoc = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      date: formData.date || new Date().toISOString().split("T")[0],
      facility: formData.facility || "Independent Upload",
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      fileType: selectedFile.name.split(".").pop().toUpperCase(),
    };

    setDocuments([newDoc, ...documents]);
    setFormData({ title: "", category: "Lab Report", facility: "", date: "" });
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#10233f]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-slate-200/70 bg-white/80 px-6 backdrop-blur lg:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#10233f]">Medical Documents</h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Upload and manage your medical reports and prescriptions securely.
            </p>
          </div>
        </div>

        <Link
          href="/ai-shifa"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:opacity-95"
        >
          <Icons.Sparkles className="h-4 w-4 text-amber-300" />
          <span>Analyze with AI</span>
        </Link>
      </header>

      {/* CONTENT AREA */}
      <main className="mx-auto max-w-7xl p-6 space-y-8 lg:p-10">
        {/* UPLOAD FORM */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#10233f]">Upload New Medical Record</h2>
          <p className="mt-1 text-xs text-slate-400">
            Supported formats: PDF, PNG, JPG (Max size: 10MB)
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* DRAG & DROP AREA */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all ${
                dragActive
                  ? "border-blue-600 bg-blue-50/50"
                  : selectedFile
                  ? "border-emerald-500 bg-emerald-50/30"
                  : "border-slate-300 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                {selectedFile ? (
                  <Icons.FileCheck className="h-6 w-6 text-emerald-600" />
                ) : (
                  <Icons.Upload className="h-6 w-6" />
                )}
              </div>

              {selectedFile ? (
                <div className="mt-3 text-center">
                  <p className="text-sm font-bold text-emerald-700">
                    Selected File: {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    Drag and drop your file here, or{" "}
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer font-bold text-blue-600 hover:underline"
                    >
                      browse
                    </label>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">PDF, JPG or PNG format</p>
                </div>
              )}
            </div>

            {/* INPUT FIELDS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs font-bold text-slate-600">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Blood Test Report"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                >
                  <option value="Lab Report">Lab Report</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="X-Ray / Scan">X-Ray / Scan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600">Hospital / Clinic</label>
                <input
                  type="text"
                  placeholder="e.g., Popular Diagnostic"
                  value={formData.facility}
                  onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600">Date of Report</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#1d5bd8] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#164cb8] transition"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>

        {/* DOCUMENTS LIST */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#10233f] mb-4">Saved Documents</h2>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-[#f8fbff] p-4 transition hover:border-blue-200 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-xs text-blue-700 shrink-0">
                    {doc.fileType}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#10233f] text-sm">{doc.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {doc.facility} • {doc.date} • {doc.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {doc.category}
                  </span>
                  <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                    Download
                  </button>
                  <Link
                    href="/ai-shifa"
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-500/20 transition"
                  >
                    <Icons.Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    <span>Ask AI</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}