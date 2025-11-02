import { API_CONFIG } from "@/constants";
import httpService from "@/lib/httpService";
import { Accommodation } from "@/types/accommodation";

export interface CreateUserPayload {
  name: string;
  property_name: string;
  type: "PG" | "Rental" | "Hostel" | "Co-living";
  property_type: "Boys" | "Girls" | "Both";
  address: string;
  price: number;
  rating?: number;
  description?: string;
  amenities?: string[];
  email?: string;
  phone?: string;
  google_map_link?: string;
  images?: string[];
}

export interface UploadedImage {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

export interface UploadImagesResponse {
  images: UploadedImage[];
  count: number;
}

export const userService = {
  /**
   * Create a new user/accommodation
   */
  async createUser(payload: CreateUserPayload): Promise<Accommodation> {
    const response = await httpService.post<Accommodation>(API_CONFIG.path.users, payload);
    return response.data.data;
  },

  /**
   * Upload multiple images to S3 (public endpoint, no auth required)
   */
  async uploadImages(files: File[]): Promise<UploadImagesResponse> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await httpService.post<UploadImagesResponse>(
      API_CONFIG.path.uploads,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },
};
