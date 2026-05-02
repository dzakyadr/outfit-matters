"use client";

import { useEffect, useRef, useState } from "react";

interface ChatBubbleProps {
  text: string;
  delay?: number;
  label?: string;
}

export default function ChatBubble({ text, delay = 0, label }: ChatBubbleProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (visible && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="flex items-start gap-3 animate-fade-slide-up"
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden border border-[rgba(201,168,76,0.4)] mt-1"
        style={{ background: "rgba(201,168,76,0.08)" }}
      >
        <img
          src="/nandra/nandra-avatar.png"
          alt="NANDRA"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bubble */}
      <div className="flex flex-col gap-1 max-w-[85%]">
        {label && (
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] opacity-70 pl-1">
            {label}
          </span>
        )}
        <div
          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
          style={{
            background: "rgba(245,240,232,0.04)",
            border: "1px solid rgba(245,240,232,0.1)",
            borderLeft: "3px solid #C9A84C",
            color: "#F5F0E8",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
