import { createServerFn } from '@tanstack/react-start';
import { getProductSchema, getProductsSchema } from './products.schemas';
import { fetchProductBySlug, fetchProductsSearch } from './products.server';

export const getProductFn = createServerFn({ method: 'GET' })
    .inputValidator(getProductSchema)
    .handler(async ({ data }) => {
        return await fetchProductBySlug(data.slug);
    });

export const getProductsFn = createServerFn({ method: 'GET' })
    .inputValidator(getProductsSchema)
    .handler(async ({ data }) => {
        return await fetchProductsSearch(data);
    });
