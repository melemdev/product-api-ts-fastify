import { describe, beforeEach, vi, it, expect } from "vitest";
import { ProductEntity } from "../../entities/product.entity";
import { ProductRepository } from "../../repositories/product.repository";
import { DeleteProductUseCase } from "./delete-product.usecase";


describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;
  let mockRepository: ProductRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new DeleteProductUseCase(mockRepository);
  });

  it('should delete a product successfully', async () => {
    // Arrange
    const productId = '123';
    const existingProduct = ProductEntity.create('Test Product', 99.99);
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(existingProduct);
    vi.spyOn(mockRepository, 'delete').mockResolvedValue(undefined);

    // Act
    await useCase.execute(productId);

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith(productId);
    expect(mockRepository.delete).toHaveBeenCalledWith(productId);
  });

  it('should throw an error if product is not found', async () => {
    // Arrange
    const productId = '123';
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(productId)).rejects.toThrow('Product not found');
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });
}); 