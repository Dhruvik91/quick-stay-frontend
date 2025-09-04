"use client";

import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { Accommodation } from "@/types/accommodation";

export interface SearchFilters {
  type?: "PG" | "Rental" | "Hostel" | "Co-living";
  verified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

interface UsersResponse {
  users: Accommodation[];
  total: number;
}

const ITEMS_PER_PAGE = 12;

export function useSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {},
    isLoading: false,
    error: null,
    hasSearched: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery<UsersResponse>({
    queryKey: ["users", searchState.query, searchState.filters],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams();

      // Add search query
      if (searchState.query.trim()) {
        params.append("search", searchState.query.trim());
      }

      // Add filters
      if (searchState.filters.type) {
        params.append("type", searchState.filters.type);
      }
      if (searchState.filters.verified !== undefined) {
        params.append("verified", searchState.filters.verified.toString());
      }
      if (searchState.filters.minPrice !== undefined) {
        params.append("minPrice", searchState.filters.minPrice.toString());
      }
      if (searchState.filters.maxPrice !== undefined) {
        params.append("maxPrice", searchState.filters.maxPrice.toString());
      }

      // Add pagination
      params.append("limit", ITEMS_PER_PAGE.toString());
      params.append(
        "offset",
        ((pageParam as number) * ITEMS_PER_PAGE).toString()
      );

      const response = await httpService.get<UsersResponse>(
        `/api/users?${params.toString()}`
      );
      return response.data.data;
    },
    getNextPageParam: (lastPage: UsersResponse, allPages) => {
      const totalPages = Math.ceil(lastPage.total / ITEMS_PER_PAGE);
      const nextPage = allPages.length;
      return nextPage < totalPages ? nextPage : undefined;
    },
    enabled: searchState.hasSearched,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
  });

  const searchAccommodations = useCallback(
    async (query: string, filters: SearchFilters = {}) => {
      if (!query.trim() && Object.keys(filters).length === 0) {
        setSearchState((prev) => ({
          ...prev,
          query: "",
          filters: {},
          hasSearched: false,
        }));
        return;
      }

      setSearchState((prev) => ({
        ...prev,
        query: query.trim(),
        filters,
        hasSearched: true,
      }));
    },
    []
  );

  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      hasSearched: true,
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState({
      query: "",
      filters: {},
      isLoading: false,
      error: null,
      hasSearched: false,
    });
  }, []);

  // Flatten all pages data
  const allResults = data?.pages.flatMap((page) => page.users) || [];
  const totalResults = data?.pages[0]?.total || 0;

  return {
    searchState,
    searchAccommodations,
    updateFilters,
    clearSearch,
    results: allResults,
    totalResults,
    isLoading,
    error: error?.message || null,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
}
