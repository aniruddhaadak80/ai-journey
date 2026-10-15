import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const siteUrl = getSiteUrl();
const title = "AI Journey — The Complete Interactive History of Artificial Intelligence";
const description =
  "Explore the whole journey of AI — from Turing's dream to autonomous agents. An interactive timeline, knowledge graph, structured course, visual flowcharts, and every source paper, video, and essay in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · AI Journey",
  },
  description,
  applicationName: "AI Journey",
  keywords: [
    "artificial intelligence",
    "AI history",
    "machine learning",
    "deep learning",
    "neural networks",
    "transformer",
    "LLM",
    "GPT",
    "AGI",
    "AI timeline",
    "interactive timeline",
    "knowledge graph",
    "RLHF",
    "AI agents",
    "learn AI",
  ],
  authors: [{ name: "Aniruddha Adak", url: "https://github.com/anomalyco" }],
  creator: "Aniruddha Adak",
  publisher: "Aniruddha Adak",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "AI Journey",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@aniruddhaadak80",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "education",
};

export const viewport = {
  themeColor: "#050508",
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} dark`}
    >
      <body className="min-h-screen bg-[#050508] text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-100">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
