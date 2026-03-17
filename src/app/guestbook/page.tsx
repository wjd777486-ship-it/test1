import GuestbookClient from "@/components/GuestbookClient";
import { getEntries } from "@/lib/guestbook";

export default function GuestbookPage() {
  const initialEntries = getEntries();

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.25rem",
          }}
        >
          방명록
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          발자국을 남겨주세요 🐾
        </p>
      </div>

      <GuestbookClient initialEntries={initialEntries} />
    </div>
  );
}
