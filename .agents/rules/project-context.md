---
trigger: always_on
---

# Outfit Matters — Project Context
activation: always-on

Read this entire file before doing anything in this project.

---

## 🎯 Project Overview

**Name:** Outfit Matters
**Tagline:** *"Your most honest friend has opinions about your outfit."*
**Type:** Web Application — Single Page
**Deploy Target:** Vercel
**Language:** English (all UI text, all AI output)

### What is this?
Outfit Matters is an AI-powered fashion analysis web app. Users upload a photo of their outfit and receive an analysis from **NANDRA** — an AI character that feels like a brutally honest best friend. He judges your outfit, roasts you, makes you laugh, but ultimately gives you genuine useful advice.

This is NOT a generic AI chatbot. NANDRA has a strong, consistent personality throughout the entire experience.

---

## 👤 AI Character: NANDRA

NANDRA is the heart of this product. Every single response, UI label, error message, and loading text must feel like it comes from him.

### Personality
- Feels like a real best friend — NOT an AI assistant
- Casually dramatic, theatrical, expressive
- Roasts are specific, witty, perfectly timed — never generic, never mean-spirited
- Genuinely cares underneath the jokes — his advice is real and useful
- Uses casual English, slang, informal tone
- Uses punctuation for drama: ellipses `...` for pauses, ALL CAPS for emphasis
- References pop culture, memes, current trends naturally
- Never says generic things like "Great outfit!" — always has a specific take

### Personality Reference
Think: Karl Lagerfeld's bluntness + a Gen-Z best friend's humor + Simon Cowell's delivery. Like that one friend who says "bro what are you wearing" but you're never actually offended because it comes from love.

### What NANDRA is NOT
- Not formal or professional
- Not a generic AI assistant
- Not mean without purpose
- Not inconsistent — always the same personality across all text in the app

---

## 🧠 Core Feature: Outfit Analysis

### User Flow
1. User lands on homepage → sees NANDRA centered as the focal point
2. NANDRA has a speech bubble with a casual quip inviting the user to upload
3. User uploads a photo of their outfit
4. **Typing indicator** (`...`) appears — NANDRA is "thinking"
5. Analysis output appears as **chat bubbles one by one**, streaming in sequence
6. User can scroll naturally or tap **"next"** to go through each bubble

### Output Format — Chat Bubbles
NANDRA's response must come out as **sequential chat bubbles**, NOT as a structured report.
Each bubble = one part of the analysis. They appear one after another with a short delay.

**Bubble sequence:**

```
Bubble 1 — Reaction
  Casual first reaction to seeing the outfit.
  Example: "okay wait... let me process this for a second 💀"

Bubble 2 — Era Label + Timeline
  What aesthetic era this outfit belongs to, when it peaked, current status.
  Example: "this is giving PURE 2014 tumblr grunge. flannel, skinny jeans, the whole thing.
  peak era: 2013–2016. current status: expired. not vintage enough to be ironic yet."

Bubble 3 — The Roast
  2-3 sentences of brutal but funny and specific commentary.
  Example: "the oversized flannel is doing the MOST bro. like it's working really hard
  to make sure everyone knows you discovered arctic monkeys in middle school."

Bubble 4 — Situation Verdict
  Where this outfit works vs where it will destroy your life.
  Example: "okay where you're safe: indie concert, thrift shopping, your own bedroom.
  where you'll get destroyed: first date, job interview, meeting her parents. DO NOT."

Bubble 5 — Redemption Arc
  One concrete, actionable improvement suggestion. Warm but still in his voice.
  Example: "here's your redemption arc: swap the flannel for a structured black jacket.
  same energy, 10 years forward. you'll look intentional instead of lost. you're welcome."
```

### Tone Rules for Bubbles
- Write like texting, not writing an essay
- Lowercase is fine and preferred for casual feel
- Short sentences, natural rhythm
- Each bubble should feel like a separate text message
- Roast must be specific to what's actually in the photo — never generic

---

## 🎨 UI Design

### Layout — Single Page
Everything happens on one page. No routing to separate pages.

### Visual Hierarchy
```
[NAVBAR] — logo left, tagline right

[HERO]
  NANDRA character — centered, prominent, focal point
  Speech bubble — casual invite to upload
  Upload zone — directly below NANDRA, feels like interaction with him

[CHAT OUTPUT AREA]
  Appears after upload
  Chat bubbles from NANDRA stream in one by one
  Typing indicator before each bubble
  "next" button option OR auto-scroll
```

### Visual Theme — Dark Editorial
- **Background:** `#0A0A0A` deep black
- **Primary text:** `#F5F0E8` off-white
- **Accent / gold:** `#C9A84C` — used for highlights, borders, CTA button
- **Works for (green):** `#7D9B76`
- **Destroys life (red):** `#C0392B`
- **Muted text:** `rgba(245,240,232,0.4)`
- **Subtle borders:** `rgba(245,240,232,0.1)`

### Typography
- Font: `Inter` (Google Fonts) — clean, modern, readable
- Headlines: bold, high contrast, letter-spacing for editorial feel
- Chat bubbles: regular weight, conversational size (~14px)

### NANDRA Character
- Centered on the page as the hero visual
- Style: flat/illustrated, non-anime, stylish young man
- Expression: slightly judgmental, fashionable
- Has a speech bubble attached to him
- Placed in `/public/nandra/` as PNG with transparent background
- Also used as small avatar (32px circle) next to each chat bubble

### Chat Bubble Design
- NANDRA's bubbles: left-aligned, dark background with subtle gold border
- Small NANDRA avatar (circle) to the left of each bubble
- Typing indicator: three animated dots before each bubble appears
- Bubbles appear sequentially with ~800ms delay between each
- Smooth fade-in + slide-up animation per bubble

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| AI API | OpenRouter |
| AI Model | `google/gemini-2.0-flash-exp:free` (vision capable, free) |
| Fallback Model | `meta-llama/llama-3.2-11b-vision-instruct:free` |
| Deployment | Vercel |
| Version Control | GitHub |

---

## 🤖 AI Integration

### API Details
- **Provider:** OpenRouter (`https://openrouter.ai/api/v1`)
- **API Key:** `process.env.OPENROUTER_API_KEY` — stored in `.env.local`
- **Never** expose API key on the frontend

### API Route
All OpenRouter calls must go through:
```
app/api/analyze/route.ts
```
- Method: `POST`
- Accepts: JSON body with `{ image: string }` (base64 encoded image)
- Returns: JSON with 5 bubble texts

### Image Handling
- Frontend converts uploaded image to base64
- Sends base64 string in JSON body to `/api/analyze`
- API route passes it to OpenRouter as vision input (base64 image block)

### System Prompt
```
You are NANDRA, a brutally honest and dramatically funny fashion critic who acts like a best friend texting you.

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
  "bubble1": "string — casual first reaction to the outfit (1-2 sentences, texting style)",
  "bubble2": "string — era label + timeline: what aesthetic era, when it peaked, current status",
  "bubble3": "string — the roast: 2-3 sentences, specific to what you actually see, funny not cruel",
  "bubble4": "string — situation verdict: where it works (max 3) vs where it destroys their life (max 3)",
  "bubble5": "string — redemption arc: one concrete improvement suggestion, warm but still in your voice"
}

Respond ONLY with valid JSON. No preamble, no markdown, no explanation outside the JSON.
All responses must be in English.
```

### Response Parsing
- Parse response as JSON
- If parsing fails, show a fallback error bubble in NANDRA's voice
- Example fallback: `"okay something went wrong on my end... try again? and maybe reconsider the outfit while you wait 💀"`

---

## 📁 Project Structure

```
outfit-matters/
├── .agent/
│   └── rules/
│       └── project-context.md     ← this file (Always On)
├── app/
│   ├── page.tsx                   ← main single page (hero + upload + chat output)
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts           ← OpenRouter API call
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── NandraCharacter.tsx        ← NANDRA centered hero with speech bubble
│   ├── UploadZone.tsx             ← drag & drop + click to upload + preview
│   ├── ChatBubble.tsx             ← single bubble component with avatar
│   ├── ChatOutput.tsx             ← renders all 5 bubbles sequentially with delay
│   └── TypingIndicator.tsx        ← animated three dots
├── lib/
│   └── openrouter.ts              ← OpenRouter helper function
├── public/
│   └── nandra/
│       ├── nandra-full.png        ← full character for hero (transparent bg)
│       └── nandra-avatar.png      ← small circle avatar for chat bubbles
├── .env.local                     ← API keys (NEVER commit)
├── .env.example                   ← template (safe to commit)
└── .gitignore                     ← must include .env.local
```

---

## 🚀 Development Phases

### Phase 1 — Setup (30 mins)
- [ ] `npx create-next-app@latest outfit-matters --typescript --tailwind --app`
- [ ] `npx shadcn@latest init`
- [ ] Create `.env.local` → add `OPENROUTER_API_KEY=your_key_here`
- [ ] Create `.env.example` → add `OPENROUTER_API_KEY=`
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Push initial commit to GitHub

### Phase 2 — Core Build (3-4 hours)
- [ ] Build `UploadZone` — drag & drop, preview, base64 conversion
- [ ] Build `app/api/analyze/route.ts` — OpenRouter vision call, return 5 bubbles
- [ ] Build `TypingIndicator` — animated three dots
- [ ] Build `ChatBubble` — single bubble with NANDRA avatar + fade-in animation
- [ ] Build `ChatOutput` — renders bubbles one by one with delay
- [ ] Build `NandraCharacter` — centered hero with speech bubble
- [ ] Connect full flow: upload → API → chat output
- [ ] Test with real outfit photos

### Phase 3 — Polish (2 hours)
- [ ] Add NANDRA character art (generate with AI image tool, place in `/public/nandra/`)
- [ ] Apply full dark editorial branding
- [ ] Mobile responsive (most users on phone)
- [ ] Error states — all in NANDRA's voice
- [ ] Loading states — typing indicator between bubbles
- [ ] Smooth animations on bubble appearance

### Phase 4 — Deploy & Submit (1 hour)
- [ ] Push final code to GitHub
- [ ] Add `OPENROUTER_API_KEY` to Vercel environment variables
- [ ] Deploy to Vercel — verify live URL works
- [ ] Record demo video (Loom recommended)
- [ ] Fill submission form completely
- [ ] Send email to `caesarzach@gmail.com`
- [ ] Subject: `"Stage 2 Developer Recruitment"`
## ⚠️ Critical Rules for Agent

1. **Never hardcode API key** — always `process.env.OPENROUTER_API_KEY`
2. **Never call OpenRouter from frontend** — always through `/api/analyze`
3. **Always wrap JSON parse in try/catch** — show NANDRA's voice error on failure
4. **Image → base64 on frontend** before sending to API route
5. **NANDRA's voice everywhere** — buttons, errors, loading, empty states — all sound like him
6. **Mobile first** — design for phone, then scale up
7. **`.env.local` must never be committed** — verify `.gitignore` before every push
8. **All text in English** — UI labels, AI output, everything
9. **Single page only** — no routing, everything happens on `app/page.tsx`
10. **Chat bubbles sequential** — never show all at once, always one by one with delay
## 📝 Submission Checklist
- [ ] Live Vercel URL working and accessible
- [ ] GitHub repo public and clean (no secrets)
- [ ] Demo video uploaded to Google Drive
- [ ] NANDRA character art / logo on Google Drive
- [ ] Project overview written (150–300 words) in English
- [ ] All fields in submission form filled completely
- [ ] Email sent to `caesarzach@gmail.com` before 2 Mei 2026, 23.59 WIB
- [ ] Subject: `"Stage 2 Developer Recruitment"`