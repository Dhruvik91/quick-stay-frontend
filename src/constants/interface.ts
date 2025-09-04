export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
  }


  export interface Accommodation {
    id: string;
    name: string;
    type: 'PG' | 'Rental' | 'Hostel' | 'Co-living';
    address: string;
    price: number;
    rating?: number;
    description?: string;
    imageUrl?: string;
    verified: boolean;
    amenities: string[];
    contact?: {
      phone?: string;
      email?: string;
    };
  }
