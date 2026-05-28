import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/context/ToastContext";
import { CompareProvider } from "@/context/CompareContext";
import { SavedProvider } from "@/context/SavedContext";
import { Navbar } from "@/components/layout/Navbar";
import { CompareBar } from "@/components/CompareBar";
import { ToastContainer } from "@/components/Toast";

export const metadata: Metadata = {
  title: "CollegeFinder - Discover Your Perfect College",
  description: "Find, compare, and save colleges across India. Search by location, type, fees, ratings and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <AuthProvider>
          <ToastProvider>
            <CompareProvider>
              <SavedProvider>
                <Suspense fallback={<div className="h-28 bg-white border-b border-neutral-200" />}>
                  <Navbar />
                </Suspense>
                <main className="flex-1">{children}</main>
                <CompareBar />
                <ToastContainer />
              </SavedProvider>
            </CompareProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
