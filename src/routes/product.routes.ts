import { FastifyInstance } from 'fastify';

import { ProductRepository } from '@/repositories/product.repository';
import { prisma } from '@/@config/database';
import { ProductController } from '../application/controllers/product.controller';
import { CreateProductUseCase } from '../application/usecases/create-product-usecase/create-product.usecase';
import { ListProductsUseCase } from '../application/usecases/list-product-usecase/list-products.usecase';
import { FindByIdProductUseCase } from '../application/usecases/find-by-id-product-usecase/find-by-id-product.usecase';
import { UpdateProductUseCase } from '../application/usecases/update-product-usecase/update-product.usecase';
import { DeleteProductUseCase } from '../application/usecases/delete-product-usecase/delete-product.usecase';

export async function ProductRoutes(server: FastifyInstance) {
  const productRepository = new ProductRepository(prisma);
  const productController = new ProductController(productRepository);

  server.post('/products', CreateProductUseCase.config(), productController.createProduct);
  server.get('/products', ListProductsUseCase.config(), productController.listProduct);
  server.get('/products/:id', FindByIdProductUseCase.config(), productController.findByIdProduct);
  server.put('/products/:id', UpdateProductUseCase.config(), productController.updateProduct);
  server.delete('/products/:id', DeleteProductUseCase.config(), productController.deleteProduct);
}
