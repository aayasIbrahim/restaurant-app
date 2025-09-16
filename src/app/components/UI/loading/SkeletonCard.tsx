import React from "react";

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 p-4 animate-pulse">
      {/* Image skeleton */}
      <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>

      {/* Title skeleton */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>

      {/* Subtitle skeleton */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>

      {/* Bottom row skeletons */}
      <div className="flex gap-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
}
