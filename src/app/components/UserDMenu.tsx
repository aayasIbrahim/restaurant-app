"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuProps {
  onClose: () => void;
}

function UserMenu({ onClose }: UserMenuProps) {
  return (
    <div className="absolute md:left-5 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-200 z-50 overflow-hidden">
      <ul className="py-2">
        {/* Add restaurant (admin) */}
        <li>
          <Link
            href="/admin"
            onClick={onClose}
            className="block px-4 py-2 text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
          >
            Add Restaurant
          </Link>
        </li>

        {/* Profile */}
        <li>
          <Link
            href="/profile"
            onClick={onClose}
            className="block px-4 py-2 text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
          >
            Profile
          </Link>
        </li>

        {/* Logout */}
        <li>
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
