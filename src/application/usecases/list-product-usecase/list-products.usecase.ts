import { Product, ProductEntity } from '@/core/entities/product.entity';
import { listProductsResponseSchema, ProductSchema } from '@/core/schemas/product.schema';
import { ProductRepository } from '@/repositories/product.repository';
import { UseCase, UseCaseConfig } from '@/shared/core/use-case';

export class ListProductsUseCase extends UseCase<void, Product[]> {
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

  async execute(): Promise<Product[]> {
    const records = await this.productRepository.findAll();
    return records;
  }
}
