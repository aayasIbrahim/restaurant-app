"use client";
import React, { useState } from "react";
import { menuItems, MenuItem } from "../../data/menuItems";
import { IoMenu } from "react-icons/io5";

interface SidebarProps {
  onSelect: (id: string) => void;
  selectedId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedId }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = menuItems.filter(
    (item) =>
      search === "" ||
      item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden fixed bottom-0 left-4 z-50 bg-pink-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
    <aside
       className={`fixed lg:sticky top-0 left-0 
         h-full lg:h-[calc(100vh-80px)] w-72 
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
            border-r shadow-lg flex flex-col p-6 z-50 
           transition-transform duration-300 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
             lg:translate-x-0 lg:top-[]`}
      >
        {/* Search Box */}
        <div className="mb-6">
          <input
            type="search"
            placeholder="Search Foods..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
            focus:ring-2 focus:ring-pink-500 focus:outline-none 
            bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {filteredItems.map((item: MenuItem) => (
              <li key={item.id}>
                <div
                  onClick={() => {
                    onSelect(item.id);
                    setIsOpen(false); // close sidebar on mobile
                  }}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-300 font-medium cursor-pointer
                    hover:bg-pink-50 dark:hover:bg-gray-700
                    ${selectedId === item.id ? "bg-pink-200" : ""}`}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Special Offer */}
        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded-lg text-center font-semibold shadow-md">
          ⭐ Today’s Offer: Buy 1 Get 1 Free Burger! 🍔
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
