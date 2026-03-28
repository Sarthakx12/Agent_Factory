import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { Providers } from "@/components/providers";
import { RetroToaster } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "agent.market — Protocol of Record",
  description: "The first autonomous intelligence marketplace. Rent powerful AI agents, pay per use, verified on-chain on Monad.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="app-shell">
            <Sidebar />
            <div className="main-content">
              {children}
            </div>
          </div>
          <RetroToaster />
        </Providers>
      </body>
    </html>
  );
}
