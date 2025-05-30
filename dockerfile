# Этап запуска
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock) для установки зависимостей
COPY apps/fitdiary-api/package*.json ./

# Копируем .env файл
COPY .env ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем файл схемы Prisma
COPY apps/fitdiary-api/prisma/schema.prisma ./prisma/schema.prisma

# Копируем все миграции из директории migrations
COPY apps/fitdiary-api/prisma/migrations ./prisma/migrations

# Копируем собранные файлы из локальной директории
COPY apps/fitdiary-api/dist ./dist

RUN npx prisma generate

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/main.js"]