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
[ ] Enable CORS and global error handling

## 2️⃣ Domain Layer (Business Logic)
[ ] Define `Product` entity in `domain/entities/product.ts`
[ ] Define `ProductRepository` interface in `domain/repositories/product-repository.ts`

## 3️⃣ Application Layer (Use Cases)
[ ] Implement `create-product.ts`
[ ] Implement `update-product.ts`
[ ] Implement `delete-product.ts`
[ ] Implement `get-product.ts`
[ ] Implement `list-products.ts`

## 4️⃣ Infrastructure Layer (Persistence)
[ ] Install and configure Prisma
[ ] Define `Product` model in `prisma/schema.prisma`
[ ] Generate Prisma client with `npx prisma generate`
[ ] Implement `prisma-product-repository.ts`

## 5️⃣ API Routes
[ ] Define REST endpoints in `infrastructure/routes/product-routes.ts`
[ ] Register routes in `src/app.ts`

## 6️⃣ Validation & Error Handling
[ ] Add validation with `zod` or `fastify-schema`
[ ] Implement custom error classes in `shared/errors/`

## 7️⃣ Testing
[ ] Install `vitest` and `@fastify/test-helper`
[ ] Write unit tests for use cases
[ ] Write integration tests for routes

# 🚀 Final Steps
[ ] Add logging with `pino`
[ ] Implement dependency injection (if needed)
[ ] Deploy using Docker or Vercel
