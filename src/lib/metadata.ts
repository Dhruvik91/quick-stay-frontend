import type { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  canonical,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
}: GenerateMetadataProps): Metadata {
  const baseUrl = "https://quickstay.com";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: fullCanonical,
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
    },
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
  };
}

// Helper functions for common page types
export function generateSearchMetadata(
  query: string,
  location?: string,
  resultsCount?: number
): Metadata {
  const title = location
    ? `${query} in ${location} - Quick Stay`
    : `${query} Accommodations - Quick Stay`;

  const description = location
    ? `Find ${
        resultsCount ? `${resultsCount}+ ` : ""
      }${query} accommodations in ${location}. Search and compare PG, hostels, and co-living spaces with Quick Stay.`
    : `Discover ${
        resultsCount ? `${resultsCount}+ ` : ""
      }${query} accommodations. Search and compare PG, hostels, and co-living spaces with Quick Stay.`;

  const canonical = location
    ? `/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(
        location
      )}`
    : `/search?q=${encodeURIComponent(query)}`;

  return generateMetadata({
    title,
    description,
    canonical,
  });
}

export function generateAccommodationMetadata(
  name: string,
  description: string,
  location: string,
  price: string,
  image?: string
): Metadata {
  const title = `${name} in ${location} - Quick Stay`;
  const fullDescription = `${description} Starting from ${price}. Book now on Quick Stay.`;
  const canonical = `/accommodation/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return generateMetadata({
    title,
    description: fullDescription,
    canonical,
    image,
    type: "article",
  });
}
