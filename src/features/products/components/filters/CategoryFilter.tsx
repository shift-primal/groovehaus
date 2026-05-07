import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '#/components/shadcn/accordion';
import { Button } from '#/components/shadcn/button';
import { CATEGORIES } from '#/config/products';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import { useSearch } from '@tanstack/react-router';

export const CategoryFilter = () => {
    const navigate = useProductsNavigate();
    const { category } = useSearch({ from: '/products/' });

    const buttonCn = 'justify-start border-0';
    const title = category
        ? `Kategori (${CATEGORIES.find((c) => c.slug === category)?.name})`
        : 'Kategori';

    return (
        <Accordion type="single" collapsible defaultValue="category">
            <AccordionItem value="category">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline border-0">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 pb-2">
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
