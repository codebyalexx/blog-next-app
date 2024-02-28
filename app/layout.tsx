import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adventures by Alex",
  description: "Adventures by Alex — Ignite Passion",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header session={session} />
          <main className="*:z-10 flex flex-col items-center w-full p-4">
            {children}
          </main>
          <Toaster />
          <Footer />
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
