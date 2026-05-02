"use client";

export default function TypingIndicator({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="flex items-start gap-3" style={{ marginBottom: "14px" }}>
      {/* Avatar */}
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
        }}
      >
        N
      </div>

      {/* Dots */}
      <div
        className="flex items-center gap-1.5"
        style={{
          padding: "12px 14px",
          background: "rgba(238,238,238,0.04)",
          border: "1px solid rgba(238,238,238,0.1)",
          borderRadius: "2px 10px 10px 10px",
          minWidth: 52,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(238,238,238,0.4)",
              animation: "typingPulse 0.9s ease infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
