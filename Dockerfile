FROM node:22-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json* ./
RUN npm install

# Next.js specific build setup
COPY . .
RUN npm run build

# Next.js runs on 3000 by default
EXPOSE 3000

# Use development mode
CMD ["npm", "run", "dev"]