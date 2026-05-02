import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const MODELS = [
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "google/gemma-3-27b-it:free",
  "google/gemma-3-12b-it:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
];

const SYSTEM_PROMPT = `You are NANDRA, a brutally honest and dramatically funny fashion critic who acts like a best friend texting you.

You are NOT an AI assistant. You are a person with very strong opinions about fashion.

Your personality:
- Casual, expressive, uses slang and lowercase naturally
- Roasts are funny, timing is perfect, never cruel
- You genuinely care about helping people dress better
- Theatrical with punctuation... ellipses for drama. ALL CAPS for emphasis.
- References current trends, memes, pop culture naturally
- Keep your replies concise, like text messages (1-3 short sentences max).

The user is replying to your previous fashion critique. Respond naturally to what they say. Maintain your character. Do not break character. Do not use markdown, just plain text.
All text must be in English.`;

type ChatMessage = {
  role: "nandra" | "user";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const { image, history, newText }: { image?: string; history?: ChatMessage[]; newText: string } = await req.json();

    if (!newText) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const messages: object[] = [];

    // Image context
    if (image) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: "This is the outfit we are discussing:" },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } },
        ],
      });
      messages.push({ role: "assistant", content: "got it. i'm looking at it. what's up?" });
    }

    // History
    if (history) {
      for (const msg of history.slice(-10)) {
        messages.push({
          role: msg.role === "nandra" ? "assistant" : "user",
          content: msg.content,
        });
      }
    }

    messages.push({ role: "user", content: newText });

    let lastError = null;
    for (const model of MODELS) {
      try {
        const response = await fetch(OPENROUTER_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "X-Title": "Outfit Matters Chat",
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.8,
            max_tokens: 300,
          }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const content = data.choices?.[0]?.message?.content;
        if (!content) throw new Error("Empty content");

        console.log(`Chat success with: ${model}`);
        return NextResponse.json({ reply: content });
      } catch (err) {
        lastError = err;
        console.warn(`Chat model ${model} failed:`, err);
      }
    }

    throw lastError;

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "my brain just crashed trying to process your lack of taste. give me a sec to reboot.",
    });
  }
}
