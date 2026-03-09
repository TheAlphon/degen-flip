"use client";

import { useEffect, useState, useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import { NumberCard } from "./NumberCard";
import { ResultScreen } from "./ResultScreen";
import { Particles } from "./Particles";
import { StreakBar } from "./StreakBar";

// ─── Utility ───
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getMultiplier = (streak: number): string => {
  if (streak <= 1) return "1.0";
  if (streak <= 3) return (1 + (streak - 1) * 0.5).toFixed(1);
  if (streak <= 7) return (2 + (streak - 3) * 0.8).toFixed(1);
  return (5.2 + (streak - 7) * 1.2).toFixed(1);
};

export const getStreakTitle = (streak: number): string => {
  if (streak === 0) return "";
  if (streak <= 2) return "Warming Up";
  if (streak <= 5) return "On Fire 🔥";
  if (streak <= 8) return "Degen Mode 💎";
  if (streak <= 12) return "Absolutely Based 🟦";
  return "Legendary 👑";
};

export const getResultTitle = (streak: number): string => {
  if (streak === 0) return "REKT 💀";
  if (streak <= 2) return "Paper Hands 🧻";
  if (streak <= 5) return "Diamond Starter 💎";
  if (streak <= 8) return "True Degen 🔥";
  if (streak <= 12) return "Based Legend 🟦";
  return "Onchain God 👑";
};

type GameState = "idle" | "playing" | "revealed" | "cashout" | "gameover";

export function Game() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentNum, setCurrentNum] = useState(rand(1, 99));
  const [nextNum, setNextNum] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [guess, setGuess] = useState<"higher" | "lower" | null>(null);
  const [winTrigger, setWinTrigger] = useState(0);
  const [loseTrigger, setLoseTrigger] = useState(0);
  const [shakeCard, setShakeCard] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);

  useEffect(() => {
    sdk.actions.ready().catch(() => {});
  }, []);

  const startGame = useCallback(() => {
    setCurrentNum(rand(1, 99));
    setNextNum(null);
    setStreak(0);
    setGuess(null);
    setGameState("playing");
  }, []);

  const makeGuess = useCallback(
    (direction: "higher" | "lower") => {
      if (gameState !== "playing") return;
      const next = rand(1, 99);
      const isCorrect =
        (direction === "higher" && next > currentNum) ||
        (direction === "lower" && next < currentNum) ||
        next === currentNum;

      setNextNum(next);
      setGuess(direction);
      setLastGuessCorrect(isCorrect);
      setGameState("revealed");

      setTimeout(() => {
        if (isCorrect) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          setBestStreak((prev) => Math.max(prev, newStreak));
          setWinTrigger((t) => t + 1);
          setTimeout(() => {
            setCurrentNum(next);
            setNextNum(null);
            setGuess(null);
            setGameState("playing");
          }, 800);
        } else {
          setLoseTrigger((t) => t + 1);
          setShakeCard(true);
          setTimeout(() => setShakeCard(false), 500);
          setTimeout(() => setGameState("gameover"), 1200);
        }
      }, 600);
    },
    [gameState, currentNum, streak]
  );

  const cashOut = useCallback(() => {
    setGameState("cashout");
  }, []);

  const handleShare = useCallback(
    (cashed: boolean) => {
      const multiplier = getMultiplier(streak);
      const title = getResultTitle(streak);
      const text = cashed
        ? `🎲 DEGEN FLIP\n\n💰 Cashed out!\nStreak: ${streak} | Multiplier: ${multiplier}x\n\nSmart money or paper hands? You decide.`
        : `🎲 DEGEN FLIP\n\nStreak: ${streak} | Multiplier: ${multiplier}x\n${title}\n\nThink you can beat me?`;

      sdk.actions
        .composeCast({ text, embeds: ["https://degen-flip.vercel.app"] })
        .catch(() => {
          if (navigator.share) {
            navigator.share({ text });
          } else {
            navigator.clipboard.writeText(text);
          }
        });
    },
    [streak]
  );

  const multiplier = getMultiplier(streak);
  const streakTitle = getStreakTitle(streak);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080f",
        color: "#fff",
        fontFamily: "Outfit, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08), transparent),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,255,136,0.03), transparent)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Particles trigger={winTrigger} type="win" />
      <Particles trigger={loseTrigger} type="lose" />

      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "20px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: -0.5,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #00ff88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DEGEN FLIP
            </span>
            <span style={{ fontSize: 14, opacity: 0.3 }}>◆</span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontFamily: "Space Mono",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: 1,
            }}
          >
            HIGHER OR LOWER
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: "Space Mono",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: 1,
            }}
          >
            BEST
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: bestStreak > 0 ? "#00ff88" : "rgba(255,255,255,0.2)",
            }}
          >
            {bestStreak}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          maxWidth: 420,
          width: "100%",
          padding: "0 20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* IDLE STATE */}
        {gameState === "idle" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              animation: "fadeInUp 0.6s ease-out",
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                background:
                  "linear-gradient(145deg, rgba(99,102,241,0.15), rgba(0,255,136,0.08))",
                border: "1px solid rgba(99,102,241,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
              }}
            >
              ◆
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                Will the next number be
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #6366f1, #00ff88)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                higher or lower?
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                Guess right to build your streak.
                <br />
                Cash out anytime — or risk it all.
              </div>
            </div>

            <button
              onClick={startGame}
              style={{
                padding: "16px 48px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "#fff",
                fontFamily: "Outfit",
                fontWeight: 800,
                fontSize: 17,
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
                transition: "all 0.2s",
                letterSpacing: 0.5,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0 8px 32px rgba(99,102,241,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0 4px 24px rgba(99,102,241,0.35)";
              }}
            >
              Start Flipping
            </button>
          </div>
        )}

        {/* PLAYING / REVEALED / GAMEOVER STATE */}
        {(gameState === "playing" ||
          gameState === "revealed" ||
          gameState === "gameover") && (
          <>
            {/* Streak Info */}
            <div style={{ textAlign: "center", minHeight: 50 }}>
              {streak > 0 && (
                <>
                  <div
                    style={{
                      fontSize: 13,
                      fontFamily: "Space Mono",
                      color:
                        streak > 8
                          ? "#00ff88"
                          : streak > 4
                          ? "#f59e0b"
                          : "#818cf8",
                      letterSpacing: 2,
                      marginBottom: 4,
                    }}
                  >
                    {streakTitle}
                  </div>
                  <div
                    style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 18,
                        marginRight: 4,
                      }}
                    >
                      ×
                    </span>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #00ff88)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {multiplier}
                    </span>
                  </div>
                </>
              )}
              {streak === 0 && gameState !== "gameover" && (
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Space Mono",
                  }}
                >
                  Make your first call
                </div>
              )}
            </div>

            {/* Streak Bar */}
            <StreakBar streak={streak} />

            {/* Cards */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                animation: shakeCard ? "shake 0.4s ease-in-out" : undefined,
              }}
            >
              <NumberCard value={currentNum} revealed={true} side="current" />

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.15)",
                  fontFamily: "Space Mono",
                }}
              >
                vs
              </div>

              {nextNum !== null ? (
                <NumberCard
                  value={nextNum}
                  revealed={
                    gameState === "revealed" || gameState === "gameover"
                  }
                  isNew={true}
                  side="next"
                />
              ) : (
                <NumberCard value={0} revealed={false} side="next" />
              )}
            </div>

            {/* Action Buttons */}
            {gameState === "playing" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                  maxWidth: 320,
                  animation: "fadeInUp 0.3s ease-out",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => makeGuess("higher")}
                    style={{
                      flex: 1,
                      padding: "16px 0",
                      borderRadius: 12,
                      border: "1px solid rgba(0,255,136,0.25)",
                      background: "rgba(0,255,136,0.06)",
                      color: "#00ff88",
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(0,255,136,0.12)";
                      t.style.borderColor = "rgba(0,255,136,0.4)";
                      t.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(0,255,136,0.06)";
                      t.style.borderColor = "rgba(0,255,136,0.25)";
                      t.style.transform = "translateY(0)";
                    }}
                  >
                    ▲ Higher
                  </button>

                  <button
                    onClick={() => makeGuess("lower")}
                    style={{
                      flex: 1,
                      padding: "16px 0",
                      borderRadius: 12,
                      border: "1px solid rgba(255,51,102,0.25)",
                      background: "rgba(255,51,102,0.06)",
                      color: "#ff3366",
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(255,51,102,0.12)";
                      t.style.borderColor = "rgba(255,51,102,0.4)";
                      t.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(255,51,102,0.06)";
                      t.style.borderColor = "rgba(255,51,102,0.25)";
                      t.style.transform = "translateY(0)";
                    }}
                  >
                    ▼ Lower
                  </button>
                </div>

                {streak >= 2 && (
                  <button
                    onClick={cashOut}
                    style={{
                      width: "100%",
                      padding: "12px 0",
                      borderRadius: 12,
                      border: "1px solid rgba(245,158,11,0.2)",
                      background: "rgba(245,158,11,0.05)",
                      color: "#f59e0b",
                      fontFamily: "Space Mono",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      letterSpacing: 1,
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(245,158,11,0.1)";
                      t.style.borderColor = "rgba(245,158,11,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget;
                      t.style.background = "rgba(245,158,11,0.05)";
                      t.style.borderColor = "rgba(245,158,11,0.2)";
                    }}
                  >
                    💰 CASH OUT AT {multiplier}x
                  </button>
                )}
              </div>
            )}

            {/* Revealed feedback */}
            {gameState === "revealed" && lastGuessCorrect && (
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#00ff88",
                  animation: "fadeInUp 0.3s ease-out",
                  fontFamily: "Outfit",
                }}
              >
                ✦ Correct! Keep going...
              </div>
            )}
          </>
        )}

        {/* GAME OVER */}
        {gameState === "gameover" && (
          <div style={{ marginTop: -20 }}>
            <ResultScreen
              streak={streak}
              multiplier={multiplier}
              onPlayAgain={startGame}
              onShare={() => handleShare(false)}
            />
          </div>
        )}

        {/* CASHOUT */}
        {gameState === "cashout" && (
          <ResultScreen
            streak={streak}
            multiplier={multiplier}
            onPlayAgain={startGame}
            onShare={() => handleShare(true)}
          />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          fontSize: 11,
          fontFamily: "Space Mono",
          color: "rgba(255,255,255,0.15)",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          letterSpacing: 1,
        }}
      >
        BUILT FOR FARCASTER ◆ MINI APP
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
