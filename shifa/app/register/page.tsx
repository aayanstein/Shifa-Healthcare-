"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ১. Supabase Auth Sign Up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const patientId =
        "SHF-BD-" + Math.floor(100000 + Math.random() * 900000);

      // ২. Exact Column Names দিয়ে `patients` টেবিলে ডাটা ইনসার্ট
      const { error: profileError } = await supabase
        .from("patients")
        .insert({
          Id: data.user.id, // Auth ID Link
          Full_name: name,
          email: email,
          Phone: phone,
          Patient_id: patientId,
          Blood_group: bloodGroup || null,
          Date_of_Birth: dob || null,
        });

      if (profileError) {
        setMessage(profileError.message);
        setLoading(false);
      } else {
        // ৩. ভেরিফিকেশন ছাড়া সরাসরি ড্যাশবোর্ডে পাঠানো
        router.push("/dashboard");
        router.refresh();
      }
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h1 className="text-3xl font-bold text-blue-700 text-center tracking-tight">
          SHIFA
        </h1>

        <p className="text-center text-slate-500 mt-2 text-sm">
          Create your healthcare account
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arafat Habib"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 transition"
            />
          </div>

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
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="017XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-600 bg-white text-slate-700 text-sm"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-600 text-slate-700 text-sm"
              />
            </div>
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
              minLength={6}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Create SHIFA Account"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium text-center">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}