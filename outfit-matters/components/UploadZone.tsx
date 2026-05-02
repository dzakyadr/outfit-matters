"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onUpload: (base64: string, file: File) => void;
  loading: boolean;
}

export default function UploadZone({ onUpload, loading }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      // Strip the data:image/...;base64, prefix for API
      const raw = base64.split(",")[1];
      onUpload(raw, file);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClick = () => {
    if (!loading) inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        id="outfit-upload"
        aria-label="Upload outfit photo"
      />

      {preview ? (
        /* Preview state */
        <div className="flex flex-col items-center gap-4">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(201,168,76,0.3)" }}
          >
            <img
              src={preview}
              alt="Your outfit"
              className="w-full max-h-72 object-cover"
            />
            {loading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <p className="text-[#C9A84C] text-sm font-medium animate-pulse">
                  nandra is judging...
                </p>
              </div>
            )}
          </div>

          {!loading && (
            <button
              onClick={handleClick}
              className="text-xs text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)] transition-colors underline underline-offset-2"
              id="upload-different-btn"
            >
              try a different outfit
            </button>
          )}
        </div>
      ) : (
        /* Upload zone */
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`upload-zone cursor-pointer rounded-2xl p-10 flex flex-col items-center gap-3 text-center transition-all ${
            dragOver ? "drag-over" : ""
          }`}
          role="button"
          tabIndex={0}
          aria-label="Click or drag to upload outfit photo"
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          id="upload-zone"
        >
          {/* Upload icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <p className="text-[#F5F0E8] font-medium text-sm">
            drop your fit here, i&apos;ll wait
          </p>
          <p className="text-[rgba(245,240,232,0.35)] text-xs">
            or click to browse — jpg, png, webp
          </p>
        </div>
      )}
    </div>
  );
}
