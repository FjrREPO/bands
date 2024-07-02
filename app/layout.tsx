import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers/providers";
import { SessionProvider } from "next-auth/react";
import MusicLayout from "@/components/music/music-layout";

export const metadata: Metadata = {
  title: "Faketify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`font-circular font-medium`}>
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
          <Providers>
              {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
