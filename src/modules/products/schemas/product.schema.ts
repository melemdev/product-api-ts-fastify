import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string(),
  price: z.coerce.number().min(0.1),
});

export const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.coerce.number().min(0.1).optional(),
});

export const productResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  price: z.number(),
  createdAt: z.date(),
});

export const listProductsResponseSchema = z.array(productResponseSchema);

export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;

export type ProductResponse = z.infer<typeof productResponseSchema>;
