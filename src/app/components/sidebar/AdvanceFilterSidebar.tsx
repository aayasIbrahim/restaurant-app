"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSortBy,
  toggleQuickFilter,
  toggleOffer,
  toggleCuisine,
  togglePrice,
  clearAll,
} from "../../redux/filters/filterSlice";

const cuisines = ["Bangladeshi", "Indian", "Chinese", "Italian", "Thai"];
const prices = ["Low", "Medium", "High"];

const AdvanceFilterSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy, quickFilter, offers, selectedCuisines, selectedPrices } = useSelector(
    (state: RootState) => state.filters
  );
  const [searchCuisine, setSearchCuisine] = useState("");

  return (
    <aside className="w-full sm:w-80 lg:w-72 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={() => dispatch(clearAll())}
          className="text-sm text-pink-500 hover:text-pink-600 flex items-center gap-1 transition-colors"
        >
          <X size={18} /> Clear All
        </button>
      </div>

      {/* Scrollable Filters */}
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
        {/* Sort By */}
        <section>
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Sort by</h3>
          <div className="flex flex-col gap-2">
            {["relevance", "fastest", "distance", "top"].map((val) => (
              <label
                key={val}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <input
                  type="radio"
                  checked={sortBy === val}
                  onChange={() => dispatch(setSortBy(val))}
                  className="accent-pink-500"
                />
                <span className="capitalize">{val}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Quick Filter */}
        <section>
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Quick Filter</h3>
          <div className="flex flex-wrap gap-2">
            {[{ key: "rating4", label: "Rating 4+" }, { key: "super", label: "Super Restaurant" }].map(
              (f) => (
                <button
                  key={f.key}
                  onClick={() => dispatch(toggleQuickFilter(f.key))}
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${
                    quickFilter.includes(f.key)
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  }`}
                >
                  {f.label}
                </button>
              )
            )}
          </div>
        </section>

        {/* Offers */}
        <section>
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Offers</h3>
          <div className="flex flex-col gap-2">
            {["Free delivery", "Accepts vouchers", "Deals"].map((offer) => (
              <label
                key={offer}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <input
                  type="checkbox"
                  checked={offers.includes(offer)}
                  onChange={() => dispatch(toggleOffer(offer))}
                  className="accent-pink-500"
                />
                {offer}
              </label>
            ))}
          </div>
        </section>

        {/* Cuisines */}
        <section>
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Cuisines</h3>
          <input
            type="text"
            placeholder="Search cuisine"
            value={searchCuisine}
            onChange={(e) => setSearchCuisine(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
          />
          <div className="flex flex-col gap-2">
            {cuisines
              .filter((c) => c.toLowerCase().includes(searchCuisine.toLowerCase()))
              .map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedCuisines.includes(c)}
                    onChange={() => dispatch(toggleCuisine(c))}
                    className="accent-pink-500"
                  />
                  {c}
                </label>
              ))}
          </div>
        </section>

        {/* Price */}
        <section>
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Price</h3>
          <div className="flex flex-col gap-2">
            {prices.map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(p)}
                  onChange={() => dispatch(togglePrice(p))}
                  className="accent-pink-500"
                />
                {p}
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default AdvanceFilterSidebar;
