import { Button } from '#/components/shadcn/button';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';

import type { Category } from '#/types/DbTypes';
import { useSearch } from '@tanstack/react-router';

export const CategoryFilter = ({ categories = [] }: { categories?: Category[] }) => {
    const navigate = useProductsNavigate();
    const { categoryId } = useSearch({ from: '/products/' });

    return (
        <nav className="flex flex-col gap-1">
            <Button
                variant={!categoryId ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => navigate((prev) => ({ ...prev, categoryId: undefined }))}
            >
                Alle
            </Button>
            {categories.map((cat) => (
                <Button
                    key={cat.id}
                    variant={categoryId === cat.id ? 'secondary' : 'ghost'}
                    className="justify-start"
                    onClick={() => navigate((prev) => ({ ...prev, categoryId: cat.id }))}
                >
                    {cat.name}
                </Button>
            ))}
        </nav>
    );
};
