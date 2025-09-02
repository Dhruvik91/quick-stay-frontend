"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Shield,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Home,
  User,
} from "lucide-react";
import { Accommodation } from "@/types/accommodation";
import { cn } from "@/lib/utils";

interface AccommodationCardProps {
  accommodation: Accommodation;
  animationDelay?: number;
}

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  Food: Utensils,
  Gym: Dumbbell,
  AC: "❄️",
  Security: Shield,
};

export function AccommodationCard({
  accommodation,
  animationDelay = 0,
}: AccommodationCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeColor = (type: Accommodation["type"]) => {
    const colors = {
      PG: "bg-primary/10 text-primary border-primary/20",
      Rental: "bg-secondary/10 text-secondary border-secondary/20",
      Hostel: "bg-info/10 text-info border-info/20",
      "Co-living": "bg-success/10 text-success border-success/20",
    };
    return colors[type];
  };

  return (
    <article
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-glass group animate-slide-up",
        "focus-within:ring-2 focus-within:ring-primary/50",
        "h-full flex flex-col"
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {accommodation.imageUrl && !imageError ? (
          <>
            <img
              src={accommodation.imageUrl}
              alt={`${accommodation.name} accommodation`}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                "group-hover:scale-110",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <Home className="h-12 w-12 text-text-muted" />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          {accommodation.verified && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/90 text-success border border-success/20 flex items-center space-x-1">
              <Shield className="h-3 w-3 text-white" />
              <span className="text-white">Verified</span>
            </span>
          )}
        </div>

        {accommodation.price && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full z-10">
            <span className="text-sm font-semibold text-text-primary">
              {formatPrice(accommodation.price)}/month
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
            {accommodation.name}
          </h3>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border",
              getTypeColor(accommodation.type)
            )}
          >
            {accommodation.type}
          </span>
          </div>
         

          <div className="flex items-center text-text-secondary">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{accommodation.address}</span>
          </div>

          {/* Owner Information */}
          {accommodation.owner && (
            <div className="flex items-center text-text-secondary">
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Owner: {accommodation.owner}</span>
            </div>
          )}

          {accommodation.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-secondary fill-current" />
                <span className="ml-1 text-sm font-medium text-text-primary">
                  {accommodation.rating}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {accommodation.description && (
          <p className="text-sm text-text-secondary line-clamp-2 flex-1">
            {accommodation.description}
          </p>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {accommodation.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <span
                key={amenity}
                className="px-3 py-1 bg-background/50 rounded-full text-xs text-text-secondary border border-border/50 flex items-center space-x-1"
              >
                {Icon && typeof Icon === "function" ? (
                  <Icon className="h-3 w-3" />
                ) : typeof Icon === "string" ? (
                  <span className="text-xs">{Icon}</span>
                ) : null}
                <span>{amenity}</span>
              </span>
            );
          })}
          {accommodation.amenities.length > 4 && (
            <span className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary border border-primary/20">
              +{accommodation.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Contact Actions */}
        {accommodation.contact && (
          <div className="flex space-x-2 pt-2 mt-auto">
            {accommodation.contact.phone && (
              <a
                href={`tel:${accommodation.contact.phone}`}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-2 px-4",
                  "bg-primary/10 text-primary rounded-lg border border-primary/20",
                  "hover:bg-primary/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
                aria-label={`Call ${accommodation.name}`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Call</span>
              </a>
            )}

            {accommodation.contact.email && (
              <a
                href={`mailto:${accommodation.contact.email}`}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-2 px-4",
                  "bg-secondary/10 text-secondary rounded-lg border border-secondary/20",
                  "hover:bg-secondary/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-secondary/50"
                )}
                aria-label={`Email ${accommodation.name}`}
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">Email</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
