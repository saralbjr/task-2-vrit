import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "User Dashboard — User & Posts Dashboard",
  description:
    "A modern dashboard to browse users, explore their posts, and add new content using the JSONPlaceholder API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: "bg-white text-slate-900 border border-slate-200 shadow-xl dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 font-medium",
              success: {
                iconTheme: {
                  primary: '#1253ED',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
