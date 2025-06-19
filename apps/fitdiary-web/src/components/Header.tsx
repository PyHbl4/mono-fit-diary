import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <button onClick={toggleMenu} className="md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <h1 className="text-lg">FitDiary</h1>
      {isOpen && <DropdownMenu />}
    </header>
  );
};

export default Header;
