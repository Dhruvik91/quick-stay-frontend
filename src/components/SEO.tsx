"use client";

import { NextSeo } from "next-seo";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  image?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  image,
}: SEOProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      noindex={noindex}
      nofollow={nofollow}
      openGraph={{
        title,
        description,
        url: canonical,
        type: "website",
        ...(image && {
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }),
      }}
      twitter={{
        cardType: "summary_large_image",
        ...(image && { image }),
      }}
    />
  );
};
