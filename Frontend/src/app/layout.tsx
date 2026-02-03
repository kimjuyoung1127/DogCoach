import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Providers } from "./providers";

const nanumSquareRound = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareRoundL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRoundR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRoundB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRoundEB.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum",
});

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
      <body className={`${nanumSquareRound.variable} ${outfit.variable} font-nanum bg-gray-50 text-gray-900 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
