import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import PostContent from "@/components/PostContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} — 나의 미니홈피` };
}

export default async function DiaryPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      {/* Back */}
      <Link
        href="/diary"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          textDecoration: "none",
          marginBottom: "1.5rem",
          transition: "color 0.15s",
        }}
      >
        ← 다이어리로
      </Link>

      {/* Header */}
      <div
        className="card"
        style={{ marginBottom: "1.25rem", padding: "1.5rem" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {post.mood && <span style={{ fontSize: "1.5rem" }}>{post.mood}</span>}
          <h1
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <time
            style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}
          >
            {post.date
              ? format(new Date(post.date), "yyyy년 M월 d일 EEEE", { locale: ko })
              : ""}
          </time>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              marginTop: "0.875rem",
              flexWrap: "wrap",
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6875rem",
                  padding: "0.2rem 0.625rem",
                  borderRadius: "9999px",
                  background: "rgba(244,167,185,0.12)",
                  color: "var(--accent-pink)",
                  border: "1px solid rgba(244,167,185,0.3)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <PostContent content={post.content} />
      </div>
    </div>
  );
}
