# Используем базовый образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Клонируем репозиторий внутрь контейнера
RUN git clone https://github.com/mgvts/nuxtTodo.git .

# Устанавливаем зависимости
RUN npm install

# Собираем приложение
RUN npm run build

# Указываем порт, который будет использоваться
EXPOSE 3000

# Запускаем приложение
CMD [ "npm", "run", "start" ]