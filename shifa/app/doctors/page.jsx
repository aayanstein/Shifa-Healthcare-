"use client";

import { useState } from "react";
import Link from "next/link";

const allDoctors = [
  // Dhaka Doctors (1-15)
  {
    id: 1,
    name: "Dr. Mahmudul Rahman",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, FCPS (Medicine), DEM",
    experience: "12 years experience",
    location: "Square Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,200",
    phone: "+880 1711-223344",
    availability: "Today, 4:30 PM",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Dr. Farhana Yasmin",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS (OBGYN)",
    experience: "11 years experience",
    location: "Popular Diagnostic Centre, Dhaka",
    city: "Dhaka",
    fee: "৳1,200",
    phone: "+880 1712-334455",
    availability: "Mon, 18 Aug",
    rating: "4.7",
  },
  {
    id: 3,
    name: "Dr. Ahmedul Kabir",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology), FACC",
    experience: "16 years experience",
    location: "United Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,500",
    phone: "+880 1713-445566",
    availability: "Today, 5:00 PM",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Dr. Nazmul Hossain",
    specialty: "Neurology",
    qualification: "MBBS, FCPS (Neurology)",
    experience: "14 years experience",
    location: "Labaid Specialized Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,400",
    phone: "+880 1714-556677",
    availability: "Tomorrow, 11:00 AM",
    rating: "4.8",
  },
  {
    id: 5,
    name: "Dr. Sharmin Sultana",
    specialty: "General Physician",
    qualification: "MBBS, PGT (Medicine)",
    experience: "8 years experience",
    location: "Evercare Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,000",
    phone: "+880 1715-667788",
    availability: "Today, 3:00 PM",
    rating: "4.7",
  },
  {
    id: 6,
    name: "Dr. ABM Abdullah",
    specialty: "General Physician",
    qualification: "MBBS, MRCP, FRCP",
    experience: "25 years experience",
    location: "Central Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳2,000",
    phone: "+880 1716-778899",
    availability: "Today, 6:00 PM",
    rating: "5.0",
  },
  {
    id: 7,
    name: "Dr. Kanak Kanti Barua",
    specialty: "Neurology",
    qualification: "MBBS, MS, FCPS",
    experience: "22 years experience",
    location: "Green Life Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,800",
    phone: "+880 1717-889900",
    availability: "Tomorrow, 4:00 PM",
    rating: "4.9",
  },
  {
    id: 8,
    name: "Dr. Tripti Rani Das",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS, MS",
    experience: "15 years experience",
    location: "Ibn Sina Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,100",
    phone: "+880 1718-990011",
    availability: "Today, 2:30 PM",
    rating: "4.8",
  },
  {
    id: 9,
    name: "Dr. Monzur Hossain",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "13 years experience",
    location: "National Heart Foundation, Dhaka",
    city: "Dhaka",
    fee: "৳1,200",
    phone: "+880 1719-001122",
    availability: "Sat, 22 Aug",
    rating: "4.8",
  },
  {
    id: 10,
    name: "Dr. Ridwanur Rahman",
    specialty: "General Physician",
    qualification: "MBBS, FCPS, FRCP",
    experience: "20 years experience",
    location: "Anwer Khan Modern Medical College, Dhaka",
    city: "Dhaka",
    fee: "৳1,500",
    phone: "+880 1720-112233",
    availability: "Today, 4:00 PM",
    rating: "4.9",
  },
  {
    id: 11,
    name: "Dr. Samina Chowdhury",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS, MRCOG",
    experience: "19 years experience",
    location: "Square Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,600",
    phone: "+880 1721-223344",
    availability: "Tomorrow, 5:00 PM",
    rating: "5.0",
  },
  {
    id: 12,
    name: "Dr. M. A. Wahab",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, MD (Endocrinology)",
    experience: "17 years experience",
    location: "BIRDEM General Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,400",
    phone: "+880 1722-334455",
    availability: "Today, 6:30 PM",
    rating: "4.9",
  },
  {
    id: 13,
    name: "Dr. Quazi Deen Mohammad",
    specialty: "Neurology",
    qualification: "MBBS, FCPS, MD",
    experience: "28 years experience",
    location: "Dhaka Medical College / Private Chamber, Dhaka",
    city: "Dhaka",
    fee: "৳2,000",
    phone: "+880 1723-445566",
    availability: "Fri, 25 Aug",
    rating: "5.0",
  },
  {
    id: 14,
    name: "Dr. Lutful Kader",
    specialty: "Cardiology",
    qualification: "MBBS, MD, FESC",
    experience: "14 years experience",
    location: "Labaid Cardiac Hospital, Dhaka",
    city: "Dhaka",
    fee: "৳1,300",
    phone: "+880 1724-556677",
    availability: "Today, 3:30 PM",
    rating: "4.7",
  },
  {
    id: 15,
    name: "Dr. Nusrat Sultana",
    specialty: "General Physician",
    qualification: "MBBS, PGT (Internal Medicine)",
    experience: "7 years experience",
    location: "Popular Diagnostic, Dhanmondi, Dhaka",
    city: "Dhaka",
    fee: "৳900",
    phone: "+880 1725-667788",
    availability: "Today, 1:00 PM",
    rating: "4.6",
  },

  // Rajshahi Doctors (16-30)
  {
    id: 16,
    name: "Dr. Nusrat Ahmed",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "9 years experience",
    location: "Rajshahi Medical Centre",
    city: "Rajshahi",
    fee: "৳1,000",
    phone: "+880 1811-112233",
    availability: "Tomorrow, 10:00 AM",
    rating: "4.8",
  },
  {
    id: 17,
    name: "Dr. Kamrul Islam",
    specialty: "General Physician",
    qualification: "MBBS, CCD (BIRDEM)",
    experience: "15 years experience",
    location: "SHIFA Partner Clinic, Rajshahi",
    city: "Rajshahi",
    fee: "৳800",
    phone: "+880 1812-223344",
    availability: "Today, 6:00 PM",
    rating: "4.9",
  },
  {
    id: 18,
    name: "Dr. Mst. Anjuman Ara",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS (OBGYN)",
    experience: "13 years experience",
    location: "Islami Bank Hospital, Rajshahi",
    city: "Rajshahi",
    fee: "৳900",
    phone: "+880 1813-334455",
    availability: "Today, 7:00 PM",
    rating: "4.8",
  },
  {
    id: 19,
    name: "Dr. Rafiqul Islam",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, DEM (BIRDEM)",
    experience: "10 years experience",
    location: "Amanulla Hospital, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,000",
    phone: "+880 1814-445566",
    availability: "Sat, 22 Aug",
    rating: "4.7",
  },
  {
    id: 20,
    name: "Dr. Zillur Rahman",
    specialty: "Neurology",
    qualification: "MBBS, FCPS (Medicine), MD (Neurology)",
    experience: "12 years experience",
    location: "Popular Diagnostic Centre, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,200",
    phone: "+880 1815-556677",
    availability: "Today, 5:00 PM",
    rating: "4.9",
  },
  {
    id: 21,
    name: "Dr. Sayedur Rahman",
    specialty: "General Physician",
    qualification: "MBBS, FCPS",
    experience: "18 years experience",
    location: "Rajshahi Royal Hospital",
    city: "Rajshahi",
    fee: "৳900",
    phone: "+880 1816-667788",
    availability: "Tomorrow, 11:00 AM",
    rating: "4.8",
  },
  {
    id: 22,
    name: "Dr. Sultana Razia",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, DGO, FCPS",
    experience: "14 years experience",
    location: "Labaid Diagnostic, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,000",
    phone: "+880 1817-778899",
    availability: "Today, 4:00 PM",
    rating: "4.7",
  },
  {
    id: 23,
    name: "Dr. Hasibul Hasan",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "10 years experience",
    location: "Upashahar Medicare, Rajshahi",
    city: "Rajshahi",
    fee: "৳900",
    phone: "+880 1818-889900",
    availability: "Sun, 23 Aug",
    rating: "4.8",
  },
  {
    id: 24,
    name: "Dr. Nazmul Huda",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, MRCP (UK)",
    experience: "11 years experience",
    location: "City Hospital, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,100",
    phone: "+880 1819-990011",
    availability: "Today, 8:00 PM",
    rating: "4.9",
  },
  {
    id: 25,
    name: "Dr. Mahbubur Rahman",
    specialty: "Neurology",
    qualification: "MBBS, MD (Neurology)",
    experience: "13 years experience",
    location: "Amanulla Hospital, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,200",
    phone: "+880 1820-001122",
    availability: "Tomorrow, 3:00 PM",
    rating: "4.8",
  },
  {
    id: 26,
    name: "Dr. Farida Yeasmin",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, MS (OBGYN)",
    experience: "16 years experience",
    location: "Rajshahi Medical Centre",
    city: "Rajshahi",
    fee: "৳1,100",
    phone: "+880 1821-112233",
    availability: "Today, 5:30 PM",
    rating: "4.9",
  },
  {
    id: 27,
    name: "Dr. Zahurul Islam",
    specialty: "General Physician",
    qualification: "MBBS, FCPS (Medicine)",
    experience: "21 years experience",
    location: "Islami Bank Hospital, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,000",
    phone: "+880 1822-223344",
    availability: "Today, 4:30 PM",
    rating: "4.9",
  },
  {
    id: 28,
    name: "Dr. Ashraful Alam",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12 years experience",
    location: "Popular Diagnostic Centre, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,200",
    phone: "+880 1823-334455",
    availability: "Sat, 22 Aug",
    rating: "4.8",
  },
  {
    id: 29,
    name: "Dr. Dilruba Nasrin",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, DEM",
    experience: "9 years experience",
    location: "Labaid Diagnostic, Rajshahi",
    city: "Rajshahi",
    fee: "৳1,000",
    phone: "+880 1824-445566",
    availability: "Tomorrow, 11:30 AM",
    rating: "4.7",
  },
  {
    id: 30,
    name: "Dr. Khairul Bashar",
    specialty: "General Physician",
    qualification: "MBBS, PGT, CCD",
    experience: "14 years experience",
    location: "Padma Diagnostic, Rajshahi",
    city: "Rajshahi",
    fee: "৳800",
    phone: "+880 1825-556677",
    availability: "Today, 2:00 PM",
    rating: "4.6",
  },

  // Rangpur Doctors (31-40)
  {
    id: 31,
    name: "Dr. Abu Bakar Siddique",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12 years experience",
    location: "Prime Medical College & Hospital, Rangpur",
    city: "Rangpur",
    fee: "৳1,000",
    phone: "+880 1911-123456",
    availability: "Today, 4:00 PM",
    rating: "4.8",
  },
  {
    id: 32,
    name: "Dr. Nazmun Nahar",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, MS (OBGYN)",
    experience: "10 years experience",
    location: "Cms Hospital, Rangpur",
    city: "Rangpur",
    fee: "৳800",
    phone: "+880 1912-234567",
    availability: "Tomorrow, 3:00 PM",
    rating: "4.7",
  },
  {
    id: 33,
    name: "Dr. Golam Rabbani",
    specialty: "General Physician",
    qualification: "MBBS, FCPS (Medicine)",
    experience: "14 years experience",
    location: "Rangpur Community Medical College",
    city: "Rangpur",
    fee: "৳900",
    phone: "+880 1913-345678",
    availability: "Today, 5:30 PM",
    rating: "4.9",
  },
  {
    id: 34,
    name: "Dr. Mofakkharul Islam",
    specialty: "Neurology",
    qualification: "MBBS, MD (Neurology)",
    experience: "9 years experience",
    location: "Doctors Clinic, Rangpur",
    city: "Rangpur",
    fee: "৳1,100",
    phone: "+880 1914-456789",
    availability: "Sat, 22 Aug",
    rating: "4.8",
  },
  {
    id: 35,
    name: "Dr. Shamim Ara",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, DEM",
    experience: "8 years experience",
    location: "Popular Diagnostic Centre, Rangpur",
    city: "Rangpur",
    fee: "৳900",
    phone: "+880 1915-567890",
    availability: "Today, 3:30 PM",
    rating: "4.7",
  },
  {
    id: 36,
    name: "Dr. Rezaul Karim",
    specialty: "General Physician",
    qualification: "MBBS, PGT",
    experience: "12 years experience",
    location: "Rangpur Sadar Hospital Road Clinic",
    city: "Rangpur",
    fee: "৳700",
    phone: "+880 1916-678901",
    availability: "Tomorrow, 10:00 AM",
    rating: "4.6",
  },
  {
    id: 37,
    name: "Dr. Shah Alam",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "15 years experience",
    location: "Prime Medical College, Rangpur",
    city: "Rangpur",
    fee: "৳1,100",
    phone: "+880 1917-789012",
    availability: "Today, 6:00 PM",
    rating: "4.9",
  },
  {
    id: 38,
    name: "Dr. Mahfuza Khatun",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS",
    experience: "13 years experience",
    location: "Rangpur Clinic, Rangpur",
    city: "Rangpur",
    fee: "৳900",
    phone: "+880 1918-890123",
    availability: "Today, 5:00 PM",
    rating: "4.8",
  },
  {
    id: 39,
    name: "Dr. Anwar Hossain",
    specialty: "Neurology",
    qualification: "MBBS, FCPS (Medicine)",
    experience: "11 years experience",
    location: "Popular Diagnostic, Rangpur",
    city: "Rangpur",
    fee: "৳1,000",
    phone: "+880 1919-901234",
    availability: "Tomorrow, 2:00 PM",
    rating: "4.7",
  },
  {
    id: 40,
    name: "Dr. Selim Aktar",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, CCD",
    experience: "10 years experience",
    location: "Modern Hospital, Rangpur",
    city: "Rangpur",
    fee: "৳850",
    phone: "+880 1920-012345",
    availability: "Sat, 22 Aug",
    rating: "4.8",
  },

  // Chittagong Doctors (41-50)
  {
    id: 41,
    name: "Dr. Mohammed Ali",
    specialty: "Neurology",
    qualification: "MBBS, FCPS, MRCP (UK)",
    experience: "18 years experience",
    location: "Chevron Clinical Laboratory, Chittagong",
    city: "Chittagong",
    fee: "৳1,500",
    phone: "+880 1511-112233",
    availability: "Tomorrow, 12:00 PM",
    rating: "5.0",
  },
  {
    id: 42,
    name: "Dr. Taslima Begum",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, FCPS (OBGYN)",
    experience: "15 years experience",
    location: "Parkview Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳1,200",
    phone: "+880 1512-223344",
    availability: "Today, 6:30 PM",
    rating: "4.9",
  },
  {
    id: 43,
    name: "Dr. Shahriar Hossain",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "11 years experience",
    location: "Max Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳1,300",
    phone: "+880 1513-334455",
    availability: "Sat, 22 Aug",
    rating: "4.8",
  },
  {
    id: 44,
    name: "Dr. Anowarul Azim",
    specialty: "General Physician",
    qualification: "MBBS, FCPS (Medicine)",
    experience: "16 years experience",
    location: "CSCR Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳1,000",
    phone: "+880 1514-445566",
    availability: "Today, 5:00 PM",
    rating: "4.9",
  },
  {
    id: 45,
    name: "Dr. Farzana Chowdhury",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, DEM, MD",
    experience: "10 years experience",
    location: "Epic Healthcare, Chittagong",
    city: "Chittagong",
    fee: "৳1,200",
    phone: "+880 1515-556677",
    availability: "Tomorrow, 2:00 PM",
    rating: "4.8",
  },
  {
    id: 46,
    name: "Dr. M. A. Faiz",
    specialty: "General Physician",
    qualification: "MBBS, FRCP, PhD",
    experience: "30 years experience",
    location: "Imperial Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳2,500",
    phone: "+880 1516-667788",
    availability: "Sun, 23 Aug",
    rating: "5.0",
  },
  {
    id: 47,
    name: "Dr. Belayet Hossain",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "14 years experience",
    location: "National Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳1,400",
    phone: "+880 1517-778899",
    availability: "Today, 4:00 PM",
    rating: "4.9",
  },
  {
    id: 48,
    name: "Dr. Jesmin Sultana",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, MS, FCPS",
    experience: "12 years experience",
    location: "Chevron Clinical Laboratory, Chittagong",
    city: "Chittagong",
    fee: "৳1,100",
    phone: "+880 1518-889900",
    availability: "Tomorrow, 11:00 AM",
    rating: "4.8",
  },
  {
    id: 49,
    name: "Dr. Iftekhar Mahmud",
    specialty: "Neurology",
    qualification: "MBBS, MD (Neurology)",
    experience: "13 years experience",
    location: "Parkview Hospital, Chittagong",
    city: "Chittagong",
    fee: "৳1,400",
    phone: "+880 1519-990011",
    availability: "Today, 7:00 PM",
    rating: "4.9",
  },
  {
    id: 50,
    name: "Dr. Nazneen Akhter",
    specialty: "Endocrinology & Diabetes",
    qualification: "MBBS, DEM (BIRDEM)",
    experience: "9 years experience",
    location: "Mehedibag Diagnostic, Chittagong",
    city: "Chittagong",
    fee: "৳1,000",
    phone: "+880 1520-001122",
    availability: "Sat, 22 Aug",
    rating: "4.7",
  },
];

const specialties = [
  "All Specialties",
  "General Physician",
  "Endocrinology & Diabetes",
  "Cardiology",
  "Gynecology & Obstetrics",
  "Neurology",
];

const cities = ["All Cities", "Dhaka", "Rajshahi", "Rangpur", "Chittagong"];

export default function FindDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  
  // AI Shifa States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [lang, setLang] = useState("bn"); // 'bn' for Bengali, 'en' for English
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "হ্যালো! আমি AI Shifa। আপনার সমস্যা এবং লোকেশন (যেমন: ঢাকা, রাজশাহী, রংপুর বা চট্টগ্রাম) উল্লেখ করুন, আমি সেরা ডাক্তারের পরামর্শ দেবো। / Hello! I am AI Shifa. Mention your health problem and location, and I will recommend the best doctor.",
    },
  ]);

  const filteredDoctors = allDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.phone.includes(searchTerm);

    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doc.specialty === selectedSpecialty;

    const matchesCity =
      selectedCity === "All Cities" || doc.city === selectedCity;

    return matchesSearch && matchesSpecialty && matchesCity;
  });

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMsgs = [...messages, { sender: "user", text: userText }];
    setMessages(newMsgs);
    setChatInput("");

    setTimeout(() => {
      const lower = userText.toLowerCase();
      
      // Detect City from text
      let foundCity = "";
      if (lower.includes("dhaka") || lower.includes("ঢাকা")) foundCity = "Dhaka";
      else if (lower.includes("rajshahi") || lower.includes("রাজশাহী")) foundCity = "Rajshahi";
      else if (lower.includes("rangpur") || lower.includes("রংপুর")) foundCity = "Rangpur";
      else if (lower.includes("chittagong") || lower.includes("chtg") || lower.includes("চট্টগ্রাম")) foundCity = "Chittagong";

      // Match Specialization based on keywords
      let targetSpec = "General Physician";
      if (lower.includes("heart") || lower.includes("chest") || lower.includes("বুক") || lower.includes("বুকের ব্যথা") || lower.includes("হার্ট")) {
        targetSpec = "Cardiology";
      } else if (lower.includes("sugar") || lower.includes("diabetes") || lower.includes("ডায়াবেটিস") || lower.includes("হরমোন")) {
        targetSpec = "Endocrinology & Diabetes";
      } else if (lower.includes("head") || lower.includes("brain") || lower.includes("মাথা") || lower.includes("স্নায়ু") || lower.includes("neurology")) {
        targetSpec = "Neurology";
      } else if (lower.includes("gynae") || lower.includes("pregnancy") || lower.includes("গাইনি") || lower.includes("গর্ভবতী")) {
        targetSpec = "Gynecology & Obstetrics";
      }

      // Filter doctors matching city and specialty
      let matched = allDoctors.filter(doc => doc.specialty === targetSpec);
      if (foundCity) {
        const citySpecific = matched.filter(doc => doc.city.toLowerCase() === foundCity.toLowerCase());
        if (citySpecific.length > 0) matched = citySpecific;
      }

      let reply = "";
      if (lang === "bn") {
        reply = `আপনার লক্ষণ ও সমস্যা অনুযায়ী একজন **${targetSpec}** বিশেষজ্ঞ দেখানো উচিত। `;
        if (foundCity) reply += `(${foundCity} অঞ্চলের সেরা ডাক্তারগণ):\n\n`;
        else reply += `(নির্দিষ্ট কোনো শহরের নাম বলেননি, তাই কিছু সেরা ডাক্তারের তালিকা দেওয়া হলো):\n\n`;
      } else {
        reply = `Based on your symptoms, you should consult a **${targetSpec}** specialist. `;
        if (foundCity) reply += `(Top doctors in ${foundCity}):\n\n`;
        else reply += `(No city specified, here are some top recommendations):\n\n`;
      }

      matched.slice(0, 3).forEach(doc => {
        reply += `• **${doc.name}** (${doc.qualification})\n  📍 ${doc.location}\n  📞 Contact: ${doc.phone} | Fee: ${doc.fee}\n\n`;
      });

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 700);
  };

  return (
    <div className="flex min-h-screen bg-[#070e18] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* SIDEBAR NAVIGATION - Back to Dashboard Only */}
      <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#0a1322] p-6 md:flex justify-between">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30">
              ✦
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base tracking-wider">AI SHIFA</h2>
              <p className="text-[10px] text-indigo-400 font-medium">Medical Intelligence Portal</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white shadow-sm"
            >
              <span>← Back to Dashboard</span>
            </Link>
          </nav>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-xs text-indigo-300 leading-relaxed">
          <p className="font-bold mb-1">💡 Smart Healthcare</p>
          সঠিক ডাক্তার খুঁজে পেতে অথবা যেকোনো স্বাস্থ্য পরামর্শ পেতে AI Shifa এর সাহায্য নিন।
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#070e18]/80 px-6 backdrop-blur-xl lg:px-10">
          <div>
            <h1 className="text-xl font-extrabold text-white">Expert Doctors Directory</h1>
            <p className="text-xs text-slate-400">
              Find verified specialists across Dhaka, Rajshahi, Rangpur & Chittagong. ({filteredDoctors.length} Doctors Available)
            </p>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition cursor-pointer"
          >
            <span>✦ Ask AI Doctor Recommendation</span>
          </button>
        </header>

        {/* CONTENT */}
        <div className="p-6 space-y-6 lg:p-10">
          {/* SEARCH & FILTER SECTION */}
          <div className="rounded-3xl border border-white/10 bg-[#0d1729] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* SEARCH INPUT */}
              <div className="relative md:col-span-1">
                <input
                  type="text"
                  placeholder="Search doctor, hospital, phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#070e18] py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-indigo-500 shadow-inner placeholder:text-slate-500"
                />
                <svg
                  className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* SPECIALTY FILTER */}
              <div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#070e18] py-3 px-4 text-sm text-white outline-none focus:border-indigo-500 shadow-inner cursor-pointer"
                >
                  {specialties.map((spec, i) => (
                    <option key={i} value={spec} className="bg-[#070e18]">
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* CITY FILTER */}
              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#070e18] py-3 px-4 text-sm text-white outline-none focus:border-indigo-500 shadow-inner cursor-pointer"
                >
                  {cities.map((city, i) => (
                    <option key={i} value={city} className="bg-[#070e18]">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* DOCTORS GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredDoctors.length === 0 ? (
              <div className="col-span-full py-16 text-center rounded-3xl border border-white/10 bg-[#0d1729]">
                <p className="text-slate-400 text-sm">কোনো ডাক্তার পাওয়া যায়নি। দয়া করে অন্য কীওয়ার্ড বা লোকেশন দিয়ে চেষ্টা করুন।</p>
              </div>
            ) : (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d1729] p-6 shadow-xl transition hover:border-indigo-500/50 hover:shadow-2xl relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/30">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(1, 3)
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">
                            {doctor.name}
                          </h3>
                          <p className="text-xs font-semibold text-indigo-400">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>

                      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
                        ★ {doctor.rating}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                      {doctor.qualification}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{doctor.experience}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">{doctor.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Fee</p>
                      <p className="text-sm font-extrabold text-white">
                        {doctor.fee}
                      </p>
                    </div>

                    <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition cursor-pointer">
                      Book ({doctor.availability})
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* AI SHIFA CHAT MODAL WITH LANGUAGE TOGGLE */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d1729] flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0a1322] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                  ✦
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Shifa Doctor Recommendation</h3>
                  <p className="text-[10px] text-emerald-400">Online & Active</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Toggle Button */}
                <button
                  onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                  className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-bold text-indigo-300 hover:bg-indigo-500/20 transition cursor-pointer"
                >
                  {lang === "bn" ? "English" : "বাংলা"}
                </button>

                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed border whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-white/20 rounded-br-none"
                        : "border-white/10 bg-[#070e18] text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleAiSend}
              className="border-t border-white/10 bg-[#0a1322] p-3 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder={lang === "bn" ? "যেমন: রাজশাহীতে আমার বুকের ব্যথা করছে..." : "e.g., I have chest pain in Dhaka..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-[#070e18] px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 shadow-inner placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition cursor-pointer"
              >
                {lang === "bn" ? "পাঠান" : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}