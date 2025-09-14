"use client";

import { MapPin, Home, Users, Building } from "lucide-react";

interface SuggestionCardsProps {
  onSuggestionClick: (query: string) => void;
}

const suggestions = [
  {
    icon: MapPin,
    title: "Search by Location",
    subtitle: "Koramangala, HSR Layout, Indiranagar",
    query: "Koramangala PG",
  },
  {
    icon: Home,
    title: "PG Accommodations",
    subtitle: "Safe and affordable PG options",
    query: "PG accommodation",
  },
  {
    icon: Users,
    title: "Co-living Spaces",
    subtitle: "Modern shared living experiences",
    query: "co-living spaces",
  },
  {
    icon: Building,
    title: "Student Hostels",
    subtitle: "Budget-friendly hostel options",
    query: "student hostels",
  },
];

export function SuggestionCards({ onSuggestionClick }: SuggestionCardsProps) {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-0">
      <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4 sm:mb-6 text-center">
        Popular Searches
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;

          return (
            <button
              key={suggestion.title}
              onClick={() => onSuggestionClick(suggestion.query)}
              className={cn(
                "p-4 sm:p-6 rounded-xl text-left transition-all duration-300",
                "hover:scale-[1.02] focus:outline-none",
                "focus:ring-2 focus:ring-primary/50 group/search-divs animate-fade-in",
                "touch-manipulation active:scale-[0.98]",
                // Glass morphic effect styles
                " bg-black/10 backdrop-blur-lg",
                "border border-white/20 border-opacity-30",
                "shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`Search for ${suggestion.query}`}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-primary/20 rounded-lg group-hover/search-divs:bg-primary/30 transition-colors duration-200 flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-1 group-hover/search-divs:text-white/90 transition-colors duration-200 text-sm sm:text-base">
                    {suggestion.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {suggestion.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}