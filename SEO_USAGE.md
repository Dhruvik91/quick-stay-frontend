# Next SEO Integration - Usage Guide

## ✅ What's Been Implemented

Your Quick Stay project now has Next SEO fully integrated for Google search optimization using Next.js 13+ App Router best practices:

### 1. **Global SEO Setup**

- Comprehensive metadata configuration in `layout.tsx`
- Includes Open Graph, Twitter Cards, and search engine optimization
- Proper robots and indexing directives

### 2. **Homepage SEO**

- Specific SEO metadata for the main page
- Optimized title and description for search engines

### 3. **Technical SEO**

- Sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)

### 4. **Dynamic Metadata Utilities**

- `generateMetadata` function for dynamic pages
- Specialized functions for search and accommodation pages

## 🚀 How to Use

### For Static Pages

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Quick Stay",
  description:
    "Learn about Quick Stay's mission to help you find perfect accommodations.",
  alternates: {
    canonical: "https://quickstay.com/about",
  },
};

export default function AboutPage() {
  return <main>{/* Your page content */}</main>;
}
```

### For Search Results Pages

```tsx
import { generateSearchMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface SearchPageProps {
  searchParams: {
    q: string;
    location?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  return generateSearchMetadata(searchParams.q, searchParams.location);
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return <main>{/* Your search results */}</main>;
}
```

### For Accommodation Pages

```tsx
import { generateAccommodationMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface AccommodationPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: AccommodationPageProps): Promise<Metadata> {
  // Fetch accommodation data
  const accommodation = await getAccommodation(params.id);

  return generateAccommodationMetadata(
    accommodation.name,
    accommodation.description,
    accommodation.location,
    accommodation.price,
    accommodation.image
  );
}

export default function AccommodationPage({ params }: AccommodationPageProps) {
  return <main>{/* Your accommodation content */}</main>;
}
```

### For Dynamic Pages with Custom Metadata

```tsx
import { generateMetadata as generateCustomMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return generateCustomMetadata({
    title: "Custom Page Title",
    description: "Custom page description",
    canonical: `/custom/${params.slug}`,
    image: "/custom-image.jpg",
  });
}

export default function CustomPage() {
  return <main>{/* Your page content */}</main>;
}
```

## 🔧 Configuration

### Update Your Domain

In `src/app/layout.tsx`, change `https://quickstay.com` to your actual domain:

```typescript
export const metadata: Metadata = {
  // ... other config
  openGraph: {
    url: "https://yourdomain.com", // Update this
    // ... rest of config
  },
  alternates: {
    canonical: "https://yourdomain.com", // Update this
  },
};
```

Also update the base URL in `src/lib/metadata.ts`:

```typescript
const baseUrl = "https://yourdomain.com"; // Update this
```

### Add Images

Add these files to your `public` folder:

- `favicon.ico` - Website favicon
- `apple-touch-icon.png` (180x180px) - Apple touch icon
- `og-image.jpg` (1200x630px) - Open Graph image

## 📊 SEO Benefits

✅ **Search Engine Optimization**

- Proper meta tags for Google indexing
- Structured data for rich snippets
- Canonical URLs to prevent duplicate content

✅ **Social Media Sharing**

- Open Graph tags for Facebook/LinkedIn
- Twitter Card support
- Optimized images for social sharing

✅ **Technical SEO**

- Sitemap for search engine crawling
- Robots.txt for crawl instructions
- Mobile-friendly meta viewport

✅ **Performance**

- Minimal overhead
- Fast loading
- Optimized for Core Web Vitals

## 🎯 Next Steps

1. **Update Domain**: Change `quickstay.com` to your actual domain
2. **Add Images**: Add favicon and social media images
3. **Test SEO**: Use Google Search Console and PageSpeed Insights
4. **Monitor**: Track your search rankings and performance

Your project is now fully optimized for Google search and SEO! 🚀
