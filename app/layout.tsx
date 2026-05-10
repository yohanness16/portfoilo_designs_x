import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer & Designer",
  description:
    "A stunning 2.5D portfolio showcasing modern web development, interactive animations, and creative digital experiences.",
  keywords: [
    "portfolio",
    "developer",
    "designer",
    "full-stack",
    "react",
    "next.js",
    "three.js",
    "web development",
  ],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer & Designer",
    description:
      "A stunning 2.5D portfolio showcasing modern web development, interactive animations, and creative digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
