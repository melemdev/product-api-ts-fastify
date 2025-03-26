
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { CreateProductDTO } from '../../schemas/product.schema';
import { CreateProductUseCase } from './create-product.usecase';


describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let mockRepository: ProductRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new CreateProductUseCase(mockRepository);
  });

  it('should create a product successfully', async () => {
    // Arrange
    const productData: CreateProductDTO = {
      title: 'Test Product',
      price: 99.99,
    };

    const expectedProduct = ProductEntity.create(productData.title, productData.price);
    vi.spyOn(mockRepository, 'create').mockResolvedValue(expectedProduct);

    // Act
    const result = await useCase.execute(productData);

    // Assert
    expect(result).toBeDefined();
    expect(result.title).toBe(productData.title);
    expect(result.price).toBe(productData.price);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: productData.title,
        price: productData.price,
      })
    );
  });

  it('should throw an error if repository create fails', async () => {
    // Arrange
    const productData: CreateProductDTO = {
      title: 'Test Product',
      price: 99.99,
    };

    const error = new Error('Database error');
    vi.spyOn(mockRepository, 'create').mockRejectedValue(error);

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
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
}); 