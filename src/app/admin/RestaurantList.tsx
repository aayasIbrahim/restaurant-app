"use client";
import React, { useState } from "react";
import { useGetRestaurantsQuery, useDeleteRestaurantMutation } from "../redux/Api/restaurantApi";
import RestaurantForm from "./RestaurantForm";
import { Restaurant } from "../redux/Api/restaurantTypes";
import RestaurantManageCard from "../components/UI/RestaurantManageCard";


export default function RestaurantList() {
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const [editingRestaurant, setEditingRestaurant] = useState<string | null>(null);

  if (isLoading) return <p className="text-center mt-10">Loading restaurants...</p>;

  const handleDelete = async (id: string) => {
    try {
      await deleteRestaurant(id).unwrap();
      alert("Restaurant deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete restaurant");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {editingRestaurant && (
        <div className="mb-6">
          <RestaurantForm restaurantId={editingRestaurant} onClose={() => setEditingRestaurant(null)} />
        </div>
      )}

      <h2 className="text-3xl font-bold text-center">All Restaurants</h2>

      <div className="grid md:grid-cols-2 gap-6 py-12">
  
        {restaurants?.map((r: Restaurant) => (
          <RestaurantManageCard
            key={r._id}
            restaurant={r}
            onEdit={(id) => setEditingRestaurant(id)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
