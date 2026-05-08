import { useQuery } from '@tanstack/react-query';
import { getProductsFn } from '#/features/products/server/products.api';
import type { ProductsSearch } from '#/features/products/server/products.schemas';

export const useProducts = (search: ProductsSearch) =>
    useQuery({
        queryKey: ['products', search],
        queryFn: () => getProductsFn({ data: { ...search, page: search.page ?? 1 } }),
        placeholderData: (prev) => prev
    });
