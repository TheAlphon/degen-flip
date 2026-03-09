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
          alignItems: "center",
          justifyContent: "center",
          background: "#08080f",
          borderRadius: 40,
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Diamond */}
        <div
          style={{
            fontSize: 100,
            background: "linear-gradient(135deg, #6366f1, #00ff88)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          ◆
        </div>
      </div>
    ),
    {
      width: 200,
      height: 200,
    }
  );
}
