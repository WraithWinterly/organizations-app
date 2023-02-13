import { env } from "@/env/client.mjs";
import { Image } from "@prisma/client";

// `https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`;

export function constructImageURL(image: Image) {
  if (image == null) {
    return "";
  }
  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/v${image?.version}/${image?.publicId}.${image?.format}`;
}
