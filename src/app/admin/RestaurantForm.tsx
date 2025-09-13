"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Restaurant, Dish } from "../redux/Api/restaurantTypes";
import {
  useAddRestaurantMutation,
  useUpdateRestaurantMutation,
  useGetRestaurantByIdQuery,
} from "../redux/Api/restaurantApi";
import MenuForm from "./MenuForm";
import { uploadToCloudinary } from "../../lib/utils";

interface Props {
  restaurantId?: string;
  onClose?: () => void;
}

export default function RestaurantForm({ restaurantId, onClose }: Props) {
  const [menu, setMenu] = useState<Dish[]>([
    { id: 1, name: "", description: "", price: "", image: "" },
  ]);
  const [restaurantImage, setRestaurantImage] = useState("");
  const [loadingRestaurantImage, setLoadingRestaurantImage] = useState(false);
  const [loadingDishIndex, setLoadingDishIndex] = useState<number | null>(null);

  const { data: restaurantData } = useGetRestaurantByIdQuery(restaurantId!, {
    skip: !restaurantId,
  });
  const [addRestaurant, { isLoading: isAdding }] = useAddRestaurantMutation();
  const [updateRestaurant, { isLoading: isUpdating }] =
    useUpdateRestaurantMutation();

  useEffect(() => {
    if (restaurantData) {
      setRestaurantImage(restaurantData.image);
      setMenu(restaurantData.menu);
    }
  }, [restaurantData]);

  const handleDishImage = async (index: number, file: File) => {
    setLoadingDishIndex(index);
    try {
      const url = await uploadToCloudinary(file);
      setMenu((prev) =>
        prev.map((d, i) => (i === index ? { ...d, image: url } : d))
      );
    } finally {
      setLoadingDishIndex(null);
    }
  };

  const handleRestaurantImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    setLoadingRestaurantImage(true);
    try {
      const url = await uploadToCloudinary(e.target.files[0]);
      setRestaurantImage(url);
    } finally {
      setLoadingRestaurantImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!restaurantImage) return alert("Upload restaurant image first.");
    if (menu.some((d) => !d.image))
      return alert("Upload all dish images first.");

    const form = e.currentTarget;
    const payload: Partial<Restaurant> = {
      name: (form.name as HTMLInputElement).value,
      cuisine: (form.cuisine as HTMLSelectElement).value,
      priceLabel: (form.priceLabel as HTMLSelectElement).value,
      price: Number((form.price as HTMLInputElement).value),
      offer: (form.offer as HTMLSelectElement).value,
      rating: Number((form.rating as HTMLInputElement).value),
      distance: Number((form.distance as HTMLInputElement).value),
      deliveryTime: Number((form.deliveryTime as HTMLInputElement).value),
      isSuper: (form.isSuper as HTMLInputElement).checked,
      image: restaurantImage,
      menu,
    };

    try {
      if (restaurantId)
        await updateRestaurant({ id: restaurantId, data: payload }).unwrap();
      else await addRestaurant(payload).unwrap();
      onClose?.();
    } catch {
      alert("Error saving restaurant.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 space-y-8 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center">
        {restaurantId ? "Edit" : "Add"} Restaurant
      </h2>

      {/* Image Upload */}
      <div>
        <label className="font-medium">Restaurant Image</label>
        <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition">
          <input
            type="file"
            onChange={handleRestaurantImage}
            disabled={loadingRestaurantImage}
            className="hidden"
            id="restaurantImage"
          />
          <label htmlFor="restaurantImage" className="block cursor-pointer">
            {loadingRestaurantImage ? (
              <div className="flex justify-center items-center gap-2 text-blue-500">
                <Loader2 className="animate-spin" /> Uploading...
              </div>
            ) : restaurantImage ? (
              <div className="relative w-full h-60">
                <Image
                  src={restaurantImage}
                  alt="Restaurant Image"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ) : (
              <span className="text-gray-500">Click to upload image</span>
            )}
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="name"
          defaultValue={restaurantData?.name}
          placeholder="Restaurant Name"
          className="p-3 border rounded-lg w-full"
          required
        />
        <select
          name="cuisine"
          defaultValue={restaurantData?.cuisine}
          className="p-3 border rounded-lg w-full"
          required
        >
          <option value="">Select Cuisine</option>
          <option>Bangladeshi</option>
          <option>Indian</option>
          <option>Pakistani</option>
          <option>Chinese</option>
          <option>Thai</option>
          <option>Japanese</option>
          <option>Korean</option>
        </select>
        <select
          name="priceLabel"
          defaultValue={restaurantData?.priceLabel}
          className="p-3 border rounded-lg w-full"
          required
        >
          <option value="">Select Price Label</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          name="price"
          type="number"
          defaultValue={restaurantData?.price}
          placeholder="Average Price"
          className="p-3 border rounded-lg w-full"
          required
        />
        <input
          name="rating"
          type="number"
          step={0.1}
          min={0}
          max={5}
          defaultValue={restaurantData?.rating}
          placeholder="Rating"
          className="p-3 border rounded-lg w-full"
        />
        <input
          name="distance"
          type="number"
          defaultValue={restaurantData?.distance}
          placeholder="Distance"
          className="p-3 border rounded-lg w-full"
        />
        <input
          name="deliveryTime"
          type="number"
          defaultValue={restaurantData?.deliveryTime}
          placeholder="Delivery Time"
          className="p-3 border rounded-lg w-full"
        />
        <select
          name="offer"
          defaultValue={restaurantData?.offer}
          className="p-3 border rounded-lg w-full"
        >
          <option value="">Select Offer</option>
          <option value="Free delivery">Free delivery</option>
          <option value="Deals">Deals</option>
          <option value="Vouchers">Accepts vouchers</option>
        </select>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isSuper"
            defaultChecked={restaurantData?.isSuper}
            className="h-5 w-5"
          />
          <label className="text-sm">Mark as Super Restaurant</label>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <MenuForm
          menu={menu}
          setMenu={setMenu}
          loadingDishIndex={loadingDishIndex}
          handleDishImage={handleDishImage}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isAdding || isUpdating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {(isAdding || isUpdating) && <Loader2 className="animate-spin" />}
          {restaurantId ? "Update" : "Add"} Restaurant
        </button>
      </div>
    </form>
  );
}
