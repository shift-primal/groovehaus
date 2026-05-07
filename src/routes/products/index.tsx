import { Container } from '#/components/layout/Container';
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
        <Container>
            <section className="border-b border-border mb-6 pb-6">
                <div className="flex flex-col gap-y-4">
                    <div>
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                            Vinyl · Gitarer · Utstyr
                        </span>
                        <div className="flex items-end justify-between">
                            <h1
                                className="text-4xl font-bold leading-tight"
                                style={{ fontFamily: 'Fraunces, serif' }}
                            >
                                Sortiment
                            </h1>
                            <span className="text-sm text-muted-foreground mb-1">
                                {data?.total ?? 0} produkter
                            </span>
                        </div>
                    </div>
                    <QueryControls />
                </div>
            </section>
            <ProductsGrid products={products ?? []} />
        </Container>
    );
};

export const Route = createFileRoute('/products/')({
    validateSearch: productsSearchSchema,
    component: ProductsPage
});
