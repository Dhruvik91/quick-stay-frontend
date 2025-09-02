"use client";

import { useState, useCallback, useMemo } from "react";
import { Accommodation, SearchState } from "@/types/accommodation";

// Mock data for demonstration
const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    name: "Urban Heights PG",
    address: "123 Tech Street, Koramangala",
    city: "Bangalore",
    price: 12000,
    owner: "Nanji",
    rating: 4.5,
    imageUrl:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security"],
    type: "PG",
    verified: true,
    description:
      "Modern PG with excellent amenities in the heart of Koramangala",
    contact: {
      phone: "+91 9876543210",
      email: "info@urbanheights.com",
    },
  },
  {
    id: "2",
    name: "CoWork Living Hub",
    address: "456 Innovation Drive, HSR Layout",
    city: "Bangalore",
    price: 18000,
    owner: "Nanji",
    rating: 4.8,
    imageUrl:
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "Gym", "Coworking Space", "Events", "Parking"],
    type: "Co-living",
    verified: true,
    description: "Premium co-living space for professionals and entrepreneurs",
    contact: {
      phone: "+91 9876543211",
      email: "hello@coworkliving.com",
    },
  },
  {
    id: "3",
    name: "Budget Stay Hostel",
    address: "789 Backpacker Lane, Indiranagar",
    city: "Bangalore",
    price: 8000,
    owner: "Nanji",
    rating: 4.2,
    imageUrl:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "Kitchen", "Common Area", "Lockers"],
    type: "Hostel",
    verified: false,
    description: "Affordable hostel with a vibrant community atmosphere",
    contact: {
      phone: "+91 9876543212",
      email: "stay@budgethostel.com",
    },
  },
  {
    id: "4",
    name: "Premium Studio Rental",
    address: "321 Executive Plaza, Whitefield",
    city: "Bangalore",
    price: 25000,
    owner: "Nanji",
    rating: 4.7,
    imageUrl:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "AC", "Furnished", "Balcony", "Parking", "Security"],
    type: "Rental",
    verified: true,
    description: "Luxury studio apartment with modern amenities",
    contact: {
      phone: "+91 9876543213",
      email: "rent@premiumstudios.com",
    },
  },
  {
    id: "5",
    name: "Student Hub PG",
    address: "654 College Road, Jayanagar",
    city: "Bangalore",
    price: 9000,
    owner: "Nanji",
    rating: 4.3,
    imageUrl:
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "Food", "Study Room", "Security", "Housekeeping"],
    type: "PG",
    verified: true,
    description: "Perfect for students with study-friendly environment",
    contact: {
      phone: "+91 9876543214",
      email: "info@studenthub.com",
    },
  },
  {
    id: "6",
    name: "Tech Valley Residence",
    address: "987 Software Park, Electronic City",
    city: "Bangalore",
    price: 15000,
    owner: "Nanji",
    rating: 4.6,
    imageUrl:
      "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=400",
    amenities: ["WiFi", "AC", "Food", "Gym", "Transport", "Security"],
    type: "PG",
    verified: true,
    description: "Modern PG near tech companies with shuttle service",
    contact: {
      phone: "+91 9876543215",
      email: "info@techvalley.com",
    },
  },
];

export function useSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false,
  });

  // Memoized filtered results based on query
  const filteredResults = useMemo(() => {
    const { query } = searchState;
    if (!query.trim()) {
      return [];
    }

    return mockAccommodations.filter(
      (accommodation) =>
        accommodation.name.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.owner?.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.address.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.city.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.description?.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.type.toLowerCase().includes(query.toLowerCase()) ||
        accommodation.amenities.some((amenity) =>
          amenity.toLowerCase().includes(query.toLowerCase())
        )
    );
  }, [searchState.query]);

  const searchAccommodations = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchState((prev) => ({
          ...prev,
          query: "",
          results: [],
          hasSearched: false,
        }));
        return;
      }

      setSearchState((prev) => ({
        ...prev,
        query,
        isLoading: true,
        error: null,
      }));

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Use memoized results
        setSearchState((prev) => ({
          ...prev,
          results: filteredResults,
          isLoading: false,
          hasSearched: true,
        }));
      } catch (error) {
        setSearchState((prev) => ({
          ...prev,
          error: "Failed to search accommodations. Please try again.",
          isLoading: false,
          hasSearched: true,
        }));
      }
    },
    [filteredResults]
  );

  const clearSearch = useCallback(() => {
    setSearchState({
      query: "",
      results: [],
      isLoading: false,
      error: null,
      hasSearched: false,
    });
  }, []);

  return {
    searchState,
    searchAccommodations,
    clearSearch,
  };
}
