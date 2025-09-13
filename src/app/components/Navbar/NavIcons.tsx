"use client";

import React from "react";
import Link from "next/link";
import IconButton from "../UI/IconButton";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface NavIconsProps {
  onlyHeart?: boolean;
}

const NavIcons: React.FC<NavIconsProps> = ({ onlyHeart = false }) => {
  // Get favourite items from Redux
  const favourites = useSelector((state: RootState) => state.favourites.items);
 const totalQuantity = useSelector((state: RootState) => state.carts.totalQuantity);
  

  return (
    <div className="flex items-center gap-3 relative">
      {/* Heart icon with badge */}
      <Link href="/favourite" className="relative">
        <IconButton icon={<CiHeart size={25} />} />
        {favourites.length > 0 && (
          <span className="absolute -top-1 -right-0 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
            {favourites.length}
          </span>
        )}
      </Link>

      {/* Cart icon*/}
      {!onlyHeart && (
        <Link href="/cart" className="relative">
          <IconButton icon={<LuShoppingCart size={22} />} />

          {totalQuantity >0 &&
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">{totalQuantity}</span>}
        </Link>
      )}
    </div>
  );
};

export default NavIcons;
