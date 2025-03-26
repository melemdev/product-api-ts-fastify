import z from 'zod';
import { ProductRepository } from '../../repositories/product.repository';
import { CreateProductDTO, productResponseSchema, UpdateProductDTO, updateProductSchema } from '../../schemas/product.schema';

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  static config() {
    return {
      schema: {
        description: 'Edit product',
        tags: ['products'],
        body: updateProductSchema,
        response: {
          200: productResponseSchema,
          404: z.object({ error: z.string() }),
        },
      },
    };
  }

  async execute(id: string, data: UpdateProductDTO) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    // Validate update data
    const validatedData = updateProductSchema.parse(data);
    Object.assign(product, validatedData);
    await this.repository.update(product);
    return product;
  }
}
