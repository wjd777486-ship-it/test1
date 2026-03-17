"use client";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export default function PostContent({ content }: Props) {
  return (
    <div className="prose-custom">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
