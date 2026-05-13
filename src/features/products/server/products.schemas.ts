import { PRODUCT_CONDITIONS, PRODUCT_TYPES } from '#/config/products';
import { z } from 'zod';

export const getProductSchema = z.object({
    slug: z.string()
});

export const productsSearchSchema = z.object({
    search: z.string().optional(),
    type: z.enum(PRODUCT_TYPES).optional(),
    category: z.string().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    condition: z.enum(PRODUCT_CONDITIONS).array().optional(),
    stock: z.number().optional(),
    page: z.number().default(1)
});

export const getProductsSchema = productsSearchSchema.extend({
    limit: z.number().default(20),
    sortBy: z.enum(['createdAt', 'name', 'price', 'rating']).default('createdAt'),
    sortDir: z.enum(['asc', 'desc']).default('asc')
});

export type ProductsSearch = z.infer<typeof productsSearchSchema>;
export type GetProductsInput = z.infer<typeof getProductsSchema>;
