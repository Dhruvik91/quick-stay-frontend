import { Accommodation } from "@/types/accommodation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Home,
} from "lucide-react";
import React from "react";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  Food: Utensils,
  Gym: Dumbbell,
  AC: "❄️",
  Security: Shield,
};

function formatPrice(price?: number) {
  if (!price) return undefined;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getTypeColor(type: Accommodation["type"]) {
  const colors = {
    PG: "bg-primary/10 text-primary border-primary/20",
    Rental: "bg-secondary/10 text-secondary border-secondary/20",
    Hostel: "bg-info/10 text-info border-info/20",
    "Co-living": "bg-success/10 text-success border-success/20",
  } as const;
  return (colors as any)[type];
}

function getPropertyTypeBadge(propertyType?: Accommodation["property_type"]) {
  if (!propertyType) return undefined;
  const mapping: Record<string, string> = {
    boys: "bg-blue-900 text-white border-blue-800",
    girls: "bg-pink-900 text-white border-pink-800",
    both: "bg-green-900 text-white border-green-800",
  };
  return mapping[propertyType] || "bg-foreground text-background";
}

export default function Details({ data }: { data: Accommodation }) {
  const images: string[] = Array.isArray(data.images)
    ? data.images
    : data.image_url
    ? [data.image_url]
    : [];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.address || ""
  )}`;

  return (
    <article className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <header className="mb-4 sm:mb-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-text-primary">
            {data.property_name || data.name}
          </h1>
          {data.price ? (
            <div className="px-3 py-1 rounded-full bg-background border border-border/50 text-sm sm:text-base font-semibold text-text-primary whitespace-nowrap">
              {formatPrice(data.price)}
              <span className="hidden sm:inline">/month</span>
            </div>
          ) : null}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn(getTypeColor(data.type))}>
            {data.type}
          </Badge>
          {data.property_type && (
            <Badge variant="outline" className={cn(getPropertyTypeBadge(data.property_type))}>
              {data.property_type === "boys" ? "Boys" : data.property_type === "girls" ? "Girls" : "Both"}
            </Badge>
          )}
          {data.verified && (
            <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/20">
              <Shield className="h-3.5 w-3.5" /> Verified
            </Badge>
          )}
        </div>
        <div className="mt-2 flex items-start text-text-secondary">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm sm:text-base">
            {data.address}
            {" "}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
              aria-label={`Open ${data.name} location in Google Maps`}
            >
              View on map
            </a>
          </span>
        </div>
      </header>

      {/* Gallery */}
      <section aria-label="Image gallery" className="mb-6 sm:mb-8">
        <div className="relative w-full h-56 sm:h-80 rounded-xl overflow-hidden bg-surface">
          {images.length > 0 ? (
            <Carousel className="h-full">
              <CarouselContent className="h-full">
                {images.map((src, idx) => (
                  <CarouselItem key={`${src}-${idx}`} className="h-full">
                    <img
                      src={src}
                      alt={`${data.name} image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" aria-label="Previous image" />
              <CarouselNext className="hidden sm:flex" aria-label="Next image" />
            </Carousel>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Home className="h-12 w-12 text-text-muted" />
            </div>
          )}
        </div>
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Description and Amenities */}
        <div className="lg:col-span-2 space-y-6">
          {data.description && (
            <div className="glass-card rounded-xl p-4 sm:p-6 border border-border/40 bg-background/60 backdrop-blur">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">About</h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          <div className="glass-card rounded-xl p-4 sm:p-6 border border-border/40 bg-background/60 backdrop-blur">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Amenities</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.amenities?.map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <li key={amenity} className="flex items-center gap-2 text-sm text-text-secondary">
                    {Icon && typeof Icon === "function" ? (
                      <Icon className="h-4 w-4" />
                    ) : typeof Icon === "string" ? (
                      <span className="text-base leading-none">{Icon}</span>
                    ) : null}
                    <span>{amenity}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right: Contact & Actions */}
        <aside className="space-y-4">
          <div className="glass-card rounded-xl p-4 sm:p-6 border border-border/40 bg-background/60 backdrop-blur">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Contact</h2>
            <div className="space-y-2 text-sm text-text-secondary">
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{data.email}</span>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {data.phone && (
                <Button asChild className="w-full">
                  <a href={`tel:${data.phone}`} aria-label={`Call ${data.name}`}>
                    <Phone className="h-4 w-4 mr-2" /> Call
                  </a>
                </Button>
              )}
              {data.email && (
                <Button variant="secondary" asChild className="w-full">
                  <a href={`mailto:${data.email}`} aria-label={`Email ${data.name}`}>
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </a>
                </Button>
              )}
            </div>
            <Separator className="my-4" />
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-primary hover:text-primary/80"
              aria-label={`Open ${data.name} location in Google Maps`}
            >
              View on map
            </a>
          </div>
        </aside>
      </section>
    </article>
  );
}
