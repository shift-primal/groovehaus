import { PRODUCT_CONDITIONS, PRODUCT_TYPES } from '#/config/products';
import { z } from 'zod';

export const getProductSchema = z.object({
    slug: z.string()
});

export const productsSearchSchema = z.object({
    search: z.string().optional(),
    type: z.enum(PRODUCT_TYPES).optional(),
    categoryId: z.number().optional(),
    condition: z.enum(PRODUCT_CONDITIONS).array().optional(),
    stock: z.number().optional(),
    page: z.number().default(1)
});

export const getProductsSchema = productsSearchSchema.extend({
    limit: z.number().default(20)
});

export type GetProductsInput = z.infer<typeof getProductsSchema>;
export type ProductsSearch = z.infer<typeof productsSearchSchema>;
