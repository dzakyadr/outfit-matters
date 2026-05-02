"use client";

import { useState, useEffect } from "react";

const SPEECH_BUBBLES = [
  "upload your fit. i won't lie to you.",
  "drop the fit. i have thoughts.",
  "go ahead. i promise i'll be gentle. (i won't.)",
  "upload it. worst case you learn something.",
];

export default function NandraCharacter({ hideSpeech = false, pose = "hi" }: { hideSpeech?: boolean, pose?: "hi" | "thinking" | "laughing" }) {
  const [quip, setQuip] = useState(SPEECH_BUBBLES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuip(SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)]);
  }, []);

  const getImageSrc = () => {
    switch (pose) {
      case "hi": return "/nandra/nandra-hi.png";
      case "thinking": return "/nandra/nandra-full.png"; // the default image is now the thinking pose
      case "laughing": return "/nandra/nandra-laughing.png";
      default: return "/nandra/nandra-hi.png";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Speech bubble */}
      {!hideSpeech && pose === "hi" && mounted && (
        <div className="relative">
          <div
            className="px-4 py-2 text-center"
            style={{
              background: "rgba(238,238,238,0.04)",
              border: "1px solid rgba(238,238,238,0.12)",
              borderRadius: "8px 8px 8px 2px",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontStyle: "italic",
              color: "rgba(238,238,238,0.7)",
              maxWidth: "260px",
            }}
          >
            {quip}
          </div>
          {/* Triangle pointer */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid rgba(238,238,238,0.12)",
            }}
          />
        </div>
      )}

      {/* Character image */}
      <div className="anim-nandra relative">
        <img
          src={getImageSrc()}
          alt={`NANDRA ${pose}`}
          style={{
            height: "clamp(300px, 45vh, 600px)",
            width: "auto",
            objectFit: "contain",
            display: "block",
            transition: "opacity 0.3s ease"
          }}
        />
      </div>
    </div>
  );
}
