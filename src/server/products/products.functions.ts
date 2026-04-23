import { createServerFn } from '@tanstack/react-start';
import { getProductsSchema } from './products.schemas';
import { searchProducts } from './products.server';

export const getProducts = createServerFn({ method: 'GET' })
    .inputValidator(getProductsSchema)
    .handler(async ({ data }) => {
        return await searchProducts(data);
    });
