# Stage 1: install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Stage 2: build
FROM node:22-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY public ./public
COPY package.json next.config.js tsconfig.json .env.production custom-image-loader.js ./
RUN npm run build

# Stage 3: run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["npm", "run", "start"]
