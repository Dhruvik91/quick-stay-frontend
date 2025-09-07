"use client";

import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { ResultsArea } from "./ResultsArea";
import { SuggestionCards } from "./SuggestionCards";
import { FilterPanel } from "./FilterPanel";
import { useSearch } from "@/hooks/useSearch";
import { InfoBanner } from "../ui/InfoBanner";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Info Banner */}
        <InfoBanner/>
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12 mt-5">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">
                Live Search with Real-time Results
              </span>
              <span className="sm:hidden">Live Search</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Discover PG accommodations, rentals, hostels, and co-living spaces
            tailored to your needs with our advanced search and filtering system
          </p>
        </header>

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
