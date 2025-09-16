"use client";

import React from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/Carts/cartSlice";

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

export default function MenuCard({ item }: { item: MenuItem }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col">
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
          <span className="text-white font-bold">{item.price}৳</span>
          <button
            onClick={() => dispatch(addToCart({ id: item.id, name: item.name, price: item.price }))}
            className="px-3 py-1 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition"
          >
            <AiOutlineShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
