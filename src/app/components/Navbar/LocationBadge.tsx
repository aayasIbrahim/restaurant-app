import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const LocationBadge = () => {
  return (
    <span className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-800 font-medium rounded-full shadow-sm cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:shadow-md">
      <HiOutlineLocationMarker className=" text-lg" />
      <span className="text-sm sm:text-base">Dhaka, Bangladesh</span>
    </span>
  );
};

export default LocationBadge;
