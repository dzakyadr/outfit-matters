"use client";

import { useRef, useState, useEffect } from "react";
import NandraCharacter from "@/components/NandraCharacter";
import UploadZone from "@/components/UploadZone";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";

type Message = {
  id: string;
  role: "nandra" | "user";
  content: string;
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  letterSpacing: "4px",
  textTransform: "uppercase" as const,
  color: "rgba(238,238,238,0.35)",
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [pendingBase64, setPendingBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Called when user selects/drops an image — just stores it, doesn't analyze yet
  const handleImageSelected = (base64: string) => {
    setPendingBase64(base64);
  };

  // Called when user clicks "Let Nandra Judge"
  const handleAnalyze = async () => {
    if (!pendingBase64) return;
    const b64 = pendingBase64;
    setBase64Image(b64);
    setIsAnalyzing(true);
    setMessages([]);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: b64 }),
      });
      const data = await res.json();
      const bubbles = [data.bubble1, data.bubble2, data.bubble3, data.bubble4, data.bubble5];

      let current: Message[] = [];
      for (let i = 0; i < bubbles.length; i++) {
        if (!bubbles[i]) continue;
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsTyping(false);
        current = [...current, { id: Date.now() + "" + i, role: "nandra", content: bubbles[i] }];
        setMessages(current);
        await new Promise(r => setTimeout(r, 400));
      }
    } catch {
      setIsTyping(false);
      setMessages([{ id: "err", role: "nandra", content: "something broke on my end. try again." }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || isAnalyzing) return;
    const userText = inputValue.trim();
    setInputValue("");
    const newMessages: Message[] = [...messages, { id: Date.now() + "", role: "user", content: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image, history: newMessages.slice(-10), newText: userText }),
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + "", role: "nandra", content: data.reply }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + "", role: "nandra", content: "connection lost." }]);
    }
  };  let currentPose: "hi" | "thinking" | "laughing" = "hi";
  if (messages.length > 0 || isTyping) {
    currentPose = "laughing";
  } else if (isAnalyzing || pendingBase64) {
    currentPose = "thinking";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#EEEEEE", fontFamily: "var(--font-inter), sans-serif" }}>

      {/* HERO */}
      <section
        className="anim-headline"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "60px", paddingBottom: "32px" }}
      >
        {/* Headline — two words, two lines, two weights */}
        <h1 style={{ textAlign: "center", lineHeight: 0.95, letterSpacing: "-3px" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(72px, 10vw, 140px)",
              color: "#EEEEEE",
            }}
          >
            OUTFIT
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontSize: "clamp(72px, 10vw, 140px)",
              color: "#EEEEEE",
            }}
          >
            MATTERS
          </span>
        </h1>
      </section>

      {/* NANDRA CHARACTER */}
      <section style={{ display: "flex", justifyContent: "center", paddingBottom: "32px" }}>
        <NandraCharacter pose={currentPose} hideSpeech={messages.length > 0} />
      </section>

      {/* THIN DIVIDER */}
      <div style={{ margin: "0 48px", height: "1px", background: "rgba(238,238,238,0.06)" }} />

      {/* MAIN TWO COLUMNS */}
      <section
        className="anim-columns"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "48px", gap: 0, maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* LEFT — Upload */}
        <div style={{ paddingRight: "48px" }}>
          <p style={{ ...LABEL_STYLE, marginBottom: "20px" }}>Drop your fit</p>
          <UploadZone
            onUpload={handleImageSelected}
            loading={isAnalyzing}
            hasImage={!!pendingBase64}
            onAnalyze={handleAnalyze}
          />
        </div>

        {/* VERTICAL DIVIDER */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(238,238,238,0.06)",
          }} />

          {/* RIGHT — Chat */}
          <div style={{ paddingLeft: "48px" }}>
            <p style={{ ...LABEL_STYLE, marginBottom: "20px" }}>Result</p>

            {/* Chat container */}
            <div style={{
              height: "420px",
              border: "1px solid rgba(238,238,238,0.08)",
              borderRadius: "2px",
              padding: "20px",
              overflowY: "auto",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
            }}>
              {messages.length === 0 && !isAnalyzing ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontStyle: "italic", color: "rgba(238,238,238,0.2)", letterSpacing: "2px" }}>
                    awaiting subject...
                  </span>
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  {messages.map((msg) => (
                    <ChatBubble key={msg.id} text={msg.content} role={msg.role} />
                  ))}
                  {isTyping && <TypingIndicator show={true} />}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              style={{
                marginTop: "12px",
                display: "flex",
                border: "1px solid rgba(238,238,238,0.08)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="defend your outfit..."
                disabled={isTyping || isAnalyzing || messages.length === 0}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "12px 14px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "#EEEEEE",
                  letterSpacing: "0.5px",
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping || isAnalyzing || messages.length === 0}
                style={{
                  background: "transparent",
                  border: "none",
                  borderLeft: "1px solid rgba(238,238,238,0.08)",
                  padding: "12px 20px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(238,238,238,0.5)",
                  cursor: "pointer",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EEEEEE")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(238,238,238,0.5)")}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(238,238,238,0.06)",
        padding: "14px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "2px", color: "rgba(238,238,238,0.2)", textTransform: "uppercase" }}>
          Outfit Matters © 2026
        </span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "2px", color: "rgba(238,238,238,0.2)", textTransform: "uppercase" }}>
          By Nandra
        </span>
      </footer>

    </div>
  );
}
