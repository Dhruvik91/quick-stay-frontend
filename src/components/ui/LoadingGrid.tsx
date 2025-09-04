"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LoadingGrid() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-surface/50 rounded animate-pulse" />
        <div className="flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading results...</span>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="status"
        aria-label="Loading search results"
      >
        {Array.from({ length: 8 }, (_, index) => (
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
        "glass-card rounded-xl overflow-hidden animate-pulse border border-border/50",
        "animate-slide-up hover:shadow-lg transition-all duration-300"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-br from-surface/30 to-surface/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-surface/50 rounded" />
          <div className="h-4 w-full bg-surface/30 rounded" />
          <div className="h-4 w-1/2 bg-surface/30 rounded" />
        </div>

        <div className="h-4 w-full bg-surface/30 rounded" />

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }, (_, i) => (
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
