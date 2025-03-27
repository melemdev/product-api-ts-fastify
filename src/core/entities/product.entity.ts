import { z } from 'zod';
import { ProductSchema } from '../schemas/product.schema';

export type Product = z.infer<typeof ProductSchema>;

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly createdAt: Date
  ) {}

  static create(title: string, price: number): ProductEntity {
    return new ProductEntity(crypto.randomUUID(), title, price, new Date());
  }

  parse(): Product {
    return ProductSchema.parse(this);
  }
}
