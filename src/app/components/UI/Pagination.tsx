"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // No pagination needed

  return (
    <div className="flex justify-center items-center gap-4 p-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 text-white"
      >
        Prev
      </button>

      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
