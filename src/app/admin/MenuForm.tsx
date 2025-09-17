import React from "react";
import { Loader2, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { Dish } from "../redux/Api/restaurantTypes";

interface Props {
  menu: Dish[];
  setMenu: React.Dispatch<React.SetStateAction<Dish[]>>;
  loadingDishIndex: number | null;
  handleDishImage: (index: number, file: File) => void;
}

export default function MenuForm({
  menu,
  setMenu,
  loadingDishIndex,
  handleDishImage,
}: Props) {
  const handleChange = (index: number, field: keyof Dish, value: string) => {
    setMenu((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const addDish = () => {
    setMenu((prev) => [
      ...prev,
      { id: Date.now(), name: "", description: "", price: "", image: "" },
    ]);
  };

  const removeDish = (index: number) => {
    setMenu((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-2">Menu</h3>

      {menu.map((dish, index) => (
        <div
          key={dish.id}
          className="bg-gray-800 p-6 rounded-xl shadow flex flex-col gap-4"
        >
          {/* Dish Image Upload */}
          <div>
            <label className="text-sm font-medium">Dish Image</label>
            <div className="mt-2 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-gray-700 transition">
              <input
                type="file"
                className="hidden"
                id={`dishImage-${index}`}
                onChange={(e) =>
                  e.target.files?.[0] && handleDishImage(index, e.target.files[0])
                }
              />
              <label
                htmlFor={`dishImage-${index}`}
                className="block cursor-pointer"
              >
                {loadingDishIndex === index ? (
                  <div className="flex items-center justify-center text-blue-400 gap-2">
                    <Loader2 className="animate-spin" /> Uploading...
                  </div>
                ) : dish.image ? (
                  <div className="relative w-full h-40">
                    <Image
                      src={dish.image}
                      alt="Dish"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400">Click to upload image</span>
                )}
              </label>
            </div>
          </div>

          {/* Dish Inputs */}
          <input
            value={dish.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            placeholder="Dish Name"
            className="p-3 border rounded-lg w-full text-white placeholder:text-gray-400"
          />
          <textarea
            value={dish.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            placeholder="Dish Description"
            className="p-3 border rounded-lg w-full text-white placeholder:text-gray-400"
          />
          <input
            type="number"
            value={dish.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
            placeholder="Dish Price"
            className="p-3 border rounded-lg w-full text-white placeholder:text-gray-400"
          />

          {/* Remove button */}
          {menu.length > 1 && (
            <button
              type="button"
              onClick={() => removeDish(index)}
              className="flex items-center gap-2 text-red-400 hover:text-red-500"
            >
              <Trash2 size={18} /> Remove Dish
            </button>
          )}
        </div>
      ))}

      {/* Add Dish Button */}
      <button
        type="button"
        onClick={addDish}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        <Plus size={18} /> Add Dish
      </button>
    </div>
  );
}
