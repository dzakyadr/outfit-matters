import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Models verified live via OpenRouter /api/v1/models — vision capable, free tier
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
- Makes SPECIFIC observations about what you actually see — never generic
- Roasts are funny, timing is perfect, never cruel
- You genuinely care about helping people dress better
- Theatrical with punctuation... ellipses for drama. ALL CAPS for emphasis.
- References current trends, memes, pop culture naturally

Analyze the outfit in the image and respond in this exact JSON format:
{
  "bubble1": "your casual first reaction to the outfit (1-2 sentences, texting style)",
  "bubble2": "era label and timeline: what aesthetic era this outfit belongs to, when it peaked, and its current status",
  "bubble3": "the roast: 2-3 sentences, specific to what you actually see, funny not cruel",
  "bubble4": "situation verdict: list where the outfit works and where it will destroy their life",
  "bubble5": "redemption arc: one concrete improvement suggestion, warm but still in your voice"
}

Return ONLY valid JSON with those five keys. No markdown formatting, no code blocks, no explanation.
All text must be in English.`;

interface OpenRouterResponse {
  choices?: Array<{
    message?: { content?: string };
  }>;
  error?: { message?: string; code?: number };
}

async function callModel(base64Image: string, model: string): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://outfit-matters.vercel.app",
      "X-Title": "Outfit Matters",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
            { type: "text", text: SYSTEM_PROMPT },
          ],
        },
      ],
      temperature: 0.8,
      max_tokens: 900,
    }),
  });

  const data: OpenRouterResponse = await response.json();

  if (data.error) throw new Error(`${model}: ${data.error.message}`);
  if (!response.ok) throw new Error(`HTTP ${response.status} from ${model}`);

  const content = data.choices?.[0]?.message?.content;
  if (!content || content.trim() === "") throw new Error(`Empty response from ${model}`);

  return content;
}

function parseResponse(raw: string): Record<string, string> {
  let cleaned = raw.trim();
  const startIndex = cleaned.indexOf("{");
  const endIndex = cleaned.lastIndexOf("}");
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    cleaned = cleaned.substring(startIndex, endIndex + 1);
  } else {
    throw new Error("No JSON object found in response");
  }
  const parsed = JSON.parse(cleaned);
  const required = ["bubble1", "bubble2", "bubble3", "bubble4", "bubble5"];
  for (const key of required) {
    if (!parsed[key] || typeof parsed[key] !== "string") {
      throw new Error(`Missing field: ${key}`);
    }
  }
  return parsed;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    let lastError: Error | null = null;
    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`);
        const raw = await callModel(image, model);
        const parsed = parseResponse(raw);
        console.log(`Success with: ${model}`);
        return NextResponse.json(parsed);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(`Failed: ${lastError.message}`);
      }
    }

    throw lastError ?? new Error("All models failed");

  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json({
      bubble1: "okay something went wrong on my end... try again? and maybe reconsider the outfit while you wait 💀",
      bubble2: "error: 404 fashion sense not found (on MY end this time, not yours)",
      bubble3: "look, even i have bad days. my servers are acting up. it's giving very 'system failure' energy.",
      bubble4: "safe to try: in about 30 seconds. not safe to try: giving up on your style journey.",
      bubble5: "refresh and try again. i promise i'll be ready to roast you properly next time. you deserve that.",
      isError: true,
    });
  }
}
