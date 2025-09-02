'use client';

import { Search, Home } from 'lucide-react';

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-surface/50 rounded-full flex items-center justify-center">
            <Search className="h-10 w-10 text-text-muted" />
          </div>
          {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Home className="h-4 w-4 text-primary" />
          </div> */}
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No results found
        </h3>
        
        <p className="text-text-secondary mb-4">
          We couldn't find any accommodations matching "{query}". 
          Try searching for a different location or accommodation type.
        </p>
        
        <div className="text-sm text-text-muted">
          <p>Try searching for:</p>
          <ul className="mt-2 space-y-1">
            <li>• Specific locations (e.g., "Koramangala", "HSR Layout")</li>
            <li>• Accommodation types (e.g., "PG", "hostel", "co-living")</li>
            <li>• Amenities (e.g., "WiFi", "gym", "food")</li>
          </ul>
        </div>
      </div>
    </div>
  );
}