"use client";

import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { ResultsArea } from "./ResultsArea";
import { SuggestionCards } from "./SuggestionCards";
import { FilterPanel } from "./FilterPanel";
import { SearchHeader } from "./SearchHeader";
import { useSearch } from "@/hooks/useSearch";

export function SearchContainer() {
  const {
    searchState,
    searchAccommodations,
    clearSearch,
    updateFilters,
    results,
    totalResults,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useSearch();

  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (query: string) => {
    setInputValue(query);
    await searchAccommodations(query);
  };

  const handleClear = () => {
    setInputValue("");
    clearSearch();
  };

  const handleFiltersChange = (filters: any) => {
    updateFilters(filters);
  };

  const handleClearFilters = () => {
    updateFilters({});
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <SearchHeader />

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isLoading}
            placeholder="Search for PG, hostels, co-living spaces..."
          />
        </div>

        {/* Results or Suggestions */}
        {searchState.hasSearched ? (
          <div className="space-y-4 sm:space-y-6">
            <FilterPanel
              filters={searchState.filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
            <ResultsArea
              results={results}
              totalResults={totalResults}
              isLoading={isLoading}
              error={error}
              query={searchState.query}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              refetch={refetch}
            />
          </div>
        ) : (
          <SuggestionCards onSuggestionClick={handleSearch} />
        )}
      </div>
    </div>
  );
}
