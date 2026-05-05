import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibePlan - Modern Task Management",
  description: "Plan, track, and collaborate with style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex" suppressHydrationWarning>
        <SidebarProvider>
          <Sidebar />
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full transition-all duration-300">
            <Header />
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
