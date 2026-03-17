"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { GuestbookEntry } from "@/lib/guestbook";

const EMOJIS = ["🌸", "🍀", "⭐", "🌙", "🌈", "🦋", "🌺", "🍭", "✨", "💌"];

interface Props {
  initialEntries: GuestbookEntry[];
}

export default function GuestbookClient({ initialEntries }: Props) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("🌸");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("이름과 메시지를 입력해주세요");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, emoji }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "오류가 발생했어요");
        return;
      }
      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
      setName("");
      setMessage("");
      setEmoji("🌸");
    } catch {
      setError("네트워크 오류가 발생했어요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Write Form */}
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <h2
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          ✦ 글 남기기
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Emoji picker */}
          <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: emoji === e ? "2px solid var(--accent-pink)" : "1px solid var(--border)",
                  background: emoji === e ? "rgba(244,167,185,0.1)" : "transparent",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {e}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem" }}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              style={{
                flex: "0 0 120px",
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                fontSize: "0.875rem",
                outline: "none",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <input
              type="text"
              placeholder="반가워요! 한 마디 남겨주세요 ✨"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                fontSize: "0.875rem",
                outline: "none",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                border: "none",
                background: "var(--accent-pink)",
                color: "white",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "..." : "남기기"}
            </button>
          </div>

          {error && (
            <p style={{ fontSize: "0.75rem", color: "#e57373", marginTop: "0.375rem" }}>
              {error}
            </p>
          )}
        </form>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🐾</div>
          아직 방문자가 없어요. 첫 발자국을 남겨주세요!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {entries.map((entry) => (
            <div key={entry.id} className="card" style={{ padding: "1rem 1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.125rem",
                    flexShrink: 0,
                  }}
                >
                  {entry.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {entry.name}
                    </span>
                    <time
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {format(new Date(entry.createdAt), "M월 d일 HH:mm", { locale: ko })}
                    </time>
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {entry.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
