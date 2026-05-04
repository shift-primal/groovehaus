import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '#/components/shadcn/accordion';
import { Button } from '#/components/shadcn/button';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import type { Category } from '#/types/DbTypes';
import { useSearch } from '@tanstack/react-router';

export const CategoryFilter = ({ categories = [] }: { categories?: Category[] }) => {
    const navigate = useProductsNavigate();
    const { categoryId } = useSearch({ from: '/products/' });

    const title =
        categoryId === undefined
            ? 'Kategori'
            : `Kategori (${categories.find((c) => c.id === categoryId)?.name})`;

    const buttonCn = 'justify-start border-0';

    return (
        <Accordion type="single" collapsible defaultValue="condition">
            <AccordionItem value="condition">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline border-0">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 pb-2 h-full">
                    <Button
                        variant={!categoryId ? 'secondary' : 'ghost'}
                        className={buttonCn}
                        onClick={() => navigate((prev) => ({ ...prev, categoryId: undefined }))}
                    >
                        Alle
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={categoryId === cat.id ? 'secondary' : 'ghost'}
                            className={buttonCn}
                            onClick={() => {
                                navigate((prev) => ({ ...prev, categoryId: cat.id }));
                            }}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
