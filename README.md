# Fastify API with DDD - Roadmap

# ✅ Project Setup
[x] Initialize project with `npm init -y`
[x] Install Fastify and dependencies
[x] Set up TypeScript with `tsconfig.json`
[x] Create folder structure following DDD principles

# ⚡ Implementation Steps

## 1️⃣ Setup Fastify Server
[x] Create `src/main.ts` for server bootstrap
[x] Configure `src/app.ts` with Fastify instance
[x] Enable CORS and global error handling

## 2️⃣ Domain Layer (Business Logic)
[x] Define `Product` entity in `domain/entities/product.ts`
[x] Define `ProductRepository` interface in `domain/repositories/product-repository.ts`

## 3️⃣ Application Layer (Use Cases)
[x] Implement `create-product.ts`
[x] Implement `update-product.ts`
[x] Implement `delete-product.ts`
[x] Implement `get-product.ts`
[x] Implement `list-products.ts`

## 4️⃣ Infrastructure Layer (Persistence)
[ ] Install and configure Prisma
[ ] Define `Product` model in `prisma/schema.prisma`
[ ] Generate Prisma client with `npx prisma generate`
[ ] Implement `prisma-product-repository.ts`

## 6️⃣ Validation & Error Handling
[x] Add validation with `zod` or `fastify-schema`
[ ] Implement custom error classes in `shared/errors/`

## 7️⃣ Testing
[ ] Install `vitest` and `@fastify/test-helper`
[ ] Write unit tests for use cases
[ ] Write integration tests for routes

# 🚀 Final Steps
[x] Add logging with `pino`
[ ] Deploy using Docker or Vercel