# Этап сборки
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/fitdiary-api/package*.json ./apps/fitdiary-api/
RUN npm ci
COPY . .
RUN npm run build
RUN ls -la apps/fitdiary-api/dist  # Для отладки

# Этап запуска
FROM node:23-alpine
WORKDIR /app
# Копируем собранные файлы из правильной директории
COPY --from=builder /app/apps/fitdiary-api/dist ./dist
COPY --from=builder /app/apps/fitdiary-api/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/main.js"]