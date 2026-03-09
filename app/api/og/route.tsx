import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080f",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Diamond icon */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 24,
            display: "flex",
          }}
        >
          ◆
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            background: "linear-gradient(135deg, #6366f1, #00ff88)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -2,
            display: "flex",
          }}
        >
          DEGEN FLIP
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
            marginTop: 16,
            letterSpacing: 4,
            display: "flex",
          }}
        >
          HIGHER OR LOWER
        </div>

        {/* Cards row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
            alignItems: "center",
          }}
        >
          {[
            { num: "42", label: "CURRENT", color: "#6366f1" },
            { num: "?", label: "NEXT", color: "#00ff88" },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                width: 140,
                height: 180,
                borderRadius: 16,
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: `2px solid ${card.color}55`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 30px ${card.color}22`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#fff",
                  display: "flex",
                }}
              >
                {card.num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: card.color,
                  letterSpacing: 3,
                  marginTop: 8,
                  display: "flex",
                }}
              >
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: 3,
            display: "flex",
          }}
        >
          BUILT FOR FARCASTER ◆ MINI APP
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
