import { Button } from '#/components/shadcn/button';
import { CATEGORIES } from '#/config/products';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import { useSearch } from '@tanstack/react-router';

export const CategoryFilter = () => {
    const navigate = useProductsNavigate();
    const { category } = useSearch({ from: '/products/' });

    const buttonCn = 'justify-start border-0';

    return (
        <div className="flex flex-col gap-1">
            <Button
                variant={!category ? 'secondary' : 'ghost'}
                className={buttonCn}
                onClick={() => navigate((prev) => ({ ...prev, category: undefined }))}
            >
                Alle
            </Button>
            {CATEGORIES.map((cat) => (
                <Button
                    key={cat.slug}
                    variant={category === cat.slug ? 'secondary' : 'ghost'}
                    className={buttonCn}
                    onClick={() => navigate((prev) => ({ ...prev, category: cat.slug }))}
                >
                    {cat.name}
                </Button>
            ))}
        </div>
    );
};
