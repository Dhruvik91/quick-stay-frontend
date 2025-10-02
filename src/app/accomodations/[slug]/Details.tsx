"use client";

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
  ArrowLeft,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  Food: Utensils,
  Meals: Utensils,
  Gym: Dumbbell,
  AC: "❄️",
  Security: Shield,
  Laundry: "🧺",
  "Power Backup": "⚡",
  CCTV: "📹",
  Housekeeping: "🧹",
  "Community Events": "🎉",
  "Game Room": "🎮",
  "Study Room": "📚",
  "Swimming Pool": "🏊",
  "Modular Kitchen": "🍳",
  Balcony: "🏡",
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
    boys: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    girls: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    both: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  return mapping[propertyType] || "bg-foreground text-background";
}

export default function Details({ data }: { data: Accommodation }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const images: string[] = Array.isArray(data.images)
    ? data.images
    : data.image_url
    ? [data.image_url]
    : [];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.address || ""
  )}`;

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share({ title: data.property_name || data.name, url });
      } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        toast.success("Link copied");
      }
    } catch (e) {
      toast.error("Failed to share link");
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Back Button & Share */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 animate-fade-in">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm sm:text-base">Back to search</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="h-9 w-9 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10"
            aria-label="Share this accommodation"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Header */}
        <header className="mb-6 sm:mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-text-primary mb-3">
                {data.property_name || data.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className={cn("text-xs sm:text-sm font-medium", getTypeColor(data.type))}>
                  {data.type}
                </Badge>
                {data.property_type && (
                  <Badge variant="outline" className={cn("text-xs sm:text-sm font-medium", getPropertyTypeBadge(data.property_type))}>
                    {data.property_type === "boys" ? "Boys Only" : data.property_type === "girls" ? "Girls Only" : "Co-ed"}
                  </Badge>
                )}
                {data.verified && (
                  <Badge variant="outline" className="gap-1.5 bg-success/10 text-success border-success/30 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                  </Badge>
                )}
              </div>
            </div>
            {data.price && (
              <div className="glass-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-border/40 bg-surface/80 backdrop-blur-md shadow-glass">
                <div className="text-xs sm:text-sm text-text-secondary mb-1">Starting from</div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient">
                  {formatPrice(data.price)}
                </div>
                <div className="text-xs sm:text-sm text-text-muted">/month</div>
              </div>
            )}
          </div>
          <div className="flex items-start gap-2 text-text-secondary">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
            <div className="flex-1">
              <p className="text-sm sm:text-base leading-relaxed">{data.address}</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-xs sm:text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                aria-label={`Open ${data.name} location in Google Maps`}
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </header>

        {/* Gallery */}
        <section aria-label="Image gallery" className="mb-6 sm:mb-8 lg:mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-surface shadow-glass border border-border/30">
            {images.length > 0 ? (
              <Carousel className="h-full">
                <CarouselContent className="h-full">
                  {images.map((src, idx) => (
                    <CarouselItem key={`${src}-${idx}`} className="h-full">
                      <div className="relative h-full w-full">
                        <img
                          src={src}
                          alt={`${data.name} image ${idx + 1}`}
                          className={cn(
                            "w-full h-full object-cover transition-opacity duration-500",
                            imageLoaded ? "opacity-100" : "opacity-0"
                          )}
                          onLoad={() => setImageLoaded(true)}
                        />
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-surface animate-pulse" />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 sm:left-4 h-8 w-8 sm:h-10 sm:w-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" aria-label="Previous image" />
                <CarouselNext className="right-2 sm:right-4 h-8 w-8 sm:h-10 sm:w-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" aria-label="Next image" />
              </Carousel>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Home className="h-16 w-16 sm:h-20 sm:w-20 text-text-muted mb-2" />
                <p className="text-sm text-text-muted">No images available</p>
              </div>
            )}
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left: Description and Amenities */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {data.description && (
              <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 border border-border/40 bg-surface/80 backdrop-blur-md shadow-glass animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-text-primary flex items-center gap-2">
                  <span className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                  About this property
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {data.description}
                </p>
              </div>
            )}

            <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 border border-border/40 bg-surface/80 backdrop-blur-md shadow-glass animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-text-primary flex items-center gap-2">
                <span className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                Amenities & Facilities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {data.amenities?.map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <li 
                      key={amenity} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-all duration-200 hover:bg-background/70"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {Icon && typeof Icon === "function" ? (
                          <Icon className="h-4 w-4 text-primary" />
                        ) : typeof Icon === "string" ? (
                          <span className="text-lg leading-none">{Icon}</span>
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base text-text-primary font-medium">{amenity}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right: Contact & Actions */}
          <aside className="space-y-4 sm:space-y-6">
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-border/40 bg-surface/80 backdrop-blur-md shadow-glass sticky top-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-text-primary">Contact Details</h2>
              
              {(data.phone || data.email) && (
                <div className="space-y-3 mb-6">
                  {data.phone && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-text-muted mb-0.5">Phone</p>
                        <p className="text-sm sm:text-base text-text-primary font-medium truncate">{data.phone}</p>
                      </div>
                    </div>
                  )}
                  {data.email && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-text-muted mb-0.5">Email</p>
                        <p className="text-sm sm:text-base text-text-primary font-medium truncate">{data.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {data.phone && (
                  <Button 
                    asChild 
                    className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold shadow-glow hover:shadow-glow-amber transition-all duration-300"
                  >
                    <a href={`tel:${data.phone}`} aria-label={`Call ${data.name}`}>
                      <Phone className="h-4 w-4 mr-2" /> Call Now
                    </a>
                  </Button>
                )}
                {data.email && (
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold border-border/50 hover:border-primary/50 hover:bg-primary/10"
                  >
                    <a href={`mailto:${data.email}`} aria-label={`Email ${data.name}`}>
                      <Mail className="h-4 w-4 mr-2" /> Send Email
                    </a>
                  </Button>
                )}
              </div>

              <Separator className="my-6 bg-border/50" />

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-sm sm:text-base text-primary font-medium group"
                aria-label={`Open ${data.name} location in Google Maps`}
              >
                <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                Open in Google Maps
              </a>
            </div>
          </aside>
        </section>
      </div>
    </article>
  );
}
