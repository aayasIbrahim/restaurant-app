"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetRestaurantsQuery, useDeleteRestaurantMutation } from "../redux/Api/restaurantApi";
import RestaurantForm from "./RestaurantForm";
import { Restaurant, Dish } from "../redux/Api/restaurantTypes";

export default function RestaurantList() {
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const [editingRestaurant, setEditingRestaurant] = useState<string | null>(null);

  if (isLoading) return <p className="text-center mt-10">Loading restaurants...</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {editingRestaurant && (
        <div className="mb-6">
          <RestaurantForm restaurantId={editingRestaurant} onClose={() => setEditingRestaurant(null)} />
        </div>
      )}

      <h2 className="text-3xl font-bold text-center">Restaurants</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {restaurants?.map((r: Restaurant) => (
          <div
            key={r._id}
            className="border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Restaurant Image */}
            {r.image && (
              <div className="relative w-full h-56">
                <Image src={r.image} alt={r.name} fill className="object-cover" />
              </div>
            )}

            <div className="p-4 space-y-2">
              {/* Name and Cuisine */}
              <h3 className="text-2xl font-semibold">{r.name}</h3>
              <p className="text-gray-600">
                {r.cuisine} | Price: {r.priceLabel} (${r.price})
              </p>

              {/* Rating, Distance & Delivery */}
              <p className="text-gray-500 text-sm">
                Rating: <span className="font-medium">{r.rating ?? "-"}</span> | Distance:{" "}
                <span className="font-medium">{r.distance ?? "-"} km</span> | Delivery:{" "}
                <span className="font-medium">{r.deliveryTime ?? "-"} min</span>
              </p>

              {/* Offer */}
              {r.offer && <p className="text-green-600 font-medium">Offer: {r.offer}</p>}

              {/* Menu Preview */}
              {r.menu && r.menu.length > 0 && (
                <div>
                  <h4 className="font-semibold mt-2">Menu Preview</h4>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {r.menu.slice(0, 3).map((dish: Dish) => (
                      <li key={dish.id} className="flex items-center gap-2 text-gray-700">
                        {dish.image && (
                          <span className="w-12 h-12 relative rounded overflow-hidden">
                            <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                          </span>
                        )}
                        <span>
                          {dish.name} - ${dish.price}
                        </span>
                      </li>
                    ))}
                    {r.menu.length > 3 && (
                      <li className="text-gray-400 text-sm">
                        + {r.menu.length - 3} more dishes
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingRestaurant(r._id)}
                  className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition-colors"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    if (!r._id) return;
                    try {
                      await deleteRestaurant(r._id).unwrap();
                      alert("Restaurant deleted successfully!");
                    } catch (err) {
                      console.error("Failed to delete:", err);
                      alert("Failed to delete restaurant");
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
