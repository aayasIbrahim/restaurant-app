"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouriteSlice";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  priceLabel: string;
  price: number;
  offer?: string;
  rating: number;
  distance: number;
  deliveryTime: number;
  isSuper?: boolean;
  image?: string;
}

interface Props {
  restaurant: Restaurant;
}

export default function FavouriteCard({ restaurant }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="relative flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/20">
      {/* Link to Restaurant Page */}
      <Link href={`/restaurants/${restaurant._id}`}>
        {restaurant.image ? (
          <div className="relative w-full h-48">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        ) : (
          <div className="h-48 w-full flex items-center justify-center bg-gray-700 rounded-t-2xl text-white font-semibold text-lg">
            {restaurant.name}
          </div>
        )}

        {/* Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <h3 className="font-bold text-white text-lg mb-2">{restaurant.name}</h3>
          <p className="text-gray-300 text-sm mb-3">
            {restaurant.cuisine} • {restaurant.priceLabel} • {restaurant.offer || "No Offer"}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full">
              <FaStar size={12} /> {restaurant.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-400/20 text-blue-400 rounded-full">
              <FaClock size={12} /> {restaurant.deliveryTime}m
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-green-400/20 text-green-400 rounded-full">
              <FaMapMarkerAlt size={12} /> {restaurant.distance} km
            </span>
            {restaurant.isSuper && (
              <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full">
                🌟 Super
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Favourite Button */}
      <button
        onClick={() => dispatch(toggleFavourite(restaurant._id))}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-pink-500 hover:bg-black/60 transition z-10"
      >
        <AiFillHeart size={22} />
      </button>
    </div>
  );
}
