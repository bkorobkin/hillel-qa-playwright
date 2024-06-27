# Используем базовый образ Playwright с Chrome
FROM playwright/chrome:playwright-1.45.0

# Устанавливаем рабочий каталог
WORKDIR /work

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости как пользователь root
USER root

# Устанавливаем системные зависимости, необходимые для Playwright
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon-x11-0 \
    libgbm-dev

# Устанавливаем проектные зависимости с правами root
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Переключаемся обратно на пользователя pwuser
USER pwuser

# Команда по умолчанию для запуска тестов
CMD ["npx", "playwright", "test"]
