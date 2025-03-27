import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FindByIdProductUseCase } from './find-by-id-product.usecase';
import { ProductEntity } from '@/core/entities/product.entity';
import { ProductRepository } from '@/repositories/product.repository';
import { MockProductRepository } from '@/shared/mocks/mock-product-repository';

describe('FindByIdProductUseCase', () => {
  let useCase: FindByIdProductUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    useCase = new FindByIdProductUseCase(mockRepository);
  });

  it('should find a product by id successfully', async () => {
    // Arrange
    const productId = '123';
    const expectedProduct = ProductEntity.create('Test Product', 99.99);
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(expectedProduct);

    // Act
    const result = await useCase.execute(productId);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(expectedProduct);
    expect(mockRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should return null when product is not found', async () => {
    // Arrange
    const productId = '123';
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(null);

    // Act
    const result = await useCase.execute(productId);

    // Assert
    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith(productId);
  });
});
