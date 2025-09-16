"use client";
import React, { useEffect, useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AdvanceFilterSidebar from "./components/sidebar/AdvanceFilterSidebar";
import LoadingGrid from "./components/UI/loading/LoadingGrid";
import SearchInput from "./components/UI/SearchInput";
import RestaurantCard from "./components/UI/RestaurantCard";
// import { toggleFavourite } from "./redux/favourites/favouriteSlice";

// ✅ Small debounce hook
// 📝 Custom hook: useDebounce
// কাজ: যেকোনো value change হলে সাথে সাথে return না করে,
// নির্দিষ্ট সময় (delay) অপেক্ষা করে তারপর return করে।
// সাধারণত search input এ ব্যবহার হয় যাতে user টাইপ করা বন্ধ করার পরেই
// API call / filtering ট্রিগার হয়।
function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  priceLabel: string;
  price: number;
  offer?: string;
  rating: number;
  distance: number;
  deliveryTime: number;
  isSuper?: boolean;
  image?: string;
  menu?: (string | number | null)[];
}

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  // const dispatch = useDispatch();
  const { selectedCuisines, selectedPrices, offers, quickFilter, sortBy } =
    useSelector((state: RootState) => state.filters);
  const favourites = useSelector((state: RootState) => state.favourites.items);

  // Fetch API
  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter & Sort & Search
  const filteredRestaurants = useMemo(() => {
    let res = [...restaurants];

    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      res = res.filter(
        (r) =>
          (typeof r.name === "string" && r.name.toLowerCase().includes(term)) ||
          (typeof r.cuisine === "string" &&
            r.cuisine.toLowerCase().includes(term)) ||
          (Array.isArray(r.menu) &&
            r.menu.some(
              (dish) =>
                dish &&
                typeof dish.name === "string" &&
                dish.name.toLowerCase().includes(term)
            ))
      );
    }

    if (selectedCuisines.length)
      res = res.filter((r) => selectedCuisines.includes(r.cuisine));
    if (selectedPrices.length)
      res = res.filter((r) => selectedPrices.includes(r.priceLabel));
    if (offers.length) res = res.filter((r) => offers.includes(r.offer ?? ""));
    quickFilter.forEach((f) => {
      if (f === "rating4") res = res.filter((r) => r.rating >= 4);
      if (f === "super") res = res.filter((r) => r.isSuper);
    });
    if (sortBy === "fastest")
      res.sort((a, b) => a.deliveryTime - b.deliveryTime);
    if (sortBy === "distance") res.sort((a, b) => a.distance - b.distance);
    if (sortBy === "top") res.sort((a, b) => b.rating - a.rating);

    return res;
  }, [
    restaurants,
    debouncedSearch,
    selectedCuisines,
    selectedPrices,
    offers,
    quickFilter,
    sortBy,
  ]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-72">
        <AdvanceFilterSidebar onclose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Filter */}
      <div className="lg:hidden fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 text-white shadow-lg"
        >
          <SlidersHorizontal size={20} /> Filter
        </button>
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="z-100000 fixed top-[41px] left-0 w-72 h-full overflow-y-auto">
            <AdvanceFilterSidebar onclose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      <main className="flex-1 p-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          All Restaurants
        </h1>

        {/* Search Input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* Loader */}
        {loading ? (
          <LoadingGrid count={6} />
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredRestaurants.map((r) => (
              <RestaurantCard
                key={r._id}
                price={r.price}
                id={r._id}
                name={r.name}
                cuisine={r.cuisine}
                priceLabel={r.priceLabel}
                offer={r.offer}
                image={r.image}
                rating={r.rating}
                deliveryTime={r.deliveryTime}
                isFav={favourites.includes(r._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">🍽️ No Restaurant Found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
