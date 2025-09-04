import { Accommodation } from "./interface";

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  path: {
    users: "/users"
  }
};

export const dummyAccommodations: Accommodation[] = [
  {
    id: "1",
    name: "Urban Nest Co-Living",
    type: "Co-living",
    address: "123 Main Street, Bangalore, Karnataka",
    price: 18500,
    rating: 4.7,
    description:
      "Modern co-living space with fully furnished rooms, high-speed internet, and regular community events. Perfect for working professionals.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: true,
    amenities: ["WiFi", "Parking", "Food", "Gym", "AC", "Security"],
    contact: {
      phone: "+91 9876543210",
      email: "urbannest@example.com",
    },
  },
  {
    id: "2",
    name: "Green Valley PG",
    type: "PG",
    address: "45 Park Road, Hyderabad, Telangana",
    price: 12500,
    rating: 4.3,
    description:
      "Comfortable PG accommodation with homely food and friendly environment. Suitable for students and young professionals.",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: true,
    amenities: ["WiFi", "Food", "AC", "Security"],
    contact: {
      phone: "+91 8765432109",
    },
  },
  {
    id: "3",
    name: "Metro Heights Rental",
    type: "Rental",
    address: "78 MG Road, Delhi",
    price: 35000,
    rating: 4.5,
    description:
      "Spacious 2BHK apartment in prime location with modern amenities and close to metro station.",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: false,
    amenities: ["Parking", "AC", "Security"],
    contact: {
      email: "metroheights@example.com",
    },
  },
  {
    id: "4",
    name: "Student Hub Hostel",
    type: "Hostel",
    address: "90 College Road, Pune, Maharashtra",
    price: 8500,
    rating: 4.2,
    description:
      "Affordable hostel accommodation for students with study rooms and 24/7 security.",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: true,
    amenities: ["WiFi", "Food", "Security"],
    contact: {
      phone: "+91 7654321098",
      email: "studenthub@example.com",
    },
  },
  {
    id: "5",
    name: "Elite Stay PG",
    type: "PG",
    address: "22 Cross Street, Chennai, Tamil Nadu",
    price: 14500,
    description:
      "Premium PG accommodation with AC rooms and modern facilities for working professionals.",
    imageUrl:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    verified: false,
    amenities: ["WiFi", "Food", "AC", "Gym", "Security"],
    contact: {
      phone: "+91 6543210987",
    },
  },
  {
    id: "6",
    name: "City Center Rental Apartment",
    type: "Rental",
    address: "56 Downtown Avenue, Mumbai, Maharashtra",
    price: 42000,
    rating: 4.8,
    description:
      "Luxurious 3BHK apartment with panoramic city views and premium amenities in the heart of the city.",
    verified: true,
    amenities: ["Parking", "AC", "Gym", "Security"],
    contact: {
      email: "citycenter@example.com",
    },
  },
];
