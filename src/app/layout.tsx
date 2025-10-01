import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Logo } from "@/components/ui/Logo";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Quick Stay - Find Your Perfect Accommodation",
    template: "%s | Quick Stay",
  },
  description:
    "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform. Find your perfect stay today.",
  keywords: [
    "PG accommodation",
    "rentals",
    "hostels",
    "co-living",
    "search",
    "booking",
    "stay",
    "accommodation finder",
    "student housing",
    "shared living",
  ],
  authors: [{ name: "Quick Stay" }],
  creator: "Quick Stay",
  publisher: "Quick Stay",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.quickstay.homes/",
    siteName: "Quick Stay",
    title: "Quick Stay - Find Your Perfect Accommodation",
    description:
      "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform.",
    images: [
      {
        url: "https://www.quickstay.homes/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quick Stay - Find Your Perfect Accommodation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Stay - Find Your Perfect Accommodation",
    description:
      "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform.",
    creator: "@quickstay",
    site: "@quickstay",
    images: ["https://www.quickstay.homes/og-image.jpg"],
  },
  verification: {
    google: "5PXvLWILhAf9I0H499SHg_KebXZ5XZRHi5r1JTPAZvo",
  },
  alternates: {
    canonical: "https://www.quickstay.homes/",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Logo size="md" showText={true} />
          </div>
        </nav>

        <div>
          <QueryProvider>{children}</QueryProvider>
        </div>

        {/* Sticky Footer with InfoBanner */}
        <footer className="sticky bottom-0 z-50 w-full bg-background">
          <InfoBanner />
        </footer>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
