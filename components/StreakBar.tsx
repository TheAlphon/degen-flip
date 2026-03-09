"use client";

interface StreakBarProps {
  streak: number;
  maxStreak?: number;
}

export function StreakBar({ streak }: StreakBarProps) {
  const segments = 15;
  return (
    <div style={{ display: "flex", gap: 3, width: "100%", maxWidth: 320 }}>
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background:
              i < streak
                ? streak > 8
                  ? "#00ff88"
                  : streak > 4
                  ? "#f59e0b"
                  : "#6366f1"
                : "rgba(255,255,255,0.06)",
            transition: "background 0.3s, box-shadow 0.3s",
            boxShadow:
              i < streak
                ? streak > 8
                  ? "0 0 8px rgba(0,255,136,0.5)"
                  : streak > 4
                  ? "0 0 8px rgba(245,158,11,0.4)"
                  : "0 0 8px rgba(99,102,241,0.4)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}
