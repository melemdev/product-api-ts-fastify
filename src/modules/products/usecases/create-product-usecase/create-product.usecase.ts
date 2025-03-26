import { UseCase } from "@/shared/core/use-case";
import { ProductEntity } from "../../entities/product.entity";
import { ProductRepository } from "../../repositories/product.repository";
import { CreateProductDTO, createProductSchema, productResponseSchema } from "../../schemas/product.schema";


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
          201: productResponseSchema,
        },
      },
    };
  }

  async execute(data: CreateProductDTO): Promise<ProductEntity> {
    // Validate input data
    const validatedData = createProductSchema.parse(data);
    
    const product = ProductEntity.create(validatedData.title, validatedData.price);
    return this.productRepository.create(product);
  }
}
