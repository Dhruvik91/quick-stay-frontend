import { Accommodation } from '@/types/accommodation';
import { AccommodationCard } from '../cards/AccommodationCard';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { LoadingGrid } from '../ui/LoadingGrid';

interface ResultsAreaProps {
  results: Accommodation[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

export function ResultsArea({ results, isLoading, error, query }: ResultsAreaProps) {
  if (isLoading) {
    return <LoadingGrid />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text-primary">
          Search Results
          <span className="ml-3 text-sm font-normal text-text-secondary">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </span>
        </h2>
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        role="region"
        aria-label="Search results"
      >
        {results.map((accommodation, index) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}