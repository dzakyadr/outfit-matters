"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onUpload: (base64: string, file: File) => void;
  loading: boolean;
  hasImage: boolean;
  onAnalyze: () => void;
}

export default function UploadZone({ onUpload, loading, hasImage, onAnalyze }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      onUpload(base64.split(",")[1], file);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
      />

      {/* Drop zone */}
      <div
        onClick={() => !loading && inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{
          border: `1px solid ${dragOver ? "rgba(238,238,238,0.4)" : "rgba(238,238,238,0.1)"}`,
          borderRadius: "2px",
          cursor: loading ? "default" : "pointer",
          transition: "border-color 0.2s ease",
          overflow: "hidden",
          position: "relative",
        }}
        className={!dragOver && !preview ? "hover:border-[rgba(238,238,238,0.25)]" : ""}
      >
        {preview ? (
          <div style={{ position: "relative" }}>
            <img
              src={preview}
              alt="Your outfit"
              style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "contain", display: "block" }}
            />
            {loading && (
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(8,8,8,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "3px", color: "rgba(238,238,238,0.5)", textTransform: "uppercase" }}>
                  Analyzing...
                </span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(238,238,238,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(238,238,238,0.35)" }}>
              drop image here
            </span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(238,238,238,0.2)" }}>
              or click to browse
            </span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={onAnalyze}
        disabled={!hasImage || loading}
        style={{
          width: "100%",
          padding: "14px",
          background: hasImage && !loading ? "#EEEEEE" : "rgba(238,238,238,0.1)",
          color: hasImage && !loading ? "#080808" : "rgba(238,238,238,0.3)",
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          border: "none",
          borderRadius: "2px",
          cursor: hasImage && !loading ? "pointer" : "not-allowed",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => { if (hasImage && !loading) (e.target as HTMLButtonElement).style.background = "rgba(238,238,238,0.85)"; }}
        onMouseLeave={(e) => { if (hasImage && !loading) (e.target as HTMLButtonElement).style.background = "#EEEEEE"; }}
      >
        Let Nandra Judge
      </button>

      {preview && !loading && (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(238,238,238,0.25)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Change Image
        </button>
      )}
    </div>
  );
}
