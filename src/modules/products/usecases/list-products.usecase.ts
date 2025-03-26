import { UseCase, UseCaseConfig } from '../../../shared/core/use-case';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { listProductsResponseSchema } from '../schemas/product.schema';

export class ListProductsUseCase extends UseCase<void, ProductEntity[]> {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }

  static config(): UseCaseConfig {
    return {
      schema: {
        description: 'List Products',
        tags: ['products'],
        response: {
          200: listProductsResponseSchema,
        },
      },
    };
  }

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}
