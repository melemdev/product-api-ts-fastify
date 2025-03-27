import { Product, ProductEntity } from '@/core/entities/product.entity';
import { updateProductSchema, UpdateProductDTO, ProductSchema } from '@/core/schemas/product.schema';
import { ProductRepository } from '@/repositories/product.repository';
import z from 'zod';

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  static config() {
    return {
      schema: {
        description: 'Edit product',
        tags: ['products'],
        body: updateProductSchema,
        response: {
          200: ProductSchema,
          404: z.object({ error: z.string() }),
        },
      },
    };
  }

  async execute(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');

    // Validate update data
    const validatedData = updateProductSchema.parse(data);
    Object.assign(product, validatedData);
    await this.repository.save(product);
    return product;
  }
}
