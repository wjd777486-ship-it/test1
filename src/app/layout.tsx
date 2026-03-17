import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ContactFab from "@/components/ContactFab";

export const metadata: Metadata = {
  title: "나의 미니홈피",
  description: "작고 소중한 나의 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">
          {children}
        </main>
        <ContactFab />
      </body>
    </html>
  );
}
