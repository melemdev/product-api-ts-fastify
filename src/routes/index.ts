import { FastifyInstance } from 'fastify';
import { ProductModule } from '../modules/products';

export async function routes(app: FastifyInstance) {
  // Product Module
  await ProductModule(app);
}
