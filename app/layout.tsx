import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import og from "@/public/og.png";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["dialect", "blink", "builder", "solana", "phantom", "backpack", "solflare"],
  creator: "Ancient Human",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: og.src,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ancienthumansol",
  },
  manifest: "/manifest.json",
  icons: {
    icon: {
      url: "/favicon.ico",
      sizes: "16x16",
      rel: "icon",
    },
    shortcut: {
      url: "/favicon.ico",
      sizes: "16x16",
      rel: "icon",
    },
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },
    other: [
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
        rel: "icon",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
        rel: "icon",
      },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
        rel: "android-touch-icon",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        rel: "android-chrome",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-svh flex-col bg-size-pattern bg-pattern-dots bg-repeat",
          font.className
        )}
        style={{ backgroundImage: "url(/bg-pattern.svg)" }}
      >
        <nav className="h-16 flex items-center bg-background justify-center border-b shadow-sm text-center text-2xl font-bold">
          Dialect Blink Builder
        </nav>
        <div className="grow">{children}</div>
        <footer className="text-center h-16 text-sm flex gap-1 items-center justify-center text-muted-foreground">
          Made by{" "}
          <a href="https://x.com/ancienthumansol" target="_blank" className="hover:underline">
            @AncientHuman
          </a>
        </footer>
      </body>
    </html>
  );
}
