import type { Product } from '#/db/schema';
import { ProductCard } from '#/features/products/components/ProductCard';

export const ProductsGrid = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid  grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(12rem,14rem))] gap-8 justify-center">
            {products.map((p) => (
                <ProductCard key={p.id} productData={p} />
            ))}
        </div>
    );
};
