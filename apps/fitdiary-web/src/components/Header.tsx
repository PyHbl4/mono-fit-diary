"use client";

import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useUser } from "@/lib/UserContext";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return user ? (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <button onClick={toggleMenu} className="">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <h1 className="text-lg">FitDiary</h1>
      {isOpen && <DropdownMenu toggleMenu={toggleMenu} />}
    </header>
  ) : null;
};

export default Header;
