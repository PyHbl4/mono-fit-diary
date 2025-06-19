import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать в FitDiary</h1>
      <p className="mb-6">Это клиентское приложение для вашего фитнес-дневника.</p>
      <Button variant="default">Начать</Button>
    </main>
  );
}
