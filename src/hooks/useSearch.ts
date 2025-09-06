import { useState, useCallback, useMemo, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  AccommodationSearchParams,
  AccommodationSearchResponse,
  Accommodation,
  SearchState,
} from "@/types/accommodation";
import httpService from "@/lib/httpService";
import { API_CONFIG } from "@/constants";

// Extended SearchFilters interface to match what the components expect
export interface SearchFilters {
  type?: "PG" | "Rental" | "Hostel" | "Co-living";
  verified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  amenities?: string[];
}

interface UseAccommodationSearchOptions {
  searchParams: AccommodationSearchParams;
  enabled?: boolean;
}

export const useAccommodationSearch = ({
  searchParams,
  enabled = true,
}: UseAccommodationSearchOptions) => {
  return useInfiniteQuery({
    queryKey: ["accommodations", searchParams],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        ...searchParams,
        offset: pageParam,
        limit: searchParams.limit || 10,
      };

      // Remove undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );

      const response = await httpService.get<AccommodationSearchResponse>(
        API_CONFIG.path.users,
        { params: cleanParams }
      );

      return response.data;
    },
    getNextPageParam: (lastPage: any) => {
      const { pagination } = lastPage.data;
      return pagination.hasMore
        ? pagination.offset + pagination.limit
        : undefined;
    },
    initialPageParam: 0,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper hook to get flattened results
export const useAccommodationSearchResults = (
  options: UseAccommodationSearchOptions
) => {
  const query = useAccommodationSearch(options);

  const accommodations: Accommodation[] =
    query.data?.pages.flatMap((page: any) => page.data.users) ?? [];

  const totalCount = query.data?.pages[0]?.data.pagination.total ?? 0;
  const hasNextPage = query.hasNextPage;
  const isFetchingNextPage = query.isFetchingNextPage;

  return {
    ...query,
    accommodations,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
  };
};

// Main useSearch hook that integrates with the search components
export const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    filters: {},
  });

  const [filters, setFilters] = useState<SearchFilters>({});

  // Convert filters to search params
  const searchParams: AccommodationSearchParams = useMemo(
    () => ({
      search: searchState.query || undefined,
      type: filters.type,
      verified: filters.verified,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      limit: 10,
    }),
    [searchState.query, filters]
  );

  // Use the accommodation search hook
  const {
    accommodations,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = useAccommodationSearchResults({
    searchParams,
    enabled:
      typeof window !== "undefined" &&
      searchState.hasSearched &&
      searchState.query.length > 0,
  });

  // Update search state when query results change
  useEffect(() => {
    if (searchState.hasSearched) {
      setSearchState((prev) => ({
        ...prev,
        results: accommodations,
        isLoading,
        error: error?.message || null,
      }));
    }
  }, [accommodations, isLoading, error, searchState.hasSearched]);

  const searchAccommodations = useCallback(async (query: string) => {
    setSearchState((prev) => ({
      ...prev,
      query,
      isLoading: true,
      error: null,
      hasSearched: true,
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState({
      query: "",
      results: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      filters: {},
    });
    setFilters({});
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    searchState: { ...searchState, filters },
    searchAccommodations,
    clearSearch,
    updateFilters,
    results: accommodations,
    totalResults: totalCount,
    isLoading,
    error: error?.message || null,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
};

// Example usage:
/*
const MyComponent = () => {
  const searchParams: AccommodationSearchParams = {
    type: 'PG',
    verified: true,
    minPrice: 10000,
    maxPrice: 20000,
    search: 'bangalore',
    limit: 10
  };

  const {
    accommodations,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    fetchNextPage
  } = useAccommodationSearchResults({ searchParams });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>Total: {totalCount} accommodations</div>
      {accommodations.map(accommodation => (
        <div key={accommodation.id}>
          <h3>{accommodation.name}</h3>
          <p>{accommodation.address}</p>
          <p>Price: ₹{accommodation.price}</p>
          <p>Rating: {accommodation.rating}/5</p>
        </div>
      ))}
      {hasNextPage && (
        <button onClick={handleLoadMore} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
*/
