import z from 'zod';

import { ProductRepository } from '@/repositories/product.repository';

export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  static config() {
    return {
      schema: {
        description: 'Create a new product',
        tags: ['products'],
        response: { 200: z.null() },
      },
    };
  }

  async execute(id: string) {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.repository.delete(id);
  }
}
