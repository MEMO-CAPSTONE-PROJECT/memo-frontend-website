# Install bun
FROM oven/bun:latest
WORKDIR /app
# Copy package.json and package-lock.json to container
COPY package*.json ./
# Install dependencies
RUN bun install
# Copy the rest of the application
COPY . .
# Build app and start
ENV NEXT_TELEMETRY_DISABLED 1
# Production
RUN bun run build
ENTRYPOINT ["bun","run","start"]
# Dev
# CMD ["bun","run","dev"]
