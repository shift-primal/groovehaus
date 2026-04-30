import { useQuery } from '@tanstack/react-query';
import { getProduct } from '#/features/products/server/products.functions';

export const useProduct = (slug: string) =>
    useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProduct({ data: { slug } })
    });
