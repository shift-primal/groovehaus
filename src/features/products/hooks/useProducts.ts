import { useQuery } from '@tanstack/react-query';
import { getProducts } from '#/features/products/server/products.functions';
import type { ProductsSearch } from '#/features/products/server/products.schemas';

export const useProducts = (search: ProductsSearch) =>
    useQuery({
        queryKey: ['products', search],
        queryFn: () => getProducts({ data: { ...search, page: search.page ?? 1 } })
    });
