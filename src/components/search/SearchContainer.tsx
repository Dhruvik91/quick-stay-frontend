"use client";

import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { ResultsArea } from "./ResultsArea";
import { SuggestionCards } from "./SuggestionCards";
import { FilterPanel } from "./FilterPanel";
import { SearchHeader } from "./SearchHeader";
import { useSearch } from "@/hooks/useSearch";
import { AccommodationCard } from "../cards/AccommodationCard";

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

  const accomodations = [ {
    "id": 1,
    "name": "Sunrise PG for Boys",
    "property_name": "Sunrise Residency",
    "type": "PG",
    "property_type": "boys",
    "price": 12000,
    "rating": 4.5,
    "address": "Sector 15, Near Tech Park, Gurugram, Haryana 122001",
    "description": "Well-maintained PG with modern amenities, perfect for working professionals and students. Located near metro station.",
    "verified": true,
    "images": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
    ],
    "amenities": ["WiFi", "Parking", "Food", "AC", "Security"],
    "phone": "+91 9876543210",
    "email": "sunrise.pg@gmail.com"
  },
  {
    "id": 2,
    "name": "Green Valley Girls Hostel",
    "property_name": "Green Valley Residences",
    "type": "Hostel",
    "property_type": "girls",
    "price": 8500,
    "rating": 4.2,
    "address": "Mohan Nagar, Near Delhi University, Delhi 110007",
    "description": "Safe and secure hostel for female students with 24/7 security and healthy food options.",
    "verified": true,
    "images": [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
    ],
    "amenities": ["WiFi", "Food", "Security", "Gym"],
    "phone": "+91 9876543211",
    "email": "greenvalley.hostel@gmail.com"
  },
  {
    "id": 3,
    "name": "Metro Co-living Space",
    "property_name": "Metro Living",
    "type": "Co-living",
    "property_type": "both",
    "price": 18000,
    "rating": 4.7,
    "address": "Connaught Place, Central Delhi, Delhi 110001",
    "description": "Premium co-living space with fully furnished apartments and community events.",
    "verified": true,
    "images": [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"
    ],
    "amenities": ["WiFi", "Parking", "AC", "Gym", "Security", "Food"],
    "phone": "+91 9876543212",
    "email": "metro.coliving@example.com"
  },
  {
    "id": 4,
    "name": "Family Rental Apartment",
    "property_name": "Skyline Apartments",
    "type": "Rental",
    "property_type": "both",
    "price": 25000,
    "rating": 4.3,
    "address": "Saket, South Delhi, Delhi 110017",
    "description": "Spacious 2BHK apartment with modern amenities and peaceful neighborhood.",
    "verified": false,
    "images": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400"
    ],
    "amenities": ["Parking", "AC", "Security"],
    "phone": "+91 9876543213",
    "email": "skyline.rentals@example.com"
  },
  {
    "id": 5,
    "name": "Tech Park PG",
    "property_name": "Tech Park Residency",
    "type": "PG",
    "property_type": "boys",
    "price": 9500,
    "rating": 4.0,
    "address": "Electronic City, Phase 1, Bangalore, Karnataka 560100",
    "description": "Affordable PG accommodation for IT professionals near tech parks.",
    "verified": true,
    "images": [],
    "amenities": ["WiFi", "Food", "AC"],
    "phone": "+91 9876543214",
    "email": null
  },
  {
    "id": 6,
    "name": "University Girls Hostel",
    "property_name": "Campus Comfort",
    "type": "Hostel",
    "property_type": "girls",
    "price": 7500,
    "rating": 4.6,
    "address": "Near IIT Delhi, Hauz Khas, Delhi 110016",
    "description": "Comfortable hostel accommodation for college students with study rooms and recreational facilities.",
    "verified": true,
    "images": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    "amenities": ["WiFi", "Food", "Security", "Gym", "Parking"],
    "phone": "+91 9876543215",
    "email": "campus.comfort@example.com"
  },
  {
    "id": 7,
    "name": "Executive Co-living",
    "property_name": "Executive Stay",
    "type": "Co-living",
    "property_type": "both",
    "price": 22000,
    "rating": 4.8,
    "address": "Bandra West, Mumbai, Maharashtra 400050",
    "description": "Luxury co-living for working professionals with housekeeping and premium amenities.",
    "verified": true,
    "images": [
      "https://images.unsplash.com/photo-1540518614846-7eded1024f61?w=400",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"
    ],
    "amenities": ["WiFi", "Parking", "AC", "Gym", "Security", "Food"],
    "phone": "+91 9876543216",
    "email": "executive.stay@example.com"
  },
  {
    "id": 8,
    "name": "Family Rental House",
    "property_name": "Green Meadows",
    "type": "Rental",
    "property_type": "both",
    "price": 35000,
    "rating": 4.4,
    "address": "Whitefield, Bangalore, Karnataka 560066",
    "description": "Independent house with garden and parking space, suitable for families.",
    "verified": false,
    "images": [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"
    ],
    "amenities": ["Parking", "AC", "Security"],
    "phone": "+91 9876543217",
    "email": "green.meadows@example.com"
  }]

  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Emerald Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        <div className="min-h-[500px] flex flex-col items-center justify-between h-full">
          {/* Header */}
          <div className="h-96 flex flex-col items-center justify-center">
            <SearchHeader />
          </div>
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
        </div>

        {/* Results or Suggestions */}
        <div className="relative w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {accomodations.map((accommodation, index) => (
        <AccommodationCard
          key={accommodation.id}
          accommodation={accommodation as any}
          animationDelay={index * 0.1}
        />
      ))}
    </div>
      </div>
    </div>
  );
}
