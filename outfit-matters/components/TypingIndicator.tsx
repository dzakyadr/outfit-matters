"use client";

interface TypingIndicatorProps {
  show: boolean;
}

export default function TypingIndicator({ show }: TypingIndicatorProps) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-3 px-1">
      {/* Small avatar */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 overflow-hidden border border-[rgba(201,168,76,0.3)]"
        style={{ background: "rgba(201,168,76,0.1)" }}
      >
        <img
          src="/nandra/nandra-avatar.png"
          alt="NANDRA"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{
          background: "rgba(245,240,232,0.04)",
          border: "1px solid rgba(245,240,232,0.1)",
          borderLeft: "3px solid #C9A84C",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#C9A84C] dot-bounce" />
        <span className="w-2 h-2 rounded-full bg-[#C9A84C] dot-bounce" />
        <span className="w-2 h-2 rounded-full bg-[#C9A84C] dot-bounce" />
      </div>
    </div>
  );
}
