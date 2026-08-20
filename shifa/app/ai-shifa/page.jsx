"use client";

import { useState } from "react";
import Link from "next/link";

const samplePrompts = {
  bn: [
    "হেই শিফা, কেমন আছো?",
    "আসসালামু আলাইকুম!",
    "আমার Blood Test রিপোর্টের TSH লেভেল বেশি আসার মানে কি?",
    "আমার CBC Blood Panel এর মূল বিষয়গুলো বুঝিয়ে দাও",
    "আমার পেটে সামান্য ব্যথা আর এসিডিটি হলে কি ঘরোয়া ব্যবস্থা নেব?",
    "আমার সর্বশেষ প্রেসক্রিপশনের সারসংক্ষেপ বল",
    "উচ্চ রক্তচাপ (High Blood Pressure) নিয়ন্ত্রণের উপায় কী?",
    "ডায়াবেটিস রোগীদের প্রতিদিনের ডায়েট কেমন হওয়া উচিত?",
    "মাথাব্যথা ও মাইগ্রেনের সমস্যা থেকে মুক্তির সহজ উপায় কি?",
    "শরীরে অতিরিক্ত ক্লান্তি এবং ভিটামিন ডি এর ঘাটতি কেন হয়?",
    "ত্বকের এলার্জি বা র‍্যাশ দূর করার ঘরোয়া উপায় কী?",
    "হজম শক্তি বাড়াতে ও কোষ্ঠকাঠিন্য দূর করতে কী করা উচিত?",
    "বুকের জ্বালাপোড়া ও এসিডিটি দূর করার সঠিক নিয়ম কী?",
    "নিয়মিত ঘুমের সমস্যা বা ইনসোমনিয়া দূর করার উপায় কি?",
    "কোলেস্টেরল লেভেল নিয়ন্ত্রণে রাখার কার্যকরী খাবারগুলো কী?",
    "ওজন কমাতে ডায়েট চার্ট বা সঠিক নিয়ম কি হওয়া উচিত?",
    "ঠান্ডা, সর্দি ও গলা ব্যথা থেকে দ্রুত মুক্তির উপায় কি?",
  ],
  en: [
    "Hey Shifa, how are you?",
    "Hi Shifa!",
    "What does a high TSH level in my blood test mean?",
    "Explain CBC test results in plain English",
    "What home remedies help mild stomach ache and acidity?",
    "Summarize my latest prescription",
    "What are the effective ways to control high blood pressure?",
    "What should a diabetic patient's daily diet look like?",
    "What are simple ways to get relief from headaches and migraines?",
    "Why do chronic fatigue and Vitamin D deficiencies occur?",
    "What are home remedies to cure skin allergies or rashes?",
    "What should be done to improve digestion and relieve constipation?",
    "What is the right way to prevent heartburn and acidity?",
    "How can I overcome sleep disorders or insomnia naturally?",
    "What are the best foods to keep cholesterol levels under control?",
    "What is the ideal diet plan and routine for weight loss?",
    "What are quick remedies for cold, cough, and sore throat?",
  ],
};

const prebuiltAnswers = {
  bn: {
    // Normal / Conversational Q&A
    "হেই শিফা, কেমন আছো?": "ওয়ালাইকুম আসসালাম! আলহামদুলিল্লাহ আমি ভালো আছি। আপনার স্বাস্থ্য সংক্রান্ত যেকোনো প্রয়োজনে আমি প্রস্তুত আছি বলুন, আজ কীভাবে সাহায্য করতে পারি?",
    "হাই শিফা!": "হ্যালো! আমি AI SHIFA। বলুন, আপনার শারীরিক অবস্থা বা কোনো মেডিকেল রিপোর্ট নিয়ে কি জানতে চান?",
    "আসসালামু আলাইকুম!": "ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহ! আমি AI SHIFA, আপনার পার্সোনাল হেলথ কম্প্যানিয়ন। আজ আপনাকে কীভাবে সাহায্য করতে পারি বলুন?",
    "কেমন আছো?": "আলহামদুলিল্লাহ, আমি একদম ঠিক আছি! আপনার শরীর বা স্বাস্থ্য নিয়ে কি কোনো পরামর্শ প্রয়োজন?",
    "ধন্যবাদ": "আপনাকে মোস্ট ওয়েলকাম! আপনার সুস্বাস্থ্য কামনা করি। অন্য কোনো প্রশ্ন থাকলে নির্দ্বিধায় বলতে পারেন।",
    
    // Medical Q&A
    "আমার Blood Test রিপোর্টের TSH লেভেল বেশি আসার মানে কি?": "রক্ত পরীক্ষায় TSH (Thyroid Stimulating Hormone) এর মাত্রা বেশি আসার অর্থ সাধারণত হাইপোথাইরয়েডিজম (Hypothyroidism)। এতে থাইরয়েড গ্রন্থি পর্যাপ্ত হরমোন তৈরি করছে না। বিস্তারিত মূল্যায়নের জন্য একজন এন্ডোক্রিনোলজিস্টের পরামর্শ নেওয়া উচিত।",
    "আমার CBC Blood Panel এর মূল বিষয়গুলো বুঝিয়ে দাও": "CBC বা কমপ্লিট ব্লাড কাউন্টে সাধারণত হিমোগ্লোবিন, ডব্লিউবিসি (WBC) এবং প্লেটলেট পরীক্ষা করা হয়। হিমোগ্লোবিনের মাত্রা কম থাকলে রক্তস্বল্পতা (Anemia) এবং ডব্লিউবিসি বেশি থাকলে ইনফেকশন নির্দেশ করতে পারে।",
    "আমার পেটে সামান্য ব্যথা আর এসিডিটি হলে কি ঘরোয়া ব্যবস্থা নেব?": "সামান্য পেট ব্যথা ও এসিডিটিতে হালকা গরম পানি পান করতে পারেন, অতিরিক্ত তেল-মসলাযুক্ত খাবার এড়িয়ে চলুন এবং আদা চা বা পুদিনা পাতার রস খেতে পারেন। সমস্যা না কমলে চিকিৎসকের শরণাপন্ন হোন।",
    "আমার সর্বশেষ প্রেসক্রিপশনের সারসংক্ষেপ বল": "আপনার সর্বশেষ প্রেসক্রিপশন অনুযায়ী চিকিৎসাপত্রটি পরীক্ষা করা হচ্ছে। এখানে নির্দেশিত ওষুধগুলো নিয়মিত সেবন করুন এবং নির্দিষ্ট সময় পর ফলোআপ করুন।",
    "উচ্চ রক্তচাপ (High Blood Pressure) নিয়ন্ত্রণের উপায় কী?": "উচ্চ রক্তচাপ নিয়ন্ত্রণে খাবারে লবণের পরিমাণ কমাতে হবে, নিয়মিত ৩০ মিনিট হাঁটাহাঁটি বা ব্যায়াম করতে হবে, মানসিক চাপ মুক্ত থাকতে হবে এবং চিকিৎসকের পরামর্শ অনুযায়ী ওষুধ সেবন করতে হবে।",
    "ডায়াবেটিস রোগীদের প্রতিদিনের ডায়েট কেমন হওয়া উচিত?": "ডায়াবেটিস রোগীদের মিষ্টি ও চিনিযুক্ত খাবার সম্পূর্ণ বর্জন করা উচিত। পরিবর্তে ফাইবারসমৃদ্ধ খাবার, শাকসবজি, লাল চালের ভাত এবং পরিমিত পরিমাণে প্রোটিন গ্রহণ করা উচিত।",
    "মাথাব্যথা ও মাইগ্রেনের সমস্যা থেকে মুক্তির সহজ উপায় কি?": "মাথাব্যথা শুরু হলে অন্ধকার ও শান্ত রুমে বিশ্রাম নিতে পারেন। কপালে ঠাণ্ডা প্যাক ব্যবহার করতে পারেন এবং পর্যাপ্ত পানি পান করা জরুরি। অতিরিক্ত ক্যাফেইন বা স্ক্রিনটাইম এড়িয়ে চলুন।",
    "শরীরে অতিরিক্ত ক্লান্তি এবং ভিটামিন ডি এর ঘাটতি কেন হয়?": "পর্যাপ্ত রোদ বা সূর্যের আলো না পাওয়া, পুষ্টিকর খাবারের অভাব এবং ঘুমের অনিয়মের কারণে ভিটামিন ডি এর ঘাটতি ও ক্লান্তি দেখা দিতে পারে। প্রয়োজনে রক্ত পরীক্ষা করে সাপ্লিমেন্ট নেওয়া যেতে পারে।",
    "ত্বকের এলার্জি বা র‍্যাশ দূর করার ঘরোয়া উপায় কী?": "এলার্জি আক্রান্ত স্থানে অ্যালোভেরা জেল বা ঠান্ডা বরফ ব্যবহার করতে পারেন। সুতির ঢিলেঢালা পোশাক পরুন এবং সুগন্ধযুক্ত প্রসাধন থেকে দূরে থাকুন।",
    "হজম শক্তি বাড়াতে ও কোষ্ঠকাঠিন্য দূর করতে কী করা উচিত?": "প্রতিদিন পর্যাপ্ত পরিমাণে পানি পান করুন, সালাদ ও ফাইবারযুক্ত খাবার বেশি খান এবং নিয়মিত হালকা ব্যায়াম বা হাঁটাহাঁটি করুন।",
    "বুকের জ্বালাপোড়া ও এসিডিটি দূর করার সঠিক নিয়ম কী?": "একসাথে অনেক খাবার না খেয়ে অল্প অল্প করে বারবার খান। শোয়ার অন্তত দুই ঘণ্টা আগে রাতের খাবার শেষ করুন এবং অতিরিক্ত চর্বিযুক্ত খাবার এড়িয়ে চলুন।",
    "নিয়মিত ঘুমের সমস্যা বা ইনসোমনিয়া দূর করার উপায় কি?": "ঘুমানোর অন্তত ১ ঘণ্টা আগে মোবাইল বা ল্যাপটপ স্ক্রিন বন্ধ রাখুন। শোবার ঘর অন্ধকার ও শান্ত রাখুন এবং একটি নির্দিষ্ট সময়ে ঘুমাতে যাওয়ার অভ্যাস করুন।",
    "কোলেস্টেরল লেভেল নিয়ন্ত্রণে রাখার কার্যকরী খাবারগুলো কী?": "ওটস, বাদাম, জলপাই তেল, ওমেগা-৩ সমৃদ্ধ মাছ এবং তাজা শাকসবজি খারাপ কোলেস্টেরল (LDL) কমাতে দারুণ কার্যকরী।",
    "ওজন কমাতে ডায়েটচার্ট বা সঠিক নিয়ম কি হওয়া উচিত?": "ফাস্টফুড ও মিষ্টিজাতীয় খাবার বাদ দিয়ে প্রোটিন ও ফাইবার সমৃদ্ধ খাবার খান। ক্যালোরি ডেফিসিট মেইনটেইন করুন এবং প্রতিদিন অন্তত ৩০ মিনিট শারীরিক পরিশ্রম করুন।",
    "ঠান্ডা, সর্দি ও গলা ব্যথা থেকে দ্রুত মুক্তির উপায় কি?": "লবণ পানিতে কুলকুচি করুন, কুসুম গরম পানি ও আদা-লেবুর চা পান করুন এবং বাষ্প (Steam inhalation) নিতে পারেন."
  },
  en: {
    // Normal / Conversational Q&A
    "Hey Shifa, how are you?": "Hello! I am doing great, thank you for asking. How can I assist you with your health or medical records today?",
    "Hi Shifa!": "Hi there! I am AI SHIFA, your health companion. Feel free to ask me anything about your health queries or reports.",
    "Hello": "Hello! How can I help you today?",
    "Thanks": "You're very welcome! Wishing you good health. Let me know if you have any other questions.",

    // Medical Q&A
    "What does a high TSH level in my blood test mean?": "A high TSH (Thyroid Stimulating Hormone) level usually indicates hypothyroidism, meaning your thyroid gland is underactive and not producing enough hormones. Consult an endocrinologist for further evaluation.",
    "Explain CBC test results in plain English": "A Complete Blood Count (CBC) evaluates red blood cells, white blood cells, and platelets. Low hemoglobin can indicate anemia, while elevated white blood cells often point to an infection.",
    "What home remedies help mild stomach ache and acidity?": "For mild stomach ache and acidity, try drinking warm water, avoiding oily or spicy foods, and having ginger tea or peppermint. Consult a doctor if symptoms persist.",
    "Summarize my latest prescription": "Based on your latest attached prescription, please ensure you take all medications precisely as directed by your physician and follow up on the designated date.",
    "What are the effective ways to control high blood pressure?": "To control high blood pressure, reduce dietary sodium, exercise for 30 minutes daily, manage stress levels, and strictly adhere to your prescribed medications.",
    "What should a diabetic patient's daily diet look like?": "Diabetic patients should avoid sugary and processed foods. Focus on high-fiber foods, fresh vegetables, whole grains, and lean proteins.",
    "What are simple ways to get relief from headaches and migraines?": "Rest in a quiet, dark room, apply a cold compress to your forehead, stay well hydrated, and limit excessive screen time or caffeine.",
    "Why do chronic fatigue and Vitamin D deficiencies occur?": "Fatigue and Vitamin D deficiencies often result from lack of sunlight exposure, poor nutrition, and irregular sleep cycles. A blood test can determine if supplements are needed.",
    "What are home remedies to cure skin allergies or rashes?": "Apply pure aloe vera gel or a cool compress to the affected area. Wear loose cotton clothing and avoid harsh scented soaps or lotions.",
    "What should be done to improve digestion and relieve constipation?": "Increase your daily water intake, consume high-fiber foods like fruits and vegetables, and incorporate daily walking or light exercise.",
    "What is the right way to prevent heartburn and acidity?": "Eat smaller, more frequent meals instead of heavy ones. Avoid lying down immediately after eating and steer clear of fatty or fried foods.",
    "How can I overcome sleep disorders or insomnia naturally?": "Turn off screens at least an hour before bedtime, keep your bedroom dark and quiet, and maintain a consistent sleep schedule.",
    "What are the best foods to keep cholesterol levels under control?": "Incorporate oats, nuts, olive oil, fatty fish rich in omega-3, and fresh leafy greens to help manage bad cholesterol (LDL).",
    "What is the ideal diet plan and routine for weight loss?": "Maintain a healthy calorie deficit by cutting out junk food and sugar, eating more protein and fiber, and exercising for at least 30 minutes daily.",
    "What are quick remedies for cold, cough, and sore throat?": "Gargle with warm salt water, drink warm herbal tea with honey and lemon, and try steam inhalation to clear nasal congestion."
  }
};

const localizedTexts = {
  bn: {
    back: "← ড্যাশবোর্ডে ফিরুন",
    tag: "✦ এআই অ্যাসিস্ট্যান্ট",
    title: "AI SHIFA",
    subTitle: "আপনার প্রশ্নের সঠিক উত্তর দিতে প্রয়োজনীয় মেডিকেল রেকর্ড সিলেক্ট করুন।",
    attachedTitle: "যুক্ত থাকা মেডিকেল রেকর্ড",
    disclaimer: "🔒 AI SHIFA আপনার ডেটা নিরাপদে মূল্যায়ন করে। প্রদত্ত তথ্য সরাসরি চিকিৎসকের পরামর্শের বিকল্প নয়।",
    headerTitle: "AI SHIFA হেলথ কম্প্যানিয়ন",
    headerSub: "বাংলা ও ইংরেজি মেডিকেল ইন্টেলিজেন্স",
    active: "সক্রিয়",
    placeholder: "AI SHIFA-কে কিছু জিজ্ঞেস করুন (যেমন: হেই শিফা)...",
    suggestionsLabel: "পরামর্শ ও সাধারণ প্রশ্নসমূহ:",
    welcomeMsg: "আসসালামু আলাইকুম! আমি AI SHIFA। আপনার যেকোনো শারীরিক সমস্যা বা মেডিকেল টেস্টের রিপোর্ট সহজ ভাষায় ব্যাখ্যা করতে সাহায্য করার জন্য আমি আছি। নিচের সাজেশানগুলো থেকে বেছে নিতে পারেন অথবা সরাসরি প্রশ্ন করুন।",
  },
  en: {
    back: "← Back to Dashboard",
    tag: "✦ AI Assistant",
    title: "AI SHIFA",
    subTitle: "Select medical records to give AI context for your questions.",
    attachedTitle: "Attached Records Context",
    disclaimer: "🔒 AI SHIFA system evaluates records securely. Information generated does not substitute for clinical medical evaluation.",
    headerTitle: "AI SHIFA Health Companion",
    headerSub: "Bangla & English Medical Intelligence",
    active: "Active",
    placeholder: "Ask AI SHIFA (e.g. Hey Shifa)...",
    suggestionsLabel: "Suggestions & Common Queries:",
    welcomeMsg: "Hello! I am AI SHIFA, your personal health companion. I can help explain your medical reports and health queries in simple terms. Choose from the suggestions below or ask directly.",
  },
};

export default function AiShifaChat() {
  const [selectedLang, setSelectedLang] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const [activeReports, setActiveReports] = useState([
    { id: 1, title: "CBC Blood Panel", date: "12 Feb 2026", selected: true },
    { id: 2, title: "Thyroid Profile (TSH)", date: "05 Jan 2026", selected: false },
    { id: 3, title: "Prescription — Dr. Mahmudul", date: "20 Dec 2025", selected: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState("");
  const [newReportDate, setNewReportDate] = useState("");

  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    setMessages([
      {
        sender: "ai",
        text: localizedTexts[lang].welcomeMsg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const toggleReport = (id) => {
    setActiveReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      sender: "user",
      text: query,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    setTimeout(() => {
      let responseText = "";
      const langAnswers = prebuiltAnswers[selectedLang];

      // Flexible matching (case-insensitive check for greetings)
      const matchedKey = Object.keys(langAnswers).find(
        (key) => key.toLowerCase() === query.trim().toLowerCase()
      );

      if (matchedKey) {
        responseText = langAnswers[matchedKey];
      } else {
        responseText = selectedLang === "bn" 
          ? `আপনার কথাটি ("${query}") বুঝতে পেরেছি। এটি একটি সাধারণ বিষয়। এ বিষয়ে বিস্তারিত জানতে বা অন্য কোনো স্বাস্থ্যগত জিজ্ঞাসা থাকলে বলতে পারেন।`
          : `I understand your query ("${query}"). If you have any specific health concerns or report details, please let me know.`;
      }

      const aiReply = {
        sender: "ai",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const renderFormattedText = (text) => {
    return text.split("\n").map((line, idx) => {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

      return (
        <span
          key={idx}
          dangerouslySetInnerHTML={{ __html: formattedLine }}
          className="block min-h-[1.2rem]"
        />
      );
    });
  };

  if (!selectedLang) {
    return (
      <div className="relative flex h-screen items-center justify-center bg-[#070e18] p-4 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Link
          href="/dashboard"
          className="absolute top-6 left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 shadow-sm hover:bg-white/10 hover:text-white transition"
        >
          ← Back to Dashboard
        </Link>

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d1729] p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl text-white font-bold shadow-lg shadow-indigo-600/30 ring-4 ring-white/10">
            ✦
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome to AI SHIFA</h1>
          <p className="mt-2 text-sm text-slate-400">
            Please select your preferred language to start the conversation.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => handleSelectLanguage("bn")}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#070e18] p-4 text-left font-semibold text-slate-200 hover:border-indigo-500 hover:bg-indigo-600/10 hover:text-white transition cursor-pointer shadow-inner"
            >
              <div>
                <p className="text-base font-bold">বাংলা</p>
                <p className="text-xs text-slate-400">বাংলায় কথোপকথন করুন</p>
              </div>
              <span className="text-xl text-indigo-400">➔</span>
            </button>

            <button
              onClick={() => handleSelectLanguage("en")}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#070e18] p-4 text-left font-semibold text-slate-200 hover:border-indigo-500 hover:bg-indigo-600/10 hover:text-white transition cursor-pointer shadow-inner"
            >
              <div>
                <p className="text-base font-bold">English</p>
                <p className="text-xs text-slate-400 font-normal">Chat in English</p>
              </div>
              <span className="text-xl text-indigo-400">➔</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const t = localizedTexts[selectedLang];

  return (
    <div className="flex h-screen bg-[#070e18] text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white relative">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-80 flex-col border-r border-white/10 bg-[#0a1322] p-6 justify-between">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Link href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-indigo-400 transition">
              {t.back}
            </Link>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400">
              {t.tag}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">{t.title}</h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.subTitle}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {t.attachedTitle}
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400 hover:bg-indigo-500/20 transition cursor-pointer"
              >
                + Add New
              </button>
            </div>

            <div className="space-y-2.5 max-h-[calc(100vh-340px)] overflow-y-auto pr-1">
              {activeReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => toggleReport(report.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-xs transition ${
                    report.selected
                      ? "border-indigo-500/40 bg-indigo-600/15 text-white shadow-inner"
                      : "border-white/5 bg-[#070e18] text-slate-400 hover:border-white/15 hover:text-slate-200"
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-200">{report.title}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{report.date}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={report.selected}
                    readOnly
                    className="h-4 w-4 rounded border-slate-700 bg-[#070e18] text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-[11px] leading-relaxed text-slate-400">
          {t.disclaimer}
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWER */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm md:hidden">
          <div className="w-85 max-w-[85%] flex flex-col bg-[#0a1322] p-6 justify-between h-full border-r border-white/10">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Link href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-indigo-400 transition">
                  {t.back}
                </Link>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white"
                >
                  ✕ Close
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">{t.title}</h2>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.subTitle}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t.attachedTitle}
                  </h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {activeReports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => toggleReport(report.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-xs transition ${
                        report.selected
                          ? "border-indigo-500/40 bg-indigo-600/15 text-white shadow-inner"
                          : "border-white/5 bg-[#070e18] text-slate-400"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-200">{report.title}</p>
                        <p className="mt-0.5 text-[10px] text-slate-500">{report.date}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={report.selected}
                        readOnly
                        className="h-4 w-4 rounded border-slate-700 bg-[#070e18] text-indigo-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[11px] leading-relaxed text-slate-400">
              {t.disclaimer}
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMobileSidebar(false)}></div>
        </div>
      )}

      {/* CHAT MAIN CONTAINER */}
      <main className="flex flex-1 flex-col bg-[#070e18] relative h-full">
        {/* HEADER */}
        <header className="flex h-[76px] items-center justify-between border-b border-white/10 bg-[#070e18]/80 px-4 sm:px-6 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400"
              title="Open Reports"
            >
              📂
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30">
              ✦
            </div>
            <div>
              <h1 className="font-bold text-white text-xs sm:text-base">{t.headerTitle}</h1>
              <p className="text-[10px] sm:text-[11px] text-slate-400">{t.headerSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSelectedLang(null)}
              className="rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
            >
              🌐 {selectedLang === "bn" ? "বাংলা" : "English"}
            </button>
          </div>
        </header>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 lg:px-12">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed shadow-xl border ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-white/20 rounded-br-none"
                    : "border-white/10 bg-[#0d1729] text-slate-200 rounded-bl-none"
                }`}
              >
                <div>{renderFormattedText(msg.text)}</div>
                <div
                  className={`mt-2 text-right text-[10px] ${
                    msg.sender === "user" ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUGGESTIONS & INPUT AREA */}
        <div className="border-t border-white/10 bg-[#0a1322] p-3 sm:p-4 lg:px-12 backdrop-blur-xl shrink-0">
          <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="shrink-0 font-bold text-slate-400">{t.suggestionsLabel}</span>
            {samplePrompts[selectedLang].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 rounded-full border border-white/10 bg-[#070e18] px-3.5 py-1.5 text-slate-300 hover:border-indigo-500/40 hover:bg-indigo-600/20 hover:text-indigo-300 transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#070e18] p-2 focus-within:border-indigo-500 shadow-inner transition"
          >
            <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-indigo-400 transition shrink-0" title="Upload Report / PDF">
              📎
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setInput((prev) => prev + ` [Attached File: ${file.name}]`);
                  }
                }}
              />
            </label>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 border-none bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500 min-w-0"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition shrink-0 cursor-pointer"
            >
              ➔
            </button>
          </form>
        </div>
      </main>

      {/* ADD REPORT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0d1729] p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white">Add New Medical Report</h3>
            <p className="mt-1 text-xs text-slate-400">Enter the title and date of your report.</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Report Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lipid Profile, X-Ray Report"
                  value={newReportTitle}
                  onChange={(e) => setNewReportTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#070e18] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Date</label>
                <input
                  type="text"
                  placeholder="e.g. 15 Aug 2026"
                  value={newReportDate}
                  onChange={(e) => setNewReportDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#070e18] px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newReportTitle.trim()) return;
                  const newReport = {
                    id: Date.now(),
                    title: newReportTitle,
                    date: newReportDate || "Today",
                    selected: true,
                  };
                  setActiveReports((prev) => [...prev, newReport]);
                  setNewReportTitle("");
                  setNewReportDate("");
                  setShowAddModal(false);
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-blue-500 hover:to-indigo-500 transition cursor-pointer"
              >
                Save & Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}