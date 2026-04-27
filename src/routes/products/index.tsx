import { ProductsGrid } from '#/features/products/components/ProductsGrid';
import { getProducts } from '#/features/products/server/products.functions';
import { createFileRoute } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/products/');

const ProductsPage = () => {
    const { products } = route.useLoaderData();

    return <ProductsGrid products={products} />;
};

export const Route = createFileRoute('/products/')({
    loader: () => getProducts({ data: {} }),
    component: ProductsPage
});
