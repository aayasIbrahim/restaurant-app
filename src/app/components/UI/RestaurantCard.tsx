"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar, FaClock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouriteSlice";

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  priceLabel: string; // easy, medium, high
  price: number;
  offer?: string;
  image?: string;
  rating: number;
  deliveryTime: number;
  isFav: boolean;
}

// 💡 Colored badges for price label
const getPriceBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case "easy":
      return (
        <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 Easy
        </span>
      );
    case "medium":
      return (
        <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 Medium
        </span>
      );
    case "high":
      return (
        <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 High
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 bg-gray-500 text-white rounded-full text-xs font-semibold shadow-sm">
          N/A
        </span>
      );
  }
};

// 💡 Badge for offer
const getOfferBadge = (offer?: string) => {
  if (!offer) return null;
  return (
    <span className="px-2 py-1 bg-pink-500 text-white rounded-full text-xs font-semibold shadow-sm">
      {offer}
    </span>
  );
};

// 💡 Rating badge
const getRatingBadge = (rating: number) => (
  <span className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded-md text-xs font-medium">
    <FaStar size={12} /> {rating.toFixed(1)}
  </span>
);

// 💡 Price representation with symbols + actual price
const getPriceRepresentation = (level: string, price: number) => {
  let symbols = "";
  switch (level.toLowerCase()) {
    case "easy":
      symbols = "💰";
      break;
    case "medium":
      symbols = "💰💰";
      break;
    case "high":
      symbols = "💰💰💰";
      break;
    default:
      symbols = "💰";
  }
  return `${symbols} (${price}৳)`;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  cuisine,
  priceLabel,
  price,
  offer,
  image,
  rating,
  deliveryTime,
  isFav,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-transform transform hover:scale-105 bg-gray-800/60 border border-gray-700">
      <Link href={`/restaurants/${id}`}>
        {/* Image */}
        <div className="relative w-full h-48">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-600 rounded-t-2xl text-white font-semibold text-lg">
              {name}
            </div>
          )}

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition-opacity"></div>

          {/* Favourite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleFavourite(id));
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-pink-500 hover:bg-white/30 transition-transform duration-200 group-hover:scale-125"
          >
            {isFav ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3">
          {/* Name + Rating */}
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-lg truncate">{name}</h3>
            {getRatingBadge(rating)}
          </div>

          {/* Cuisine + Offer + Price badge */}
          <div className="flex flex-wrap gap-2 items-center">
            {getOfferBadge(offer)}
            <span className="text-gray-300 text-sm">{cuisine}</span>
            {getPriceBadge(priceLabel)}
          </div>

          {/* Delivery Time + Price representation */}
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <FaClock /> {`${deliveryTime}-${deliveryTime + 5}`} min
            </div>
            <div className="font-semibold text-white">
              {getPriceRepresentation(priceLabel, price)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
