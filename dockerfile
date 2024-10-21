# Этап сборки
FROM node:23-alpine AS builder

WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./
COPY apps/fitdiary-api/package*.json ./apps/fitdiary-api/

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап запуска
FROM node:23-alpine

WORKDIR /app

# Копируем собранное приложение из этапа сборки
COPY --from=builder /apps/fitdiary-api/dist ./dist

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]