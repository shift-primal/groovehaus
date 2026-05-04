import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '#/components/shadcn/accordion';
import { conditionLabels, PRODUCT_CONDITIONS, type Condition } from '#/config/products';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import { cn } from '#/lib/utils';
import { useSearch } from '@tanstack/react-router';

export const ConditionFilter = () => {
    const navigate = useProductsNavigate();
    const { condition } = useSearch({ from: '/products/' });
    const selected = condition ?? [];

    const toggle = (c: Condition) =>
        navigate((prev) => ({
            ...prev,
            condition: selected.includes(c) ? selected.filter((v) => v !== c) : [...selected, c]
        }));

    const title = selected.length > 0 ? `Tilstand (${selected.length})` : 'Tilstand';

    return (
        <Accordion type="single" collapsible defaultValue="condition">
            <AccordionItem value="condition">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline border-0">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 pb-2">
                    {PRODUCT_CONDITIONS.map((c) => (
                        <label
                            key={c}
                            className="flex items-center gap-3 px-1 py-1.5 cursor-pointer rounded-md hover:bg-accent transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(c)}
                                onChange={() => toggle(c)}
                                className={cn(
                                    'h-4 w-4 rounded border border-input accent-foreground cursor-pointer'
                                )}
                            />
                            <span className="text-sm">{conditionLabels[c]}</span>
                        </label>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
