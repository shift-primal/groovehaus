import { useQuery } from '@tanstack/react-query';
import { getCategories } from '#/features/products/server/products.functions';

export const useCategories = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });
