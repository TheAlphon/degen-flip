"use client";

const CRYPTO_SYMBOLS = ["◆", "⬡", "△", "◎", "⬢", "✦", "◈", "⬟"];

interface NumberCardProps {
  value: number;
  revealed: boolean;
  isNew?: boolean;
  side: "current" | "next";
}

export function NumberCard({ value, revealed, isNew, side }: NumberCardProps) {
  const symbol = CRYPTO_SYMBOLS[value % CRYPTO_SYMBOLS.length];

  return (
    <div style={{ width: 140, height: 200, perspective: "600px", flexShrink: 0 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: revealed ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        {/* Front - Revealed */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 16,
            background:
              side === "current"
                ? "linear-gradient(145deg, #1a1a2e, #16213e)"
                : isNew
                ? "linear-gradient(145deg, #0a2a1a, #0d3320)"
                : "linear-gradient(145deg, #1a1a2e, #16213e)",
            border:
              side === "current"
                ? "2px solid rgba(99, 102, 241, 0.5)"
                : "2px solid rgba(0, 255, 136, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              side === "current"
                ? "0 0 30px rgba(99, 102, 241, 0.15)"
                : "0 0 30px rgba(0, 255, 136, 0.1)",
            animation: isNew ? "cardPop 0.4s ease-out" : undefined,
          }}
        >
          <div
            style={{
              fontSize: 22,
              opacity: 0.4,
              color: side === "current" ? "#818cf8" : "#00ff88",
              marginBottom: 4,
              fontFamily: "Outfit",
            }}
          >
            {symbol}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              fontFamily: "Outfit",
              color: "#fff",
              lineHeight: 1,
              textShadow:
                side === "current"
                  ? "0 0 20px rgba(99, 102, 241, 0.4)"
                  : "0 0 20px rgba(0, 255, 136, 0.3)",
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: 11,
              fontFamily: "Space Mono",
              color: side === "current" ? "#818cf8" : "#00ff88",
              marginTop: 8,
              opacity: 0.7,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {side === "current" ? "Current" : "Next"}
          </div>
        </div>

        {/* Back - Hidden */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 16,
            background: "linear-gradient(145deg, #0f0f1a, #1a1a2e)",
            border: "2px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 8px,
                rgba(99, 102, 241, 0.04) 8px,
                rgba(99, 102, 241, 0.04) 16px
              )`,
            }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "Outfit",
              background: "linear-gradient(135deg, #6366f1, #00ff88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.6,
            }}
          >
            ?
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardPop {
          0% { transform: scale(0.9); opacity: 0; }
          60% { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
