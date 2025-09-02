export interface Accommodation {
  id: string;
  name: string;
  address: string;
  city: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  amenities: string[];
  type: "PG" | "Rental" | "Hostel" | "Co-living";
  verified: boolean;
  description?: string;
  owner?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
}

export interface SearchFilters {
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  type?: Accommodation["type"][];
}

export interface SearchState {
  query: string;
  results: Accommodation[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}
