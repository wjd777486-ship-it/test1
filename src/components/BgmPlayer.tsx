"use client";

import { useState, useRef, useEffect } from "react";

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // BGM 파일이 없는 경우를 위한 안전 처리
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // autoplay policy
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <>
      {/* Hidden audio element - replace /bgm.mp3 with your music file */}
      <audio ref={audioRef} src="/bgm.mp3" loop preload="none" />

      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        {isExpanded && (
          <div
            className="card"
            style={{
              padding: "0.875rem 1rem",
              minWidth: "160px",
              boxShadow: "0 4px 20px rgba(196,181,212,0.25)",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                marginBottom: "0.375rem",
              }}
            >
              now playing
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              {isPlaying ? "🎵 재생 중..." : "일시정지"}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "9999px",
              border: "1px solid var(--border)",
              background: "white",
              cursor: "pointer",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isExpanded ? "×" : "♪"}
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "9999px",
              border: "none",
              background: isPlaying
                ? "var(--accent-lavender)"
                : "var(--accent-pink)",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(244,167,185,0.4)",
              transition: "all 0.2s ease",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </div>
    </>
  );
}
