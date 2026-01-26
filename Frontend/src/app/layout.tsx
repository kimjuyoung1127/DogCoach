import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "TailLog - 반려견 행동 교정",
  description: "AI 기반 반려견 행동 교정 및 기록 서비스",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
