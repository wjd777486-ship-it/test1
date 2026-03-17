"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/diary", label: "다이어리" },
  { href: "/guestbook", label: "방명록" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "42rem",
          margin: "0 auto",
          padding: "0 1rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}
        >
          ✦ minihompy
        </Link>

        <nav style={{ display: "flex", gap: "0.25rem" }}>
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.8125rem",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  background: isActive
                    ? "var(--accent-pink)"
                    : "transparent",
                  color: isActive
                    ? "#fff"
                    : "var(--text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
