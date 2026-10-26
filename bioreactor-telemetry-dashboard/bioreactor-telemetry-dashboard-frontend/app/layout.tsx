import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bioreactor Telemetry Dashboard",
  description: "A prototype Bioreactor Telemetry Dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full`}>
        <div className="min-h-dvh bg-olive-300">
          <div className="mx-auto flex min-h-dvh  max-w-[85%]
          flex-col border-x border-olive-200 bg-olive-100">
            <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
