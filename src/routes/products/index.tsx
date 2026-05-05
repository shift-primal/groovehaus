import { QueryControls } from '#/features/products/components/filters';
import { ProductsGrid } from '#/features/products/components/ProductsGrid';
import { useProducts } from '#/features/products/hooks/useProducts';
import { productsSearchSchema } from '#/features/products/server/products.schemas';
import { createFileRoute } from '@tanstack/react-router';

const ProductsPage = () => {
    const search = Route.useSearch();
    const { data, isLoading } = useProducts(search);
    const products = data?.products;

    if (isLoading) return null;

    return (
        <div>
            <QueryControls />
            <ProductsGrid products={products ?? []} />
        </div>
    );
};

export const Route = createFileRoute('/products/')({
    validateSearch: productsSearchSchema,
    component: ProductsPage
});
