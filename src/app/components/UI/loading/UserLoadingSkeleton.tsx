"use client";
import React from "react";

export default function UserLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          <td className="p-3 h-6 bg-gray-700 rounded">&nbsp;</td>
          <td className="p-3 h-6 bg-gray-700 rounded">&nbsp;</td>
          <td className="p-3 h-6 bg-gray-700 rounded">&nbsp;</td>
          <td className="p-3 flex flex-wrap justify-center gap-2">
            <div className="px-3 py-1 bg-gray-700 rounded">&nbsp;</div>
            <div className="px-3 py-1 bg-gray-700 rounded">&nbsp;</div>
          </td>
        </tr>
      ))}
    </>
  );
}
