import { PrismaClient } from '@prisma/client';
import { IBaseRepository } from './base.repository';
import { Product } from '@/core/entities/product.entity';

export class ProductRepository implements IBaseRepository<Product> {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const record = await this.prisma.product.findUnique({ where: { id } });
    return record;
  }

  async findAll(): Promise<Product[]> {
    const records = await this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return records;
  }

  async save(data: Product): Promise<Product> {
    const record = await this.prisma.product.upsert({
      where: { id: data.id },
      update: { title: data.title, category: 'unknown', price: data.price },
      create: { title: data.title, category: 'unknown', price: data.price, id: data.id, description: 'unknown' },
    });

    return record;
  }

  async delete(id: string): Promise<Product> {
    const record = await this.prisma.product.delete({ where: { id: id } });
    return record;
  }
}
