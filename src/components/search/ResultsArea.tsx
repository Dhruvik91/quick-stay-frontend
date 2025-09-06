"use client";

import { useEffect, useRef, useCallback } from "react";
import { Accommodation } from "@/types/accommodation";
import { AccommodationCard } from "../cards/AccommodationCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import { LoadingGrid } from "../ui/LoadingGrid";
import { Button } from "../ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface ResultsAreaProps {
  results: Accommodation[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
  query: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
}

export function ResultsArea({
  results,
  totalResults,
  isLoading,
  error,
  query,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  refetch,
}: ResultsAreaProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "100px",
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading && results.length === 0) {
    return <LoadingGrid />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorState message={error} />
        {refetch && (
          <div className="flex justify-center">
            <Button
              onClick={refetch}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (results.length === 0 && !isLoading) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Search Results
          </h2>
          <span className="text-sm font-normal text-text-secondary">
            {totalResults} {totalResults === 1 ? "result" : "results"} found
          </span>
        </div>
        {refetch && (
          <Button
            onClick={refetch}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 self-start sm:self-auto touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </Button>
        )}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        role="region"
        aria-label="Search results"
      >
        {results.map((accommodation, index) => (
          <AccommodationCard
            key={`${accommodation.id}-${index}`}
            accommodation={accommodation}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={observerRef} className="flex justify-center py-6 sm:py-8">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-text-secondary text-sm sm:text-base">
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              <span className="hidden sm:inline">Loading more results...</span>
              <span className="sm:hidden">Loading...</span>
            </div>
          ) : (
            <Button
              onClick={fetchNextPage}
              variant="outline"
              className="flex items-center gap-2 touch-manipulation"
              size="sm"
            >
              <span className="text-sm">Load More Results</span>
            </Button>
          )}
        </div>
      )}

      {/* End of results */}
      {!hasNextPage && results.length > 0 && (
        <div className="text-center py-6 sm:py-8 text-text-secondary">
          <p className="text-sm sm:text-base">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
}
