import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing in .env.local file." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt, language, attachedReports } = await req.json();

    const systemInstruction = `
    You are AI SHIFA, an empathetic and highly knowledgeable medical assistant companion.
    Respond in ${language === "bn" ? "Bangla" : "English"}.
    Keep responses clear, reassuring, structured, and easy to read using Markdown (bold text, bullet points).
    Always include a brief note that this information does not substitute professional medical advice.
    Selected User Context Reports: ${JSON.stringify(attachedReports || [])}
    `;

    const fullPrompt = `${systemInstruction}\n\nUser Question: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiText = response.text() || "No response received.";

    return NextResponse.json({ text: aiText });
  } catch (error) {
    console.error("AI SHIFA Server Error Details:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong on the server." },
      { status: 500 }
    );
  }
}