import type { Metadata } from "next";
import { DM_Mono, Playfair_Display, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "katex/dist/katex.min.css";
import "./globals.css";
import { siteMetadata } from "@/shared/config/site";
import { AppProvider } from "@/shared/providers/app-provider";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = Syne({ subsets: ["latin"], variable: "--font-sans" });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
