"use client";

import { useState } from "react";
import { useUser } from "@/lib/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login: loginUser, user } = useUser();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(login, password);
      if (!user) {
        setError("Ошибка авторизации");
        setLoading(false);
        return;
      }

      // Здесь можно добавить логику для сохранения токена, если он возвращается
      setLoading(false);
      router.push("/");
    } catch (err) {
      setError("Ошибка сети");
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Вход в FitDiary</h1>
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
        {error && <p className="text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </main>
  );
}
