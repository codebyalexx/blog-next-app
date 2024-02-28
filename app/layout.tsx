import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adventures by Alex",
  description: "Adventures by Alex — Ignite Passion",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary fallback={<p>Error has occurred</p>}>
            <Header />
            <main className="*:z-10 flex flex-col items-center w-full p-4">
              {children}
            </main>
            <Toaster />
            <Footer />
            {modal}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
