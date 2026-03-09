"use client";

import { getResultTitle } from "./Game";

interface ResultScreenProps {
  streak: number;
  multiplier: string;
  onPlayAgain: () => void;
  onShare: () => void;
}

export function ResultScreen({
  streak,
  multiplier,
  onPlayAgain,
  onShare,
}: ResultScreenProps) {
  const title = getResultTitle(streak);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        animation: "fadeInUp 0.6s ease-out",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontFamily: "Space Mono",
          color: "#6366f1",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Game Over
      </div>

      <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "Outfit" }}>
        {title}
      </div>

      {/* Result Card */}
      <div
        style={{
          background:
            "linear-gradient(145deg, rgba(99,102,241,0.1), rgba(0,255,136,0.05))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 20,
          padding: "28px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          minWidth: 240,
        }}
      >
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "Outfit",
                background: "linear-gradient(135deg, #6366f1, #00ff88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}
            >
              {streak}
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "Space Mono",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              STREAK
            </div>
          </div>

          <div
            style={{
              width: 1,
              height: 50,
              background: "rgba(255,255,255,0.08)",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "Outfit",
                color: "#00ff88",
                lineHeight: 1,
              }}
            >
              {multiplier}x
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "Space Mono",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              MULTI
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 8,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <button
          onClick={onPlayAgain}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 12,
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.1)",
            color: "#818cf8",
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.background = "rgba(99,102,241,0.2)";
            t.style.borderColor = "rgba(99,102,241,0.5)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.background = "rgba(99,102,241,0.1)";
            t.style.borderColor = "rgba(99,102,241,0.3)";
          }}
        >
          Play Again
        </button>
        <button
          onClick={onShare}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "#fff",
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.transform = "translateY(-1px)";
            t.style.boxShadow = "0 6px 24px rgba(99,102,241,0.4)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.transform = "translateY(0)";
            t.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)";
          }}
        >
          Share Cast ✦
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
