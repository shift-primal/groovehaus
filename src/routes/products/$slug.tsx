import { ProductDetails } from '#/features/products/components/ProductDetails';
import { getProduct } from '#/features/products/server/products.functions';
import { createFileRoute } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/products/$slug');

const ProductDetailsPage = () => {
    const product = route.useLoaderData();

    return <ProductDetails product={product} />;
};

export const Route = createFileRoute('/products/$slug')({
    loader: ({ params }) => getProduct({ data: { slug: params.slug } }),
    component: ProductDetailsPage
});
