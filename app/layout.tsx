import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { aboutData, heroData } from "./assets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${heroData.profileName} | ${heroData.profileTitle}`,
  description: aboutData.description,
  icons: {
    icon: "/fav/favIconVS.png",
  },
  openGraph: {
    title: `${heroData.profileName} | ${heroData.profileTitle}`,
    description: aboutData.description,
    images: [
      {
        url: "/fav/favIconVS.png",
        width: 800,
        height: 600,
        alt: "Vignesh Srinivasan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
        suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiase w-full bg-gradient-to-r from-[#B3E5FC] to-[#283593]`}
        >
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </ClerkProvider>
  );
}
