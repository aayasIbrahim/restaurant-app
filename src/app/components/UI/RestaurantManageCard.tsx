"use client";
import React from "react";
import Image from "next/image";
import { Restaurant, Dish } from "../../redux/Api/restaurantTypes";

interface Props {
  restaurant: Restaurant;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RestaurantManageCard({ restaurant, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* Restaurant Image */}
      {restaurant.image && (
        <div className="relative w-full h-56">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Name and Cuisine */}
        <h3 className="text-2xl font-semibold">{restaurant.name}</h3>
        <p className="text-gray-600">
          {restaurant.cuisine} | Price: {restaurant.priceLabel} (${restaurant.price})
        </p>

        {/* Rating, Distance & Delivery */}
        <p className="text-gray-500 text-sm">
          Rating: <span className="font-medium">{restaurant.rating ?? "-"}</span> | Distance:{" "}
          <span className="font-medium">{restaurant.distance ?? "-"} km</span> | Delivery:{" "}
          <span className="font-medium">{restaurant.deliveryTime ?? "-"} min</span>
        </p>

        {/* Offer */}
        {restaurant.offer && (
          <p className="text-green-600 font-medium">Offer: {restaurant.offer}</p>
        )}

        {/* Menu Preview */}
        {restaurant.menu && restaurant.menu.length > 0 && (
          <div>
            <h4 className="font-semibold mt-3 mb-2">Menu Preview</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {restaurant.menu.slice(0, 4).map((dish: Dish) => (
                <li
                  key={dish.id}
                  className="flex items-center gap-3 p-2 border rounded-lg hover:shadow-md transition-shadow bg-gray-50"
                >
                  {dish.image && (
                    <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-gray-800">{dish.name}</span>
                    <span className="text-gray-500">${dish.price}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Show more count */}
            {restaurant.menu.length > 4 && (
              <p className="text-gray-400 text-sm mt-2">
                + {restaurant.menu.length - 4} more dishes
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => restaurant._id && onEdit(restaurant._id)}
            className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => restaurant._id && onDelete(restaurant._id)}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
