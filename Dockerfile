# Stage 1: сборка приложения
FROM node:16 AS builder

WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
COPY . .

# Устанавливаем зависимости
RUN npm install

# Собираем приложение
RUN npm run build

# Stage 2: сборка образа для запуска
FROM nginx:alpine AS app

# Копируем собранные файлы из stage 1
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Копируем настройки nginx (опционально)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
