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
        "h-full flex flex-col touch-manipulation"
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Image Section */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        {accommodation.image_url && !imageError ? (
          <>
            <img
              src={accommodation.image_url}
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
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex space-x-2 z-10">
          {accommodation.verified && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/90 text-success border border-success/20 flex items-center space-x-1">
              <Shield className="h-3 w-3 text-white" />
              <span className="text-white hidden sm:inline">Verified</span>
              <span className="text-white sm:hidden">✓</span>
            </span>
          )}
        </div>

        {accommodation.price && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full z-10">
            <span className="text-xs sm:text-sm font-semibold text-text-primary">
              <span className="hidden sm:inline">
                {formatPrice(accommodation.price)}/month
              </span>
              <span className="sm:hidden">
                {formatPrice(accommodation.price)}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 leading-tight">
              {accommodation.name}
            </h3>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0",
                getTypeColor(accommodation.type)
              )}
            >
              {accommodation.type}
            </span>
          </div>

          <div className="flex items-start text-text-secondary">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">
              {accommodation.address}
            </span>
          </div>

          {/* Contact Information */}
          {(accommodation.email || accommodation.phone) && (
            <div className="flex items-start text-text-secondary">
              <User className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">
                {accommodation.phone && `Phone: ${accommodation.phone}`}
                {accommodation.phone && accommodation.email && " • "}
                {accommodation.email && `Email: ${accommodation.email}`}
              </span>
            </div>
          )}

          {/* {accommodation.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-secondary fill-current" />
                <span className="ml-1 text-sm font-medium text-text-primary">
                  {accommodation.rating}
                </span>
              </div>
            </div>
          )} */}
        </div>

        {/* Description */}
        {accommodation.description && (
          <p className="text-sm text-text-secondary line-clamp-2 flex-1">
            {accommodation.description}
          </p>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
          {accommodation.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <span
                key={amenity}
                className="px-2 sm:px-3 py-1 bg-background/50 rounded-full text-xs text-text-secondary border border-border/50 flex items-center space-x-1"
              >
                {Icon && typeof Icon === "function" ? (
                  <Icon className="h-3 w-3" />
                ) : typeof Icon === "string" ? (
                  <span className="text-xs">{Icon}</span>
                ) : null}
                <span className="hidden sm:inline">{amenity}</span>
                <span className="sm:hidden">{amenity.charAt(0)}</span>
              </span>
            );
          })}
          {accommodation.amenities.length > 3 && (
            <span className="px-2 sm:px-3 py-1 bg-primary/10 rounded-full text-xs text-primary border border-primary/20">
              <span className="hidden sm:inline">
                +{accommodation.amenities.length - 3} more
              </span>
              <span className="sm:hidden">
                +{accommodation.amenities.length - 3}
              </span>
            </span>
          )}
        </div>

        {/* Contact Actions */}
        {(accommodation.phone || accommodation.email) && (
          <div className="flex space-x-2 pt-2 mt-auto">
            {accommodation.phone && (
              <a
                href={`tel:${accommodation.phone}`}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 px-3 sm:px-4",
                  "bg-primary/10 text-primary rounded-lg border border-primary/20",
                  "hover:bg-primary/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "touch-manipulation"
                )}
                aria-label={`Call ${accommodation.name}`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Call</span>
              </a>
            )}

            {accommodation.email && (
              <a
                href={`mailto:${accommodation.email}`}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 px-3 sm:px-4",
                  "bg-secondary/10 text-secondary rounded-lg border border-secondary/20",
                  "hover:bg-secondary/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-secondary/50",
                  "touch-manipulation"
                )}
                aria-label={`Email ${accommodation.name}`}
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Email</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
