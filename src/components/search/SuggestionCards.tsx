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
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Home,
    title: "PG Accommodations",
    subtitle: "Safe and affordable PG options",
    query: "PG accommodation",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Users,
    title: "Co-living Spaces",
    subtitle: "Modern shared living experiences",
    query: "co-living spaces",
    gradient: "from-info/20 to-info/5",
  },
  {
    icon: Building,
    title: "Student Hostels",
    subtitle: "Budget-friendly hostel options",
    query: "student hostels",
    gradient: "from-success/20 to-success/5",
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
                "p-4 sm:p-6 glass-card rounded-xl text-left transition-all duration-300",
                "hover:scale-[1.02] hover:bg-surface/90 focus:outline-none",
                "focus:ring-2 focus:ring-primary/50 group animate-fade-in",
                "touch-manipulation active:scale-[0.98]",
                `bg-gradient-to-br ${suggestion.gradient}`
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`Search for ${suggestion.query}`}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-background/50 rounded-lg group-hover:bg-background/70 transition-colors duration-200 flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200 text-sm sm:text-base">
                    {suggestion.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
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
