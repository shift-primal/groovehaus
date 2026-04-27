import { createServerFn } from '@tanstack/react-start';
import { getProductSchema, getProductsSchema } from './products.schemas';
import { getProductBySlug, searchProducts } from './products.server';

export const getProduct = createServerFn({ method: 'GET' })
    .inputValidator(getProductSchema)
    .handler(async ({ data }) => {
        return await getProductBySlug(data.slug);
    });

export const getProducts = createServerFn({ method: 'GET' })
    .inputValidator(getProductsSchema)
    .handler(async ({ data }) => {
        return await searchProducts(data);
    });
