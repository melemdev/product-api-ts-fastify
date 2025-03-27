import z from 'zod';

import { Product, ProductEntity } from '@/core/entities/product.entity';
import { ProductRepository } from '@/repositories/product.repository';
import { UseCase, UseCaseConfig } from '@/shared/core/use-case';
import { nullable } from '@/shared/types/nullable';
import { ProductSchema } from '@/core/schemas/product.schema';

export class FindByIdProductUseCase extends UseCase<string, nullable<Product>> {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }

  static config(): UseCaseConfig {
    return {
      schema: {
        description: 'Find Product by ID',
        tags: ['products'],
        response: {
          200: ProductSchema,
          404: z.object({ error: z.string() }),
        },
      },
    };
  }

  async execute(input: string): Promise<nullable<Product>> {
    return this.productRepository.findById(input);
  }
}
