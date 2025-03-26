import { ProductEntity } from "../entities/product.entity";
import { ProductRepository } from "./product.repository";


export class InMemoryProductRepository implements ProductRepository {
  private products: ProductEntity[] = [];

  async findAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    this.products.push(product);
    return product;
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = product;
    return product;
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
  }
}
