"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  FaStar,
  FaClock,
  FaUtensils,
  FaGift,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouriteSlice";
import { RootState } from "../../store/store";
import SkeletonCard from "@/app/components/UI/loading/SkeletonCard";
import LoadingGrid from "@/app/components/UI/loading/LoadingGrid";
import MenuCard from "@/app/components/UI/MenuCard";

// Interfaces
interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

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
  menu: MenuItem[];
}

interface Props {
  params: Promise<{ id: string }>;
}

// 💡 Price badge
const getPriceBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case "easy":
      return (
        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 Easy
        </span>
      );
    case "medium":
      return (
        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 Medium
        </span>
      );
    case "high":
      return (
        <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 High
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-semibold shadow-sm">
          N/A
        </span>
      );
  }
};

// 💡 Offer badge
const getOfferBadge = (offer?: string) => {
  if (!offer) return null;
  return (
    <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-semibold shadow-sm">
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

export default function RestaurantPage({ params }: Props) {
  const { id } = React.use(params);
  const dispatch = useDispatch();
  const favouriteIds = useSelector(
    (state: RootState) => state.favourites.items
  );

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/restaurants/${id}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Restaurant not found");
        return res.json();
      })
      .then((data) => setRestaurant(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {loading ? (
        <div className="container mx-auto px-4 py-10 space-y-6">
          <SkeletonCard />
          <LoadingGrid count={6} />
        </div>
      ) : !restaurant ? (
        <p className="text-white text-center mt-10 text-lg font-medium">
          Restaurant not found
        </p>
      ) : (
        <div className="container mx-auto text-white flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Banner */}
          {restaurant.image ? (
            <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-lg group">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25"></div>
            </div>
          ) : (
            <div className="relative h-64 w-full flex items-center justify-center bg-pink-500/30 text-white text-4xl font-bold rounded-3xl">
              {restaurant.name}
            </div>
          )}

          {/* Info & Actions */}
          <div className="w-full max-w-5xl p-6 sm:flex sm:justify-between sm:items-start gap-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg">
            {/* Info Section */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold">
                {restaurant.name}
              </h1>

              {/* Modern UL */}
              <ul className="flex flex-wrap gap-4">
                <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <FaUtensils className="text-pink-400" />
                  <span className="font-medium">{restaurant.cuisine}</span>
                </li>
                <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <FaMapMarkerAlt className="text-green-400" />
                  <span className="font-medium">
                    {restaurant.distance} km away
                  </span>
                </li>
                <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <FaClock className="text-blue-400" />
                  <span className="font-medium">
                    {restaurant.deliveryTime} mins delivery
                  </span>
                </li>
                <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  💵 {getPriceBadge(restaurant.priceLabel)}
                </li>
                {restaurant.offer && (
                  <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                    <FaGift className="text-yellow-400" />
                    {getOfferBadge(restaurant.offer)}
                  </li>
                )}
                <li className="flex items-center gap-3 flex-1 min-w-[200px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <FaStar className="text-yellow-400" />
                  {getRatingBadge(restaurant.rating)}
                </li>
              </ul>

              {restaurant.isSuper && (
                <span className="inline-block mt-4 px-4 py-1 text-sm font-semibold text-pink-500 bg-pink-500/20 rounded-full">
                  🌟 Super Restaurant
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:items-end mt-6 sm:mt-0">
              <button
                onClick={() => dispatch(toggleFavourite(restaurant._id))}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition text-white font-semibold shadow-lg"
              >
                {favouriteIds.includes(restaurant._id) ? (
                  <>
                    <AiFillHeart size={22} /> Remove Favourite
                  </>
                ) : (
                  <>
                    <AiOutlineHeart size={22} /> Add Favourite
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Menu Section */}
          <div className="w-full max-w-5xl space-y-6">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.menu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
