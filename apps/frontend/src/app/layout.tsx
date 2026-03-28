import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron, Rajdhani } from "next/font/google";
import { Footer } from "@/Components/layout/Footer";
import { Navbar } from "@/Components/layout/Navbar";
import { CRTOverlay } from "@/Components/layout/CRTOverlay";
import { Providers } from "@/Components/providers";
import { RetroToaster } from "@/Components/ui/Toast";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentFactory | Monad Agent Marketplace",
  description: "Retro-futuristic decentralized marketplace for AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${mono.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <CRTOverlay />
          <Navbar />
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">{children}</main>
          <Footer />
          <RetroToaster />
        </Providers>
      </body>
    </html>
  );
}
