import { ProductDetails } from '#/features/products/components/ProductDetails';
import { useProduct } from '#/features/products/hooks/useProduct';
import { createFileRoute } from '@tanstack/react-router';

const ProductDetailsPage = () => {
    const { slug } = Route.useParams();
    const { data: product, isLoading } = useProduct(slug);

    if (isLoading) return null;
    if (!product) return <div>Ikke funnet</div>;

    return <ProductDetails productData={product} />;
};

export const Route = createFileRoute('/products/$slug')({
    component: ProductDetailsPage
});
