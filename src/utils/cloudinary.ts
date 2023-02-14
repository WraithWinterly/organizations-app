import { env } from "@/env/server.mjs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export function uploadImage(imageUploaded: any) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { width: 1280, height: 720, crop: "fill" },
      (error: any, res: any) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        resolve(res);
      }
    );
  });
}

export function deleteImage(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error: any, res: any) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      resolve(res);
    });
  });
}
