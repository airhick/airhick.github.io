import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric Aellen — Portfolio",
  description: "Software developer & creative technologist based in Geneva, Switzerland.",
  keywords: ["Eric Aellen", "portfolio", "developer", "Geneva", "Switzerland"],
  authors: [{ name: "Eric Aellen" }],
  openGraph: {
    title: "Eric Aellen — Portfolio",
    description: "Software developer & creative technologist based in Geneva, Switzerland.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
