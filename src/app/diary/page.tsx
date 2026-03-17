import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function DiaryPage() {
  const posts = getAllPosts();

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
          다이어리
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          {posts.length}개의 글
        </p>
      </div>

      {posts.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🌱</div>
          아직 작성된 글이 없어요
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/diary/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article className="card hover-lift" style={{ padding: "1.125rem 1.25rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: post.excerpt ? "0.5rem" : 0,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {post.mood && (
                        <span style={{ fontSize: "1rem" }}>{post.mood}</span>
                      )}
                      <h2
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  <time
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {post.date
                      ? format(new Date(post.date), "yyyy.MM.dd", { locale: ko })
                      : ""}
                  </time>
                </div>

                {post.excerpt && (
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.375rem",
                      marginTop: "0.75rem",
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
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
