'use client';

import { MapPin, Home, Users, Building } from 'lucide-react';

interface SuggestionCardsProps {
  onSuggestionClick: (query: string) => void;
}

const suggestions = [
  {
    icon: MapPin,
    title: 'Search by Location',
    subtitle: 'Koramangala, HSR Layout, Indiranagar',
    query: 'Koramangala PG',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Home,
    title: 'PG Accommodations',
    subtitle: 'Safe and affordable PG options',
    query: 'PG accommodation',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Users,
    title: 'Co-living Spaces',
    subtitle: 'Modern shared living experiences',
    query: 'co-living spaces',
    gradient: 'from-info/20 to-info/5',
  },
  {
    icon: Building,
    title: 'Student Hostels',
    subtitle: 'Budget-friendly hostel options',
    query: 'student hostels',
    gradient: 'from-success/20 to-success/5',
  },
];

export function SuggestionCards({ onSuggestionClick }: SuggestionCardsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
        Popular Searches
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          
          return (
            <button
              key={suggestion.title}
              onClick={() => onSuggestionClick(suggestion.query)}
              className={cn(
                'p-6 glass-card rounded-xl text-left transition-all duration-300',
                'hover:scale-[1.02] hover:bg-surface/90 focus:outline-none',
                'focus:ring-2 focus:ring-primary/50 group animate-fade-in',
                `bg-gradient-to-br ${suggestion.gradient}`
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`Search for ${suggestion.query}`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-background/50 rounded-lg group-hover:bg-background/70 transition-colors duration-200">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
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
  return classes.filter(Boolean).join(' ');
}