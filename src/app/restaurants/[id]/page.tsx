"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouriteSlice";
import { addToCart } from "../../redux/Carts/cartSlice";
import { RootState } from "../../store/store";

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

export default function RestaurantPage({ params }: Props) {
  const dispatch = useDispatch();
  const favouriteIds = useSelector((state: RootState) => state.favourites.items);

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  useEffect(() => {
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

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!restaurant) return <p className="text-white text-center mt-10">Restaurant not found</p>;

  const isFav = favouriteIds.includes(restaurant._id);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Banner */}
      {restaurant.image ? (
        <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-lg">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="relative h-64 w-full flex items-center justify-center bg-pink-500/30 text-white text-4xl font-bold rounded-3xl">
          {restaurant.name}
        </div>
      )}

      {/* Info & Actions */}
      <div className="w-full max-w-5xl p-6 sm:flex sm:justify-between sm:items-start gap-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-300 text-lg">{restaurant.cuisine} • {restaurant.priceLabel} • {restaurant.offer || "No Offer"}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-semibold">⭐ {restaurant.rating}</span>
            <span className="text-gray-400">• {restaurant.distance} km • {restaurant.deliveryTime} mins</span>
          </div>
          {restaurant.isSuper && (
            <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold text-pink-500 bg-pink-500/20 rounded-full">
              Super Restaurant
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:items-end">
          <button
            onClick={() => dispatch(toggleFavourite(restaurant._id))}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-pink-500 font-semibold"
          >
            {isFav ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}
            {isFav ? "Remove Favourite" : "Add Favourite"}
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="w-full max-w-5xl space-y-6">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col">
              
              {/* Item Image */}
              {item.image ? (
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-40 w-full flex items-center justify-center bg-gray-600 text-white font-semibold">
                  {item.name}
                </div>
              )}

              {/* Item Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-white font-bold">${item.price}</span>
                  <button
                    onClick={() => dispatch(addToCart({ id: item.id, name: item.name, price: item.price }))}
                    className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition"
                  >
                    <AiOutlineShoppingCart size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
