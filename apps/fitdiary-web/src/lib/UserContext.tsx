'use client'

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { TUser } from '@/types/user-types';
import { getRequest, postRequest } from './api';
import { useRouter } from 'next/router'; // Импортируем useRouter

// Создаем контекст пользователя
const UserContext = createContext<{
  user: TUser | null;
  login: (email: string, password: string) => Promise<TUser | null>;
  logout: () => boolean; // Изменяем тип возвращаемого значения
  register: (name: string, email: string, password: string) => Promise<void>;
}>({
  user: null,
  login: async () => null,
  logout: () => false, // Обновляем значение по умолчанию
  register: async () => {},
});

// Провайдер контекста
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  // Функция для авторизации пользователя
  const login = async (login: string, password: string): Promise<TUser | null> => {
    console.log('login attempt');
    const response = await postRequest('/auth/login', {
      login,
      password,
    })
    const { access_token } = response;
    if (access_token) {
      Cookies.set('token', access_token);
      const userData = await getUser()
      setUser(userData);
      return userData as TUser
    }
    return null
  };

  // Функция для выхода пользователя
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    return true; // Возвращаем результат
  };

  // Функция для регистрации пользователя
  const register = async (name: string, login: string, password: string) => {
    await postRequest('/users/register', { name, login, password });
  };

  const getUser = async () => {
    const response = await getRequest('/users/me');
    return response || null;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
export const useUser = () => {
  return useContext(UserContext);
};
