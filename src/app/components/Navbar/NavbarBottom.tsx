"use client";

import React from "react";
import Link from "next/link";
import { FaMotorcycle, FaStore, FaShoppingBasket, FaUserShield } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useSession } from "next-auth/react";

const NavbarBottom = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;

  // Default menu items
  const menuItems = [
    { icon: <FaMotorcycle />, label: "Delivery", href: "/delivery" },
    { icon: <FaStore />, label: "Pick-up", href: "/pickup" },
    { icon: <MdOutlineLocalGroceryStore />, label: "Pandamart", href: "/pandamart" },
    { icon: <FaShoppingBasket />, label: "Shop", href: "/shop" },
  ];

  // Admin can see only admin panel
  if (role === "admin") {
    menuItems.push({ icon: <FaUserShield />, label: "Admin", href: "/admin" });
  }

  // Super-admin can see both admin + super-admin
  if (role === "super-admin") {
    menuItems.push(
      { icon: <FaUserShield />, label: "Admin", href: "/admin" },
      { icon: <FaUserShield />, label: "Super Admin", href: "/super-admin" }
    );
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="flex justify-center gap-10 py-4 text-gray-700 text-lg font-medium">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href} className="relative flex flex-col items-center group">
            <div className="flex items-center gap-2 mb-3 text-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              {item.icon} {item.label}
            </div>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[4px] bg-pink-600 rounded-full transition-all duration-400 group-hover:left-0 group-hover:w-full"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarBottom;
