import type { ProductsSearch } from '#/features/products/server/products.schemas';
import { useNavigate } from '@tanstack/react-router';

export const useProductsNavigate = () => {
    const navigate = useNavigate();
    return (updater: (prev: ProductsSearch) => Partial<ProductsSearch>) =>
        navigate({
            to: '/products',
            search: (prev) => ({ ...prev, ...updater(prev as ProductsSearch), page: 1 }),
            resetScroll: false
        });
};
