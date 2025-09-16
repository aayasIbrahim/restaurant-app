"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FavouriteCard from "../components/UI/FavouriteCard";
import LoadingGrid from "../components/UI/loading/LoadingGrid";

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
  const favouriteIds = useSelector((state: RootState) => state.favourites.items);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Restaurant[] = await res.json();
        setRestaurants(data.filter((r) => favouriteIds.includes(r._id)));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [favouriteIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl">
        {loading && <LoadingGrid count={6}/>}
        {!loading && restaurants.length === 0 && (
          <h1 className="text-white text-center mt-10 text-lg font-medium">
            💔 No favourites yet
          </h1>
        )}
        {!loading && restaurants.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((r) => (
              <FavouriteCard key={r._id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
