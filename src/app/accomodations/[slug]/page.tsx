import { Metadata } from "next";
import { notFound } from "next/navigation";
import http from "@/lib/httpService";
import { API_CONFIG, dummyAccommodations } from "@/constants";
import type { Accommodation } from "@/types/accommodation";
import Details from "./Details";

type PageParams = {
  params: { slug: string };
};

async function fetchBySlug(slug: string): Promise<Accommodation | null> {
  try {
    if (!API_CONFIG.baseUrl) throw new Error("No API baseUrl");
    const res = await http.get<Accommodation>(`${API_CONFIG.path.users}/${slug}`);
    return (res.data?.data as any) || null;
  } catch {
    // Fallback to dummy data
    const item = dummyAccommodations.find((a) => a.slug === slug) || null;
    return item as unknown as Accommodation | null;
  }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const slug = params.slug;
  if (!slug) return { title: "Accommodation" };
  const data = await fetchBySlug(slug)
  if (!data) return { title: "Accommodation" };

  const title = `${data.property_name || data.name} (${data.type})`;
  const description = data.description || `${data.name} - ${data.address}`;
  const image = (Array.isArray(data.images) && data.images[0]) || undefined;
  const url = `https://www.quickstay.homes/accomodations/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({ params }: PageParams) {
  const slug = params.slug;
  if (!slug) return notFound();
  const data = await fetchBySlug(slug);
  if (!data) return notFound();
  return <Details data={data} />;
}

