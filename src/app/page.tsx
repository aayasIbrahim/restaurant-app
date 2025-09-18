"use client";
import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AdvanceFilterSidebar from "./components/sidebar/AdvanceFilterSidebar";
import LoadingGrid from "./components/UI/loading/LoadingGrid";
import SearchInput from "./components/UI/SearchInput";
import RestaurantCard from "./components/UI/RestaurantCard";
import { useGetRestaurantsQuery } from "./redux/Api/restaurantApi";

// Restaurant type
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
  menu?: { name: string }[];
}

// ✅ Custom debounce hook
function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  // RTK Query
  const { data, isLoading, isError } = useGetRestaurantsQuery();
  const restaurants: Restaurant[] = data?.restaurants || [];

  // Redux filters & favourites
  const { selectedCuisines, selectedPrices, offers, quickFilter, sortBy } =
    useSelector((state: RootState) => state.filters);
  const favourites = useSelector((state: RootState) => state.favourites.items);

  // Filter + Sort + Search
  const filteredRestaurants = useMemo(() => {
    let res = [...restaurants];

    // Search
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      res = res.filter(
        (r) =>
          r.name?.toLowerCase().includes(term) ||
          r.cuisine?.toLowerCase().includes(term) ||
          r.menu?.some((dish) => dish?.name?.toLowerCase().includes(term))
      );
    }

    // Filters
    if (selectedCuisines.length) res = res.filter((r) => selectedCuisines.includes(r.cuisine));
    if (selectedPrices.length) res = res.filter((r) => selectedPrices.includes(r.priceLabel));
    if (offers.length) res = res.filter((r) => offers.includes(r.offer ?? ""));
    quickFilter.forEach((f) => {
      if (f === "rating4") res = res.filter((r) => r.rating >= 4);
      if (f === "super") res = res.filter((r) => r.isSuper);
    });

    // Sort
    if (sortBy === "fastest") res.sort((a, b) => a.deliveryTime - b.deliveryTime);
    if (sortBy === "distance") res.sort((a, b) => a.distance - b.distance);
    if (sortBy === "top") res.sort((a, b) => b.rating - a.rating);

    // Add isFav
    return res.map((r) => ({ ...r, isFav: favourites.includes(r._id) }));
  }, [
    restaurants,
    debouncedSearch,
    selectedCuisines,
    selectedPrices,
    offers,
    quickFilter,
    sortBy,
    favourites,
  ]);

  return (
    <section className="min-h-screen bg-gray-900 text-white">
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
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
            <div className="z-50 fixed top-[41px] left-0 w-72 h-full overflow-y-auto">
              <AdvanceFilterSidebar onclose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        <main className="flex-1 p-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">All Restaurants</h1>

          {/* Search Input */}
          <SearchInput value={search} onChange={setSearch} />

          {/* Loader */}
          {isLoading ? (
            <LoadingGrid count={6} />
          ) : filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredRestaurants.map((r) => (
                <RestaurantCard
                  key={r._id}
                  id={r._id}
                  name={r.name}
                  cuisine={r.cuisine}
                  priceLabel={r.priceLabel}
                  price={r.price}
                  offer={r.offer}
                  image={r.image}
                  rating={r.rating}
                  deliveryTime={r.deliveryTime}
                  isFav={r.isFav}
                />
              ))}
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-gray-400 text-lg">🍽️ No Restaurant Found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {isError && (
            <p className="text-red-500 mt-4 text-center">❌ Failed to load restaurants. Please try again.</p>
          )}
        </main>
      </div>
    </section>
  );
};

export default HomePage;
