import z from 'zod';
import { UseCase, UseCaseConfig } from '../../../../shared/core/use-case';
import { nullable } from '../../../../shared/types/nullable';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { productResponseSchema } from '../../schemas/product.schema';

export class FindByIdProductUseCase extends UseCase<string, nullable<ProductEntity>> {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }

  static config(): UseCaseConfig {
    return {
      schema: {
        description: 'Find Product by ID',
        tags: ['products'],
        response: {
          200: productResponseSchema,
          404: z.object({ error: z.string() }),
        },
      },
    };
  }

  async execute(input: string): Promise<nullable<ProductEntity>> {
    return this.productRepository.findById(input);
  }
}
