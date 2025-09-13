import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {  //shadcn er utils
  return twMerge(clsx(inputs))
}



export const uploadToCloudinary = async (file: File) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file); // Cloudinary expects 'file' field
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Cloudinary error:", error);
    throw new Error(error.error.message || "Upload failed");
  }

  const data = await res.json();
  return data.secure_url;
};
