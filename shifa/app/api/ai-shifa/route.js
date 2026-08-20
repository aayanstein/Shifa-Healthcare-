import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Groq client initialize kora (eta automatic .env.local theke GROQ_API_KEY niye nibe)
const groq = new Groq();

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '';
    return NextResponse.json({ success: true, data: responseText });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}