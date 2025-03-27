import { FastifyInstance } from 'fastify';
import { ProductRoutes } from './product.routes';

export async function routes(app: FastifyInstance) {
  // Product Module
  await ProductRoutes(app);
}
