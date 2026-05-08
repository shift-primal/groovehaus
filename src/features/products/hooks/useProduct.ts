import { useQuery } from '@tanstack/react-query';
import { getProductFn } from '#/features/products/server/products.api';

export const useProduct = (slug: string) =>
    useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductFn({ data: { slug } })
    });
