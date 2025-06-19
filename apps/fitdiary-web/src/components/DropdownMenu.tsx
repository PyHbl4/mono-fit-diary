import React from 'react';
import Link from 'next/link';

const DropdownMenu: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
      <div className="py-1">
        <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Профиль</Link>
        <Link href="/workouts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Тренировки</Link>
        <Link href="/exercises" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Мои упражнения</Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
