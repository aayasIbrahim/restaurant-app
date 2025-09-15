"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar, FaClock, FaTags } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouriteSlice";

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  priceLabel: string;
  offer?: string;
  image?: string;
  rating: number;
  deliveryTime: number;
  isFav: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  cuisine,
  priceLabel,
  offer,
  image,
  rating,
  deliveryTime,
  isFav,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:scale-105 transition-transform duration-200 relative">
      <Link href={`/restaurants/${id}`}>
        {/* Image */}
        <div className="relative w-full h-48">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-t-2xl"
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-600 rounded-t-2xl text-white font-semibold">
              {name}
            </div>
          )}

          {/* Favourite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleFavourite(id));
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-pink-500 hover:bg-white/30 transition"
          >
            {isFav ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2">
          {/* Name + Rating */}
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-yellow-400 font-medium">
              <FaStar /> {rating.toFixed(1)}
            </div>
          </div>

          {/* Cuisine + Offer */}
          <div className="flex flex-wrap gap-2 text-gray-300 text-sm items-center">
            <div className="flex items-center gap-1">
              <FaTags /> {offer || "No Offer"}
            </div>
            <div>{cuisine}</div>
          </div>

          {/* Delivery Time + Price */}
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <div className="flex items-center gap-1">
              <FaClock /> {deliveryTime} min
            </div>
            <div>{priceLabel}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
