"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateUser, useUploadImages } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  property_name: z.string().min(1, "Property name is required"),
  type: z.enum(["PG", "Rental", "Hostel", "Co-living"], {
    required_error: "Please select a type",
  }),
  property_type: z.enum(["Boys", "Girls", "Both"], {
    required_error: "Please select a property type",
  }),
  address: z.string().min(1, "Address is required"),
  price: z.coerce.number().positive("Price must be positive"),
  rating: z.coerce.number().min(0).max(5).optional().or(z.literal("")),
  description: z.string().optional(),
  amenities: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  google_map_link: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export function AddUserForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const createUserMutation = useCreateUser();
  const uploadImagesMutation = useUploadImages();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      type: "PG",
      property_type: "Both",
      rating: "",
      email: "",
      google_map_link: "",
    },
  });

  const selectedType = watch("type");
  const selectedPropertyType = watch("property_type");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`);
      }
      return isImage;
    });

    if (validFiles.length === 0) return;

    // Create preview URLs
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setSelectedFiles((prev) => [...prev, ...validFiles]);

    toast.success(`${validFiles.length} image(s) selected`);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);
      // Revoke the removed URL to free memory
      URL.revokeObjectURL(prev[index]);
      return newUrls;
    });
    setUploadedImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: UserFormValues) => {
    try {
      let imageUrls: string[] = uploadedImageUrls;

      // Upload images first if there are any selected files that haven't been uploaded
      if (selectedFiles.length > 0 && uploadedImageUrls.length === 0) {
        toast.info("Uploading images...");
        const uploadResult = await uploadImagesMutation.mutateAsync(selectedFiles);
        imageUrls = uploadResult.images.map((img) => img.url);
        setUploadedImageUrls(imageUrls);
        toast.success(`${uploadResult.count} image(s) uploaded successfully`);
      }

      // Prepare the payload
      const payload = {
        name: data.name,
        property_name: data.property_name,
        type: data.type,
        property_type: data.property_type,
        address: data.address,
        price: data.price,
        rating: data.rating ? Number(data.rating) : undefined,
        description: data.description || undefined,
        amenities: data.amenities
          ? data.amenities.split(",").map((a) => a.trim()).filter(Boolean)
          : undefined,
        email: data.email || undefined,
        phone: data.phone || undefined,
        google_map_link: data.google_map_link || undefined,
        images: imageUrls.length > 0 ? imageUrls : undefined,
      };

      // Create the user
      toast.info("Creating accommodation...");
      const result = await createUserMutation.mutateAsync(payload);

      toast.success("Accommodation created successfully!");
      
      // Reset form
      reset();
      setSelectedFiles([]);
      setUploadedImageUrls([]);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);

      // Optional: redirect or show success message
      console.log("Created accommodation:", result);
    } catch (error: any) {
      console.error("Error creating accommodation:", error);
      toast.error(error?.response?.data?.message || "Failed to create accommodation");
    }
  };

  const isLoading = createUserMutation.isPending || uploadImagesMutation.isPending;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Accommodation</CardTitle>
        <CardDescription>
          Fill in the details below to add a new accommodation listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Green Valley"
                  {...register("name")}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="property_name">Property Name *</Label>
                <Input
                  id="property_name"
                  placeholder="e.g., Green Valley Premium PG"
                  {...register("property_name")}
                  disabled={isLoading}
                />
                {errors.property_name && (
                  <p className="text-sm text-red-500">{errors.property_name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => setValue("type", value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PG">PG</SelectItem>
                    <SelectItem value="Rental">Rental</SelectItem>
                    <SelectItem value="Hostel">Hostel</SelectItem>
                    <SelectItem value="Co-living">Co-living</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type *</Label>
                <Select
                  value={selectedPropertyType}
                  onValueChange={(value) => setValue("property_type", value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boys">Boys</SelectItem>
                    <SelectItem value="Girls">Girls</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
                {errors.property_type && (
                  <p className="text-sm text-red-500">{errors.property_type.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                {...register("address")}
                disabled={isLoading}
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹/month) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 12000"
                  {...register("price")}
                  disabled={isLoading}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="e.g., 4.5"
                  {...register("rating")}
                  disabled={isLoading}
                />
                {errors.rating && (
                  <p className="text-sm text-red-500">{errors.rating.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the accommodation..."
                {...register("description")}
                disabled={isLoading}
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                placeholder="e.g., WiFi, Parking, Gym, Swimming Pool"
                {...register("amenities")}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Enter amenities separated by commas
              </p>
              {errors.amenities && (
                <p className="text-sm text-red-500">{errors.amenities.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@example.com"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91-9876543210"
                  {...register("phone")}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="google_map_link">Google Maps Link</Label>
              <Input
                id="google_map_link"
                type="url"
                placeholder="https://maps.google.com/?q=..."
                {...register("google_map_link")}
                disabled={isLoading}
              />
              {errors.google_map_link && (
                <p className="text-sm text-red-500">{errors.google_map_link.message}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select Images
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedFiles.length} image(s) selected
                </span>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {previewUrls.length === 0 && (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No images selected. Click "Select Images" to add photos.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setSelectedFiles([]);
                setUploadedImageUrls([]);
                previewUrls.forEach((url) => URL.revokeObjectURL(url));
                setPreviewUrls([]);
              }}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating..." : "Create Accommodation"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
