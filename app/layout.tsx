import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer & Designer",
  description:
    "A 2.5D interactive portfolio showcasing modern web development, 3D animations, and creative design. Built with Next.js, Three.js, and Framer Motion.",
  keywords: ["portfolio", "developer", "designer", "next.js", "three.js", "react"],
  authors: [{ name: "Yohannes" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer & Designer",
    description:
      "A 2.5D interactive portfolio showcasing modern web development, 3D animations, and creative design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
