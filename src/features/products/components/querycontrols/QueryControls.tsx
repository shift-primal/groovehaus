import { Button } from '#/components/shadcn/button';
import { Sheet, SheetContent, SheetTrigger } from '#/components/shadcn/sheet';
import { CategoryFilter } from '#/features/products/components/querycontrols/CategoryFilter';
import { useCategories } from '#/features/products/hooks/useCategories';
import { SlidersHorizontal } from 'lucide-react';

export const QueryControls = () => {
    const { data: categories } = useCategories();

    console.log(categories);

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="outline" size="sm">
                    <SlidersHorizontal className="size-4" />
                    Filtre
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-6">
                    <CategoryFilter categories={categories} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
