import { Metadata } from "next";
import { notFound } from "next/navigation";
import http from "@/lib/httpService";
import { API_CONFIG, dummyAccommodations } from "@/constants";
import type { Accommodation } from "@/types/accommodation";
import Details from "./Details";

type PageParams = {
  params: { slug: string };
};

async function fetchById(id: string): Promise<Accommodation | null> {
  try {
    if (!API_CONFIG.baseUrl) throw new Error("No API baseUrl");
    const res = await http.get<Accommodation>(`${API_CONFIG.path.accommodations}/${id}`);
    return (res.data?.data as any) || null;
  } catch {
    // Fallback to dummy data
    const item = dummyAccommodations.find((a) => a.id === id) || null;
    return item as unknown as Accommodation | null;
  }
}

function parseIdFromSlug(slug: string): string | null {
  // Expecting pattern: some-name-<id>
  const parts = slug.split("-");
  const id = parts.pop();
  if (!id) return null;
  return id;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const id = parseIdFromSlug(params.slug);
  if (!id) return { title: "Accommodation" };
  const data = dummyAccommodations.find((a) => a.slug === params.slug);
  if (!data) return { title: "Accommodation" };

  const title = `${data.property_name || data.name} (${data.type})`;
  const description = data.description || `${data.name} - ${data.address}`;
  const image = (Array.isArray(data.images) && data.images[0]) || undefined;
  const url = `https://www.quickstay.homes/accomodations/${params.slug}`;

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
  const id = parseIdFromSlug(params.slug);
  if (!id) return notFound();
  const data = await fetchById(id);
  if (!data) return notFound();
  return <Details data={data} />;
}

