import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Degen Flip",
  description: "Higher or lower number guessing game for Farcaster degens",
  openGraph: {
    title: "Degen Flip ◆",
    description: "Can you build the streak? Higher or lower — risk it all.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://degen-flip.vercel.app/og.png",
    "fc:frame:button:1": "Play Degen Flip",
    "fc:frame:post_url": "https://degen-flip.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#08080f", margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
