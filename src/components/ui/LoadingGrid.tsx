'use client';

import { cn } from '@/lib/utils';

export function LoadingGrid() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-surface/50 rounded animate-pulse" />
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        role="status"
        aria-label="Loading search results"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <LoadingCard key={index} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}

function LoadingCard({ delay }: { delay: number }) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl overflow-hidden animate-pulse',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image skeleton */}
      <div className="h-48 bg-surface/50" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-surface/50 rounded" />
          <div className="h-4 w-full bg-surface/30 rounded" />
          <div className="h-4 w-1/2 bg-surface/30 rounded" />
        </div>
        
        <div className="h-4 w-full bg-surface/30 rounded" />
        
        <div className="flex space-x-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-6 w-16 bg-surface/30 rounded-full" />
          ))}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <div className="h-8 flex-1 bg-surface/30 rounded-lg" />
          <div className="h-8 flex-1 bg-surface/30 rounded-lg" />
        </div>
      </div>
    </div>
  );
}