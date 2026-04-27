import { productTypes } from '#/db/schema';
import { z } from 'zod';

export const getProductSchema = z.object({
    slug: z.string()
});

export const getProductsSchema = z.object({
    search: z.string().optional(),
    type: z.enum(productTypes).optional(),
    categoryId: z.number().optional(),
    page: z.number().default(1),
    limit: z.number().default(20)
});

export type GetProductsInput = z.infer<typeof getProductsSchema>;
