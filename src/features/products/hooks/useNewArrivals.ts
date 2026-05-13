import { useProducts } from '#/features/products/hooks/useProducts';

export const useNewArrivals = (numberOfProducts: number = 4) =>
    useProducts({ limit: numberOfProducts });
