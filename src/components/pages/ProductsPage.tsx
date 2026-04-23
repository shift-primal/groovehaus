import { getRouteApi } from '@tanstack/react-router';
import { ProductCard } from '../ui/ProductCard';

const route = getRouteApi('/products/');

export const ProductsPage = () => {
    const { products } = route.useLoaderData();

    return (
        <div className="flex flex-wrap items-center justify-center gap-8 px-32 py-8">
            {products.map((p) => (
                <ProductCard productData={p} />
            ))}
        </div>
    );
};
