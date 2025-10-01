import { SearchContainer } from "@/components/search/SearchContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Perfect Accommodation",
  description:
    "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform. Find your perfect stay today with Quick Stay.",
  openGraph: {
    title: "Find Your Perfect Accommodation - Quick Stay",
    description:
      "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform.",
    url: "https://www.quickstay.homes/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.quickstay.homes/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SearchContainer />
    </main>
  );
}
