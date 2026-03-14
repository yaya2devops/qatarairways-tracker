# Use the official Playwright image — includes Node.js, Chromium and all
# system dependencies, and is regularly patched for security vulnerabilities.
FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# Build tools required by better-sqlite3 (native module)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Install ALL deps (devDependencies needed for nest CLI to build)
RUN npm ci

COPY . .

# Build the app
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# Persist the SQLite database outside the container
VOLUME ["/app/data"]

ENV NODE_ENV=production
# Tell Playwright to use the pre-installed browser in the base image
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

EXPOSE 3000

CMD ["node", "dist/main"]
