import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  create(product: ProductEntity): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
} 