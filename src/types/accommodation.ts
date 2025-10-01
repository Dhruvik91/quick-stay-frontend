export interface Accommodation {
  id: string;
  name: string;
  type: "PG" | "Rental" | "Hostel" | "Co-living";
  address: string;
  price: number;
  rating: number;
  description: string;
  image_url: string;
  verified: boolean;
  amenities: string[];
  email: string;
  phone: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  /** Optional extended fields for richer UI rendering */
  property_type?: "boys" | "girls" | "both";
  /** If provided, shown distinctly from name */
  property_name?: string;
  /** Prefer this over image_url when present */
  images?: string[];
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

export interface AccommodationSearchParams {
  type?: "PG" | "Rental" | "Hostel" | "Co-living";
  verified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AccommodationSearchResponse {
  users: Accommodation[];
  pagination: PaginationInfo;
}

export interface SearchState {
  query: string;
  results: Accommodation[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  filters?: {
    type?: "PG" | "Rental" | "Hostel" | "Co-living";
    verified?: boolean;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    amenities?: string[];
  };
}
