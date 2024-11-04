# Этап запуска
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock) для установки зависимостей
COPY apps/fitdiary-api/package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем файл схемы Prisma
COPY apps/fitdiary-api/prisma/schema.prisma ./prisma/schema.prisma

# Копируем собранные файлы из локальной директории
COPY apps/fitdiary-api/dist ./dist

# Применяем миграции
RUN npx prisma migrate deploy

# Генерируем Prisma Client
RUN npx prisma generate

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/main.js"]