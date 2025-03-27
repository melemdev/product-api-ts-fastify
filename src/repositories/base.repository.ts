import { PrismaClient, Prisma } from '@prisma/client';

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(data: T): Promise<T>;
  delete(id: string): Promise<T>;
}
