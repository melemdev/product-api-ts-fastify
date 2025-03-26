import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { UpdateProductDTO } from '../../schemas/product.schema';
import { UpdateProductUseCase } from './update-product.usecase';


describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let mockRepository: ProductRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new UpdateProductUseCase(mockRepository);
  });

  it('should update a product successfully', async () => {
    // Arrange
    const productId = '123';
    const updateData: UpdateProductDTO = {
      title: 'Updated Product',
      price: 199.99,
    };

    const existingProduct = ProductEntity.create('Original Product', 99.99);
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(existingProduct);
    vi.spyOn(mockRepository, 'update').mockResolvedValue(
      ProductEntity.create(updateData.title!, updateData.price!)
    );

    // Act
    const result = await useCase.execute(productId, updateData);

    // Assert
    expect(result).toBeDefined();
    expect(result.title).toBe(updateData.title);
    expect(result.price).toBe(updateData.price);
    expect(mockRepository.findById).toHaveBeenCalledWith(productId);
    expect(mockRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        title: updateData.title,
        price: updateData.price,
      })
    );
  });

  it('should throw an error if product is not found', async () => {
    // Arrange
    const productId = '123';
    const updateData: UpdateProductDTO = {
      title: 'Updated Product',
      price: 199.99,
    };

    vi.spyOn(mockRepository, 'findById').mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(productId, updateData)).rejects.toThrow('Product not found');
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should validate update data before applying changes', async () => {
    // Arrange
    const productId = '123';
    const invalidUpdateData = {
      title: '', // Invalid empty title
      price: -10, // Invalid negative price
    } as UpdateProductDTO;

    const existingProduct = ProductEntity.create('Original Product', 99.99);
    vi.spyOn(mockRepository, 'findById').mockResolvedValue(existingProduct);

    // Act & Assert
    await expect(useCase.execute(productId, invalidUpdateData)).rejects.toThrow();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
}); 