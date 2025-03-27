import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateProductUseCase } from './create-product.usecase';
import { ProductEntity } from '@/core/entities/product.entity';
import { CreateProductDTO } from '@/core/schemas/product.schema';
import { MockProductRepository } from '@/shared/mocks/mock-product-repository';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    useCase = new CreateProductUseCase(mockRepository);
  });

  it('should create a product successfully', async () => {
    // Arrange
    const productData: CreateProductDTO = {
      title: 'Test Product',
      price: 99.99,
    };

    const expectedProduct = ProductEntity.create(productData.title, productData.price);
    vi.spyOn(mockRepository, 'save').mockResolvedValue(expectedProduct);

    // Act
    const result = await useCase.execute(productData);

    // Assert
    expect(result).toBeDefined();
    expect(result.title).toBe(productData.title);
    expect(result.price).toBe(productData.price);
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: productData.title,
        price: productData.price,
      })
    );
  });

  it('should throw an error if repository save fails', async () => {
    // Arrange
    const productData: CreateProductDTO = {
      title: 'Test Product',
      price: 99.99,
    };

    const error = new Error('Database error');
    vi.spyOn(mockRepository, 'save').mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(productData)).rejects.toThrow('Database error');
  });

  it('should validate product data before creation', async () => {
    // Arrange
    const invalidProductData = {
      title: '', // Invalid empty title
      price: -10, // Invalid negative price
    } as CreateProductDTO;

    // Act & Assert
    await expect(useCase.execute(invalidProductData)).rejects.toThrow();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
