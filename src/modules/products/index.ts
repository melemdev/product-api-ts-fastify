import { FastifyInstance } from 'fastify';
import { InMemoryProductRepository } from './repositories/in-memory-product.repository';
import { ListProductsUseCase } from './usecases/list-products.usecase';
import { CreateProductUseCase } from './usecases/create-product.usecase';
import { ProductController } from './controllers/product.controller';
import { FindByIdProductUseCase } from './usecases/find-by-id-product.usecase';
import { UpdateProductUseCase } from './usecases/update-product.usecase';
import { DeleteProductUseCase } from './usecases/delete-product.usecase';

export async function ProductModule(server: FastifyInstance) {
  const productRepository = new InMemoryProductRepository();
  const productController = new ProductController(productRepository);

  server.post('/products', CreateProductUseCase.config(), productController.createProduct);
  server.get('/products', ListProductsUseCase.config(), productController.listProduct);
  server.get('/products/:id', FindByIdProductUseCase.config(), productController.findByIdProduct);
  server.put('/products/:id', UpdateProductUseCase.config(), productController.updateProduct);
  server.delete('/products/:id', DeleteProductUseCase.config(), productController.deleteProduct);
}
