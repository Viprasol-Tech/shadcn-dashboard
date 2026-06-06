import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "shadcn-dashboard",
  description:
    "shadcn/ui-style admin dashboard (Next.js + Tailwind) with reusable primitives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
