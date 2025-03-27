import { UseCase } from '@/shared/core/use-case';
import { ProductRepository } from '@/repositories/product.repository';
import { CreateProductDTO, createProductSchema, ProductSchema } from '@/core/schemas/product.schema';
import { ProductEntity } from '@/core/entities/product.entity';

export class CreateProductUseCase extends UseCase<CreateProductDTO, ProductEntity> {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }

  static config() {
    return {
      schema: {
        description: 'Create a new product',
        tags: ['products'],
        body: createProductSchema,
        response: {
          201: ProductSchema,
        },
      },
    };
  }

  async execute(data: CreateProductDTO): Promise<ProductEntity> {
    const validatedData = createProductSchema.parse(data);
    const product = ProductEntity.create(validatedData.title, validatedData.price);
    await this.productRepository.save(product);
    return product;
  }
}
