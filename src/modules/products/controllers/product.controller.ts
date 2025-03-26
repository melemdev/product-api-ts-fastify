import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductRepository } from '../repositories/product.repository';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';
import { CreateProductUseCase } from '../usecases/create-product-usecase/create-product.usecase';
import { DeleteProductUseCase } from '../usecases/delete-product-usecase/delete-product.usecase';
import { FindByIdProductUseCase } from '../usecases/find-by-id-product-usecase/find-by-id-product.usecase';
import { ListProductsUseCase } from '../usecases/list-product-usecase/list-products.usecase';
import { UpdateProductUseCase } from '../usecases/update-product-usecase/update-product.usecase';

export class ProductController {
  constructor(private readonly repository: ProductRepository) {}

  createProduct = async (request: FastifyRequest) => {
    const data = createProductSchema.parse(request.body);
    const createProductUseCase = new CreateProductUseCase(this.repository);
    const product = await createProductUseCase.execute(data);
    return product.toJSON();
  };

  listProduct = async (request: FastifyRequest) => {
    const listProductUseCase = new ListProductsUseCase(this.repository);
    const products = await listProductUseCase.execute();
    return products.map(product => product.toJSON());
  };

  findByIdProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const findByIdProductUseCase = new FindByIdProductUseCase(this.repository);
    const { id } = request.params as { id: string };
    const product = await findByIdProductUseCase.execute(id);
    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }
    return product.toJSON();
  };

  updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const data = updateProductSchema.parse(request.body);
    const updateProductUseCase = new UpdateProductUseCase(this.repository);
    try {
      const product = await updateProductUseCase.execute(id, data);
      return product.toJSON();
    } catch (error: any) {
      if (error.message === 'Product not found') {
        return reply.code(404).send({ error: 'Product not found' });
      }
      throw error;
    }
  };

  deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const deleteProductUseCase = new DeleteProductUseCase(this.repository);
    try {
      await deleteProductUseCase.execute(id);
      return reply.code(204).send();
    } catch (error: any) {
      if (error.message === 'Product not found') {
        return reply.code(404).send({ error: 'Product not found' });
      }
      throw error;
    }
  };
}
