"use client";

import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

interface AnalysisResult {
  bubble1: string;
  bubble2: string;
  bubble3: string;
  bubble4: string;
  bubble5: string;
}

interface ChatOutputProps {
  result: AnalysisResult | null;
  loading: boolean;
}

const BUBBLE_LABELS = [
  "first reaction",
  "era check",
  "the roast",
  "situation verdict",
  "redemption arc",
];

const BUBBLE_DELAY_BASE = 800; // ms between each bubble
const TYPING_DURATION = 1200; // ms typing indicator shows before each bubble

export default function ChatOutput({ result, loading }: ChatOutputProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bubbles = result
    ? [result.bubble1, result.bubble2, result.bubble3, result.bubble4, result.bubble5]
    : [];

  useEffect(() => {
    if (!result) {
      setVisibleCount(0);
      setShowTyping(false);
      return;
    }

    // Show bubbles one by one
    let cancelled = false;

    const showNext = async (index: number) => {
      if (index >= bubbles.length || cancelled) return;

      setShowTyping(true);
      await new Promise((r) => setTimeout(r, TYPING_DURATION));
      if (cancelled) return;

      setShowTyping(false);
      setVisibleCount(index + 1);
      await new Promise((r) => setTimeout(r, BUBBLE_DELAY_BASE));
      if (cancelled) return;

      showNext(index + 1);
    };

    setVisibleCount(0);
    setShowTyping(false);
    showNext(0);

    return () => { cancelled = true; };
  }, [result]);

  if (!loading && !result) return null;

  return (
    <section
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4 px-4 pb-12"
      aria-label="NANDRA's analysis"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-px bg-[rgba(245,240,232,0.08)]" />
        <span className="text-xs tracking-widest uppercase text-[rgba(245,240,232,0.3)] font-semibold">
          nandra&apos;s verdict
        </span>
        <div className="flex-1 h-px bg-[rgba(245,240,232,0.08)]" />
      </div>

      {/* Initial typing indicator (when loading first starts) */}
      {loading && visibleCount === 0 && (
        <TypingIndicator show={true} />
      )}

      {/* Bubbles */}
      {bubbles.slice(0, visibleCount).map((text, i) => (
        <ChatBubble
          key={i}
          text={text}
          label={BUBBLE_LABELS[i]}
          delay={0}
        />
      ))}

      {/* Typing indicator between bubbles */}
      {!loading && result && (
        <TypingIndicator show={showTyping} />
      )}
    </section>
  );
}
