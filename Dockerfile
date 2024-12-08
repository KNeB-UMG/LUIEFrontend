FROM node:22-alpine

WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package.json package-lock.json* ./

# Instalacja zależności
RUN npm install

# Kopiowanie całego kodu aplikacji
COPY . .

# Port dla aplikacji React
EXPOSE 3000

# Uruchomienie aplikacji React
CMD ["npm", "start"]