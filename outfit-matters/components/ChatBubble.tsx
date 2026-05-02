"use client";

import { useEffect, useRef, useState } from "react";

interface ChatBubbleProps {
  text: string;
  role?: "nandra" | "user";
}

export default function ChatBubble({ text, role = "nandra" }: ChatBubbleProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visible && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [visible]);

  if (!visible) return null;

  const isNandra = role === "nandra";

  if (!isNandra) {
    return (
      <div ref={ref} className="flex justify-end anim-chat" style={{ marginBottom: "14px" }}>
        <div
          style={{
            maxWidth: "80%",
            padding: "10px 14px",
            background: "rgba(238,238,238,0.06)",
            border: "1px solid rgba(238,238,238,0.12)",
            borderRadius: "10px 10px 2px 10px",
            fontFamily: "var(--font-inter)",
            fontSize: "13px",
            lineHeight: 1.75,
            color: "rgba(238,238,238,0.85)",
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-start gap-3 anim-chat" style={{ marginBottom: "14px" }}>
      {/* Avatar — letter N */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(238,238,238,0.15)",
          background: "rgba(238,238,238,0.04)",
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 500,
          color: "rgba(238,238,238,0.6)",
          marginTop: 2,
        }}
      >
        N
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: "calc(100% - 40px)",
          padding: "10px 14px",
          background: "rgba(238,238,238,0.04)",
          border: "1px solid rgba(238,238,238,0.1)",
          borderRadius: "2px 10px 10px 10px",
          fontFamily: "var(--font-inter)",
          fontSize: "13px",
          lineHeight: 1.75,
          color: "rgba(238,238,238,0.85)",
        }}
      >
        {text}
      </div>
    </div>
  );
}
