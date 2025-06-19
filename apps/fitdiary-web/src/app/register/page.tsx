'use client';

import { useState } from 'react';
import { useUser } from "@/lib/UserContext";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useUser();
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== passwordConfirm) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      console.log('register...');
      
      await registerUser(name, login, password);
      setLoading(false);
      router.push('/login');
    } catch (err) {
      setError('Ошибка сети');
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Регистрация в FitDiary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login" className="block mb-1 font-medium">
            Логин
          </label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Ваше имя
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm" className="block mb-1 font-medium">
            Подтверждение пароля
          </label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </p>
    </main>
  );
}
