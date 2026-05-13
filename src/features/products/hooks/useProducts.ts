import { useQuery } from '@tanstack/react-query';
import { getProductsFn } from '#/features/products/server/products.api';
import {
    getProductsSchema,
    type GetProductsInput
} from '#/features/products/server/products.schemas';

export const useProducts = (search: Partial<GetProductsInput>) => {
    const parsedSearch = getProductsSchema.parse(search);
    return useQuery({
        queryKey: ['products', search],
        queryFn: () => getProductsFn({ data: parsedSearch }),
        placeholderData: (prev) => prev
    });
};
