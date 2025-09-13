"use client";
import React from "react";
import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import { Dish } from "./../redux/Api/restaurantTypes";

interface MenuFormProps {
  menu: Dish[];
  setMenu: React.Dispatch<React.SetStateAction<Dish[]>>;
  loadingDishIndex?: number | null;
  handleDishImage?: (index: number, file: File) => Promise<void>;
}

export default function MenuForm({
  menu,
  setMenu,
  loadingDishIndex,
  handleDishImage,
}: MenuFormProps) {
  const addDish = () =>
    setMenu([
      ...menu,
      { id: Date.now(), name: "", description: "", price: "", image: "" },
    ]);

  const updateDish = (index: number, field: keyof Dish, value: string) => {
    const updated = [...menu];
    updated[index][field] = value;
    setMenu(updated);
  };

  const deleteDish = (index: number) =>
    setMenu(menu.filter((_, i) => i !== index));

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Menu ({menu.length})</h3>

      <div className="space-y-4">
        {menu.map((dish, index) => (
          <div
            key={dish.id}
            className="p-4 border rounded-xl shadow-sm bg-gray-50"
          >
            {/* Dish Info */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                className="p-3 border rounded-lg"
                placeholder="Dish Name"
                value={dish.name}
                onChange={(e) => updateDish(index, "name", e.target.value)}
              />
              <input
                className="p-3 border rounded-lg"
                type="number"
                placeholder="Dish Price"
                value={dish.price}
                onChange={(e) => updateDish(index, "price", e.target.value)}
              />
              <textarea
                className="p-3 border rounded-lg md:col-span-2 resize-none"
                rows={2}
                placeholder="Dish Description"
                value={dish.description}
                onChange={(e) =>
                  updateDish(index, "description", e.target.value)
                }
              />

              {/* Upload & Preview */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Dish Image
                </label>

                <div className="relative border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-400 transition">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id={`dishImage-${dish.id}`}
                    className="hidden"
                    onChange={(e) =>
                      e.target.files &&
                      handleDishImage?.(index, e.target.files[0])
                    }
                    disabled={loadingDishIndex === index}
                  />

                  <label
                    htmlFor={`dishImage-${dish.id}`}
                    className="flex flex-col items-center justify-center w-full gap-2"
                  >
                    {dish.image ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={dish.image}
                          alt="Dish Preview"
                          fill
                          className="object-cover"
                        />

                        {/* Spinner Overlay */}
                        {loadingDishIndex === index && (
                          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                            <Loader2 className="animate-spin text-blue-600" size={24} />
                          </div>
                        )}
                      </div>
                    ) : loadingDishIndex === index ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Loader2 className="animate-spin" /> Uploading...
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0-6l-3 3m3-3l3 3m-6 6h6"
                          />
                        </svg>
                        <span>Click to upload dish image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => deleteDish(index)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <Trash2 size={16} />
                Delete Dish
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Dish Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={addDish}
          className="px-5 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          + Add Dish
        </button>
      </div>
    </div>
  );
}
