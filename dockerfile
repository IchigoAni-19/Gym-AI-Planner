# ── Stage 1: Build Frontend (React + Vite) ───────────────────────────────────
FROM node:22-alpine AS frontend-build
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend source files
# .dockerignore will exclude node_modules, dist, .env
COPY . .

# Neon Auth endpoint URL required at frontend build time
ARG VITE_NEON_AUTH_URL="https://ep-spring-cake-az0sitbd.neonauth.c-3.ap-southeast-1.aws.neon.tech/neondb/auth"
ENV VITE_NEON_AUTH_URL=$VITE_NEON_AUTH_URL

# Build React app → /app/dist
RUN npm run build


# ── Stage 2: Build Backend (Express + TypeScript) ────────────────────────────
FROM node:22-alpine AS backend-build
WORKDIR /server

# Copy server package files
COPY server/package*.json ./

# Install ALL dependencies (including devDeps needed for tsc + prisma generate)
RUN npm install

# Copy server source (prisma schema, src, tsconfig, etc.)
COPY server/ .

# Generate Prisma client from schema
RUN npx prisma generate

# Compile TypeScript → /server/dist
RUN npm run build


# ── Stage 3: Production Image ─────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

# Copy compiled backend JS files
COPY --from=backend-build /server/dist ./dist

# Copy production node_modules (runtime deps only)
COPY --from=backend-build /server/node_modules ./node_modules

# Copy generated Prisma client (required at runtime)
COPY --from=backend-build /server/generated ./generated

# Copy prisma schema (needed for migrate deploy on boot if required)
COPY --from=backend-build /server/prisma ./prisma

# Copy compiled frontend static files → Express will serve from here
COPY --from=frontend-build /app/dist ./public

# Azure App Service uses port 8080 by default
EXPOSE 8080

# Start the compiled Express server
CMD ["node", "dist/src/index.js"]