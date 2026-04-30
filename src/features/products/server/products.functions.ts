import { createServerFn } from '@tanstack/react-start';
import { getProductSchema, getProductsSchema } from './products.schemas';
import { fetchCategories, fetchProductBySlug, fetchProductsSearch } from './products.server';

export const getProduct = createServerFn({ method: 'GET' })
    .inputValidator(getProductSchema)
    .handler(async ({ data }) => {
        return await fetchProductBySlug(data.slug);
    });

export const getProducts = createServerFn({ method: 'GET' })
    .inputValidator(getProductsSchema)
    .handler(async ({ data }) => {
        return await fetchProductsSearch(data);
    });

export const getCategories = createServerFn({ method: 'GET' }).handler(async () => {
    return await fetchCategories();
});
