import ProfileCard from "@/components/ProfileCard";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div>
      <ProfileCard />

      {/* Recent Diary */}
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.875rem",
          }}
        >
          <h2
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ✦ 최근 다이어리
          </h2>
          <Link
            href="/diary"
            style={{
              fontSize: "0.75rem",
              color: "var(--accent-lavender)",
              textDecoration: "none",
            }}
          >
            전체 보기 →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "2.5rem 1.5rem",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
            }}
          >
            아직 작성된 글이 없어요 🌱
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/diary/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card hover-lift"
                  style={{ padding: "1rem 1.25rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {post.mood && (
                          <span style={{ fontSize: "1rem" }}>{post.mood}</span>
                        )}
                        <h3
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {post.title}
                        </h3>
                      </div>
                      {post.excerpt && (
                        <p
                          style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-secondary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <time
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {post.date
                        ? format(new Date(post.date), "M월 d일", { locale: ko })
                        : ""}
                    </time>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.375rem",
                        marginTop: "0.625rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.6875rem",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "9999px",
                            background: "var(--bg-primary)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
