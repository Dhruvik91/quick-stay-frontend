import { DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  title: "Quick Stay - Find Your Perfect Accommodation",
  titleTemplate: "%s | Quick Stay",
  description:
    "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform. Find your perfect stay today.",
  canonical: "https://quickstay.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quickstay.com",
    siteName: "Quick Stay",
    title: "Quick Stay - Find Your Perfect Accommodation",
    description:
      "Search and discover PG accommodations, rentals, hostels, and co-living spaces with our modern, intuitive platform.",
    images: [
      {
        url: "https://quickstay.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quick Stay - Find Your Perfect Accommodation",
      },
    ],
  },
  twitter: {
    handle: "@quickstay",
    site: "@quickstay",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "PG accommodation, rentals, hostels, co-living, search, booking, stay, accommodation finder, student housing, shared living",
    },
    {
      name: "author",
      content: "Quick Stay",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};
