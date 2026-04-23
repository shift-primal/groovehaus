import { ProductsPage } from '#/components/pages/ProductsPage';
import { getProducts } from '#/server/products/products.functions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/')({
    loader: () => getProducts({ data: {} }),
    component: ProductsPage
});
