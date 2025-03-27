import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ListProductsUseCase } from './list-products.usecase';
import { ProductEntity } from '@/core/entities/product.entity';
import { ProductRepository } from '@/repositories/product.repository';
import { MockProductRepository } from '@/shared/mocks/mock-product-repository';

describe('ListProductsUseCase', () => {
  let useCase: ListProductsUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();

    useCase = new ListProductsUseCase(mockRepository);
  });

  it('should list all products successfully', async () => {
    // Arrange
    const expectedProducts = [ProductEntity.create('Product 1', 99.99), ProductEntity.create('Product 2', 199.99), ProductEntity.create('Product 3', 299.99)];
    vi.spyOn(mockRepository, 'findAll').mockResolvedValue(expectedProducts);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    expect(result).toEqual(expectedProducts);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it('should return empty array when no products exist', async () => {
    // Arrange
    vi.spyOn(mockRepository, 'findAll').mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toBeDefined();
    expect(result).toHaveLength(0);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });
});
