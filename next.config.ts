import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "images.pexels.com",
      "logolook.net",
      "res.cloudinary.com",
      "cdni.iconscout.com",
    ],
  },
  typescript: {
    // TypeScript error থাকলেও build হবে
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
