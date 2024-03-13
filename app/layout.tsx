import CookieConsent from "@/components/cookies-consent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adventuresbyalexx.com"),
  title: "Adventures by Alexx",
  description: "Believe The Hike!",
  keywords: [
    "Adventures By Alex",
    "CodeByAlexx",
    "believe the hike",
    "Trekking",
    "Randonnée",
    "lifestyle",
    "blog",
    "adventures",
    "aventures",
    "alexandre",
    "paimpol",
    "france",
    "saint-brieuc",
    "corse",
    "gr",
    "gr 34",
    "gr 20",
  ],
  openGraph: {
    title: "Adventures by Alexx",
    description: "Believe The Hike! Welcome to my 'Lifestyle' blog!",
    images: "/assets/images/static/hero2.webp",
  },
  twitter: {
    title: "Adventures by Alexx",
    description: "Believe the Hike! Welcome to my 'Lifestyle' blog! ",
    images: "/assets/images/static/hero2.webp",
  },
  other: { author: "CodeByAlexx", "revisit-after": "7 days" },
  robots: "index, follow",
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
      <body className="overflow-x-hidden h-full [top:0!important]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex-shrink-0 flex-auto">
              <Header session={session} />
              <main className="*:z-10 flex flex-col items-center w-full p-4">
                {children}
              </main>
            </div>
            <div className="flex-shrink-0">
              <Footer />
            </div>
          </div>
          <Toaster position="bottom-center" />
          <CookieConsent />
          {modal}
        </ThemeProvider>
        <Script
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
          async
        />
        {process.env.GOOGLE_TRANSLATION_CONFIG && (
          <Script
            src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
            strategy="afterInteractive"
            async
          />
        )}
      </body>
    </html>
  );
}
