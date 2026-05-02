"use client";

import { useState } from "react";
import NandraCharacter from "@/components/NandraCharacter";
import UploadZone from "@/components/UploadZone";
import ChatOutput from "@/components/ChatOutput";

interface AnalysisResult {
  bubble1: string;
  bubble2: string;
  bubble3: string;
  bubble4: string;
  bubble5: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleUpload = async (base64: string) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        bubble1: "okay something went wrong on my end... try again? 💀",
        bubble2: "error: connection dropped. very inconvenient timing tbh.",
        bubble3:
          "my wifi is giving vintage 2008 energy right now. not the aesthetic.",
        bubble4:
          "safe: try again in 30 seconds. unsafe: assuming i don't have thoughts on your fit.",
        bubble5:
          "refresh and come back. i have so many opinions waiting for you. so many.",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasResult = !!result;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A" }}>
      {/* Navbar */}
      <nav
        className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50"
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(245,240,232,0.06)",
        }}
      >
        <a href="/" id="nav-logo" className="flex items-center gap-2">
          <span
            className="text-base font-black tracking-[0.2em] uppercase"
            style={{
              background: "linear-gradient(90deg, #C9A84C, #f0d080, #C9A84C)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Outfit Matters
          </span>
        </a>
        <span
          className="text-xs tracking-widest uppercase hidden sm:block"
          style={{ color: "rgba(245,240,232,0.35)" }}
        >
          your most honest friend has opinions
        </span>
      </nav>

      {/* Hero + Upload */}
      <main className="flex-1 flex flex-col items-center">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        {/* NANDRA Hero */}
        <section
          className="w-full flex flex-col items-center pt-10 pb-8 px-4"
          aria-label="NANDRA character"
        >
          <NandraCharacter />
        </section>

        {/* Upload section */}
        <section
          className={`w-full px-4 flex flex-col items-center gap-6 transition-all duration-500 ${
            hasResult ? "pb-6" : "pb-16"
          }`}
          aria-label="Upload your outfit"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#F5F0E8" }}>
              show me what you&apos;re working with
            </h1>
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>
              upload a full-body photo of your outfit for the most accurate read
            </p>
          </div>

          <UploadZone onUpload={handleUpload} loading={loading} />

          {!hasResult && !loading && (
            <button
              onClick={() => document.getElementById("outfit-upload")?.click()}
              className="btn-gold px-8 py-3 rounded-full text-sm uppercase tracking-widest mt-2"
              id="analyze-cta-btn"
              aria-label="Upload and analyze outfit"
            >
              let nandra judge
            </button>
          )}

          {loading && !result && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] dot-bounce"
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] dot-bounce"
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] dot-bounce"
              />
              <span className="ml-1">analyzing your fit...</span>
            </div>
          )}
        </section>

        {/* Chat output */}
        {(loading || result) && (
          <ChatOutput result={result} loading={loading} />
        )}

        {/* Try again */}
        {hasResult && !loading && (
          <section className="w-full flex flex-col items-center gap-3 pb-16 px-4">
            <div className="flex items-center gap-3 w-full max-w-2xl">
              <div className="flex-1 h-px bg-[rgba(245,240,232,0.08)]" />
              <span className="text-xs tracking-widest uppercase text-[rgba(245,240,232,0.2)]">
                that&apos;s my verdict
              </span>
              <div className="flex-1 h-px bg-[rgba(245,240,232,0.08)]" />
            </div>
            <button
              onClick={() => {
                setResult(null);
                document.getElementById("outfit-upload")?.click();
              }}
              className="btn-gold px-8 py-3 rounded-full text-sm uppercase tracking-widest"
              id="try-another-btn"
            >
              try another outfit
            </button>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.25)" }}>
              i&apos;m always here. with opinions.
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        className="w-full py-6 px-6 flex items-center justify-center"
        style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}
      >
        <p className="text-xs" style={{ color: "rgba(245,240,232,0.2)" }}>
          outfit matters — nandra is not responsible for any fashion crises that follow
        </p>
      </footer>
    </div>
  );
}
