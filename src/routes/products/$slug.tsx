import { ProductDetails } from '#/features/products/components/details';
import { useProduct } from '#/features/products/hooks/useProduct';
import { authClient } from '#/lib/auth';
import { createFileRoute } from '@tanstack/react-router';

const ProductDetailsPage = () => {
    const { slug } = Route.useParams();
    const { data: product, isLoading } = useProduct(slug);
    const { data: userData } = authClient.useSession();

    if (isLoading) return null;
    if (!product) return <div>Ikke funnet</div>;

    return <ProductDetails productData={product} userId={userData?.user.id ?? undefined} />;
};

export const Route = createFileRoute('/products/$slug')({
    component: ProductDetailsPage
});
