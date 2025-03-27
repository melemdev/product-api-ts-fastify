import { database } from '@/@config';
import { IBaseRepository } from '@/repositories/base.repository';
import { ProductRepository } from '@/repositories/product.repository';
import { PrismaClient } from '@prisma/client';
import { vi } from 'vitest';

export class MockProductRepository extends ProductRepository {
  constructor() {
    super({} as PrismaClient);
    this.findAll = vi.fn();
    this.findById = vi.fn();
    this.save = vi.fn();
    this.delete = vi.fn();
  }
}
