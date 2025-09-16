"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from "../redux/Carts/cartSlice";
import { Trash2, Plus, Minus, Section } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { items, totalPrice, totalQuantity } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch();

  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-900 text-gray-200 px-4">
        <h1 className="text-4xl mb-4">🛒</h1>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-4">Looks like you haven’t added anything yet.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-lg hover:opacity-90 transition"
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
  <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className=" px-4 py-10 container mx-auto grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
              className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex items-center gap-4">
                {item.image ? (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-300 mt-1">
                    ৳ {item.price} × {item.quantity} = <span className="font-semibold">৳ {(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-transform active:scale-90"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-transform active:scale-90"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={() => dispatch(clearCart())}
          className="mt-4 text-red-500 hover:text-red-600 font-semibold transition"
        >
          Clear Cart
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-white flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between text-gray-300">
          <span>Items ({totalQuantity})</span>
          <span>৳ {totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Tax (5%)</span>
          <span>৳ {tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        <div className="flex justify-between text-white font-semibold text-lg">
          <span>Total</span>
          <span>৳ {grandTotal.toFixed(2)}</span>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:opacity-90 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </section>
  );
};

export default CartPage;
