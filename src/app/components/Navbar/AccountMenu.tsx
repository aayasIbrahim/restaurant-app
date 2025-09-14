"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSession, signIn } from "next-auth/react";
import UserMenu from "../UserDMenu";

export default function AccountMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // If not logged in → show login button
  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        Login
      </button>
    );
  }

  // User display name
  const displayName =
    session.user?.firstName && session.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session.user?.firstName || session.user?.email;

  return (
    <div className="relative">
      {/* Menu toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <FaUserCircle size={22} className="text-gray-700" />
        <span className="hidden sm:block font-medium text-gray-800">
          {displayName}
        </span>
        <MdKeyboardArrowDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && <UserMenu onClose={() => setOpen(false)} />}
    </div>
  );
}
