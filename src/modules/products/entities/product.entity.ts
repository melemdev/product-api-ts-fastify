import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  price: z.number().min(0.1),
  createdAt: z.date(),
});

export type Product = z.infer<typeof productSchema>;

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly createdAt: Date
  ) {}

  static create(title: string, price: number): ProductEntity {
    return new ProductEntity(
      crypto.randomUUID(),
      title,
      price,
      new Date()
    );
  }

  toJSON(): Product {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
} 