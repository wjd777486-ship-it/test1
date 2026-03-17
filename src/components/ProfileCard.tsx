import Link from "next/link";

export default function ProfileCard() {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "1.25rem",
        alignItems: "flex-start",
        marginBottom: "1.5rem",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent-pink), var(--accent-lavender))",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          boxShadow: "0 4px 12px rgba(244,167,185,0.3)",
        }}
      >
        🌸
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.25rem",
          }}
        >
          나의 미니홈피
        </h1>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            marginBottom: "0.75rem",
            lineHeight: 1.5,
          }}
        >
          오늘도 작고 소중한 하루를 기록합니다 🍀
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[
            { label: "오늘 방문", value: "12" },
            { label: "전체 방문", value: "1,024" },
          ].map(({ label, value }) => (
            <div key={label}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-muted)",
                  display: "block",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link
          href="/diary"
          style={{
            fontSize: "0.75rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            background: "var(--bg-primary)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
          }}
        >
          다이어리
        </Link>
        <Link
          href="/guestbook"
          style={{
            fontSize: "0.75rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            background: "var(--bg-primary)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
          }}
        >
          방명록
        </Link>
      </div>
    </div>
  );
}
