"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavourite } from "../redux/favourites/favouriteSlice";

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

export default function FavouritesPage() {
  const dispatch = useDispatch();
  const favouriteIds = useSelector((state: RootState) => state.favourites.items);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Restaurant[] = await res.json();
        // Filter only favourites
        setRestaurants(data.filter((r) => favouriteIds.includes(r._id)));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [favouriteIds]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (restaurants.length === 0) return <p className="text-white text-center mt-10">No favourites yet</p>;

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div key={r._id} className="relative flex flex-col bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-transform duration-200 hover:scale-105">
            {r.image ? (
              <div className="relative w-full h-48">
                <Image src={r.image} alt={r.name} fill className="object-cover rounded-t-2xl" />
              </div>
            ) : (
              <div className="h-auto w-full flex items-center justify-center bg-gray-600 rounded-t-2xl text-white font-semibold">
                {r.name}
              </div>
            )}

            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-semibold text-white text-lg">{r.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{r.cuisine} • {r.priceLabel} • {r.offer || "No Offer"}</p>
            </div>

            <button
              onClick={() => dispatch(toggleFavourite(r._id))}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/10 text-pink-500 hover:bg-white/20 transition"
            >
              <AiFillHeart size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
