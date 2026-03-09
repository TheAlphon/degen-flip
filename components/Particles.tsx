"use client";

import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  symbol: string;
  delay: number;
  size: number;
}

interface ParticlesProps {
  trigger: number;
  type: "win" | "lose";
}

export function Particles({ trigger, type }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newParticles = Array.from(
      { length: type === "win" ? 12 : 8 },
      (_, i) => ({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 30,
        y: 50 + (Math.random() - 0.5) * 20,
        angle: Math.random() * 360,
        distance: 40 + Math.random() * 80,
        symbol:
          type === "win"
            ? ["✦", "◆", "★", "⬡"][Math.floor(Math.random() * 4)]
            : ["✕", "◇", "○"][Math.floor(Math.random() * 3)],
        delay: Math.random() * 0.15,
        size: 10 + Math.random() * 14,
      })
    );
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 900);
    return () => clearTimeout(t);
  }, [trigger, type]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.size,
              color: type === "win" ? "#00ff88" : "#ff3366",
              animation: `particleFly 0.8s ease-out ${p.delay}s forwards`,
              opacity: 0,
              ["--tx" as string]: `${tx}px`,
              ["--ty" as string]: `${ty}px`,
              fontFamily: "Outfit",
            }}
          >
            {p.symbol}
          </span>
        );
      })}
      <style>{`
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.3); }
        }
      `}</style>
    </div>
  );
}
