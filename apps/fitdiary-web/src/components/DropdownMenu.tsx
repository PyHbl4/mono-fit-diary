import React from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/UserContext';
import { useRouter } from 'next/router';

const DropdownMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const { logout } = useUser()
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleMenu}>
      <div className="absolute left-0 top-0 w-48 h-full bg-white rounded-md shadow-lg z-30">
        <div className="py-1">
          <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Профиль</Link>
          <Link href="/workouts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Тренировки</Link>
          <Link href="/exercises" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Мои упражнения</Link>
          <button type='button' className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => {
            const isLoggedOut = logout()
            isLoggedOut ? router.push('/login') : null
          }}>ВЫЙТИ</button>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
