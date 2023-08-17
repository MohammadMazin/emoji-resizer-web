import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emote Stop - Resizing and cropping emotes made easy",
  description: "Resizing your emotes for Twitch, Discord, and more!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Toaster />
        <Navbar />
        <div className="max-w-screen-2xl ml-auto mr-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
