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
  title: "TailLog - Data-Driven Dog Behavior Coaching",
  description:
    "AI-powered behavior analysis and coaching for dog guardians. Track logs, review insights, and take practical actions.",
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://taillog-nu.vercel.app/"
  ),
  openGraph: {
    title: "TailLog - Data-Driven Dog Behavior Coaching",
    description:
      "Analyze behavior patterns and get actionable coaching with TailLog.",
    images: [
      {
        url: "/og/taillog-share-v2.png",
        width: 1200,
        height: 630,
        alt: "TailLog share image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TailLog - Data-Driven Dog Behavior Coaching",
    description:
      "Analyze behavior patterns and get actionable coaching with TailLog.",
    images: ["/og/taillog-share-v2.png"],
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
