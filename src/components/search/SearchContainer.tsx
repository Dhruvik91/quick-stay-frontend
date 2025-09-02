"use client";

import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { ResultsArea } from "./ResultsArea";
import { SuggestionCards } from "./SuggestionCards";
import { useSearch } from "@/hooks/useSearch";

export function SearchContainer() {
  const { searchState, searchAccommodations, clearSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (query: string) => {
    setInputValue(query);
    await searchAccommodations(query);
  };

  const handleClear = () => {
    setInputValue("");
    clearSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover PG accommodations, rentals, hostels, and co-living spaces
            tailored to your needs
          </p>
        </header>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={searchState.isLoading}
            placeholder="Search for PG, hostels, co-living spaces..."
          />
        </div>

        {/* Results or Suggestions */}
        {searchState.hasSearched ? (
          <ResultsArea
            results={searchState.results}
            isLoading={searchState.isLoading}
            error={searchState.error}
            query={searchState.query}
          />
        ) : (
          <SuggestionCards onSuggestionClick={handleSearch} />
        )}
      </div>
    </div>
  );
}
