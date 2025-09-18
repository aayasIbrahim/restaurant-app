"use client";
import React, { useState } from "react";
import { useGetRestaurantsQuery, useDeleteRestaurantMutation } from "../redux/Api/restaurantApi";
import RestaurantForm from "./RestaurantForm";
import { Restaurant } from "../redux/Api/restaurantTypes";
import RestaurantManageCard from "../components/UI/RestaurantManageCard";
import Pagination from "../components/UI/Pagination";

export default function RestaurantList() {
  const [page, setPage] = useState(1);
  const limit = 2;
  const [editingRestaurant, setEditingRestaurant] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetRestaurantsQuery({ page, limit });
  const restaurants = data?.restaurants || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const [deleteRestaurant] = useDeleteRestaurantMutation();

  if (isLoading) return <p className="text-center mt-10 text-white">Loading restaurants...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load restaurants.</p>;

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
      {/* Edit Form */}
      {editingRestaurant && (
        <div className="mb-6">
          <RestaurantForm restaurantId={editingRestaurant} onClose={() => setEditingRestaurant(null)} />
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-white">All Restaurants</h2>

      {/* Restaurant List */}
      <div className="grid md:grid-cols-2 gap-6 py-12">
        {restaurants.map((r: Restaurant) => (
          <RestaurantManageCard
            key={r._id}
            restaurant={r}
            onEdit={(id) => setEditingRestaurant(id)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
