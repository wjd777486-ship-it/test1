"use client";

import { useState } from "react";

export default function ContactFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`[블로그 문의] ${name}님의 메시지`);
    const body = encodeURIComponent(`안녕하세요!\n\n이름: ${name}\n\n${message}`);
    window.open(`mailto:wjd777486@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setName("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* 모달 오버레이 */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0,0,0,0.15)",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.75rem",
        }}
      >
        {/* 연락 폼 팝업 */}
        {isOpen && (
          <div
            className="card"
            style={{
              padding: "1.25rem",
              width: "260px",
              boxShadow: "0 4px 24px rgba(196,181,212,0.35)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                ☕ 메시지 보내기
              </p>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  lineHeight: 1,
                  padding: "0 0.25rem",
                }}
              >
                ×
              </button>
            </div>

            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                fontSize: "0.8125rem",
                color: "var(--text-primary)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <textarea
              placeholder="하고 싶은 말을 남겨주세요 :)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                fontSize: "0.8125rem",
                color: "var(--text-primary)",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />

            <button
              onClick={handleSend}
              disabled={!name.trim() || !message.trim()}
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background:
                  name.trim() && message.trim()
                    ? "var(--accent-pink)"
                    : "var(--border)",
                color: name.trim() && message.trim() ? "white" : "var(--text-muted)",
                cursor: name.trim() && message.trim() ? "pointer" : "not-allowed",
                fontSize: "0.8125rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              메일로 보내기 ✉️
            </button>

            <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", textAlign: "center" }}>
              이메일 앱이 열립니다
            </p>
          </div>
        )}

        {/* 커피 FAB 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="연락하기"
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "9999px",
            border: "none",
            background: isOpen ? "var(--accent-lavender)" : "var(--accent-pink)",
            color: "white",
            cursor: "pointer",
            fontSize: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px rgba(244,167,185,0.5)",
            transition: "all 0.2s ease",
          }}
        >
          ☕
        </button>
      </div>
    </>
  );
}
