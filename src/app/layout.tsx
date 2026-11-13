import type { Metadata, Viewport } from "next";
import InkDefs from "@/components/InkDefs";
import "./globals.css";

const description =
  "Eric Aellen, entrepreneur à Genève et étudiant en Informatique à l’EPFL. Fondateur de GoReview, WAsender et Aurora.";

export const metadata: Metadata = {
  metadataBase: new URL("https://airhick.github.io"),
  title: "Eric Aellen · Portfolio",
  description,
  keywords: ["Eric Aellen", "portfolio", "entrepreneur", "GoReview", "SaaS", "Genève", "Suisse", "scraping", "automatisation", "Python", "TypeScript"],
  authors: [{ name: "Eric Aellen" }],
  openGraph: {
    title: "Eric Aellen · Portfolio",
    description,
    type: "website",
    locale: "fr_CH",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          <style>{`.reveal:not(.is-in){opacity:1}`}</style>
        </noscript>
      </head>
      <body>
        <InkDefs />
        {children}
      </body>
    </html>
  );
}
