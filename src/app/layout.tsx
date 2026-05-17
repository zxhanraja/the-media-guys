import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Media Guys | Premium Marketing Agency",
  description: "Specializing in High-Impact Visual Identity, Growth Strategy, and Digital Campaigns.",
  icons: {
    icon: "/images/orangestudiologo.webp",
    shortcut: "/images/orangestudiologo.webp",
    apple: "/images/orangestudiologo.webp",
  },
};

import { TranslationProvider } from "@/lib/TranslationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <TranslationProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </TranslationProvider>
      </body>
    </html>
  );
}
