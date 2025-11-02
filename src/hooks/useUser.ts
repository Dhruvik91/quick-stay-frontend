import { useMutation } from "@tanstack/react-query";
import { userService, CreateUserPayload, UploadImagesResponse } from "@/services/userService";
import { Accommodation } from "@/types/accommodation";

/**
 * Hook for creating a new user/accommodation
 */
export const useCreateUser = () => {
  return useMutation<Accommodation, Error, CreateUserPayload>({
    mutationFn: (payload: CreateUserPayload) => userService.createUser(payload),
  });
};

/**
 * Hook for uploading images to S3
 */
export const useUploadImages = () => {
  return useMutation<UploadImagesResponse, Error, File[]>({
    mutationFn: (files: File[]) => userService.uploadImages(files),
  });
};
