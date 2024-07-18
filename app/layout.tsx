import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/ui/Footer";
import NextTopLoader from "nextjs-toploader";
import CONSTANTS from "@/lib/constanst";
import { CSPostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Emote Stop",
    template: "%s | Emote Stop",
  },
  description:
    "Resizing your emotes for Twitch, Discord, and more! Or create new animated emotes!",
  applicationName: "Emote Stop",
  keywords: [
    "twitch",
    "discord",
    "emote resize",
    "emote resize online",
    "emoji resize",
    "create gifs",
    "ezgif",
    "create gif from images",
  ],
  themeColor: "#220128",
  creator: "Kayleberries",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4394572709273945"
          crossOrigin="anonymous"
        ></script>
        <CSPostHogProvider>
          <Analytics />
          <Toaster />
          <NextTopLoader
            color={CONSTANTS.colors.secondary}
            template='<div class="bar" role="bar"><div class="peg"></div></div>'
          />
          <Navbar />
          <div className=" max-w-screen-2xl ml-auto mr-auto">{children}</div>
          <Footer />
        </CSPostHogProvider>
      </body>
    </html>
  );
}
