"use client";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search restaurants, cuisines, or dishes...",
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-8 relative">
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 pl-16 pr-14 rounded-full 
                   bg-white/90 dark:bg-gray-800/80 backdrop-blur-md
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                   focus:outline-none shadow-md hover:shadow-lg
                   transition-all duration-300 ease-in-out text-lg"
      />

      {/* Left SVG Icon */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 
                     text-gray-400 dark:text-gray-300 hover:text-red-500 
                     transition-colors duration-200"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
