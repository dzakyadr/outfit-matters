"use client";

const SPEECH_BUBBLES = [
  "okay so... you uploaded this. bold.",
  "drop the fit. i have thoughts.",
  "go ahead. i promise i'll be gentle. (i won't.)",
  "no judgment zone. lol jk.",
  "upload it. worst case you learn something.",
];

function getRandomQuip() {
  return SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)];
}

export default function NandraCharacter() {
  const quip = getRandomQuip();

  return (
    <div className="flex flex-col items-center gap-0 relative">
      {/* Speech bubble */}
      <div className="relative mb-0 z-10">
        <div
          className="px-5 py-3 rounded-2xl rounded-bl-sm text-sm font-medium max-w-[260px] text-center leading-snug"
          style={{
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "#F5F0E8",
          }}
        >
          {quip}
        </div>
        {/* Bubble tail */}
        <div
          className="absolute -bottom-2 left-6 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid rgba(201,168,76,0.35)",
          }}
        />
      </div>

      {/* Character image */}
      <div className="animate-float">
        <img
          src="/nandra/nandra-full.png"
          alt="NANDRA — your AI fashion critic"
          className="w-52 h-72 object-contain object-bottom drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 40px rgba(201,168,76,0.15))",
          }}
        />
      </div>

      {/* Name badge */}
      <div className="mt-1 flex flex-col items-center gap-1">
        <span
          className="text-lg font-black tracking-[0.3em] uppercase"
          style={{
            background: "linear-gradient(90deg, #C9A84C, #f0d080, #C9A84C)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
          }}
        >
          NANDRA
        </span>
        <span className="text-[10px] tracking-widest uppercase text-[rgba(245,240,232,0.3)] font-medium">
          your most honest friend
        </span>
      </div>
    </div>
  );
}
