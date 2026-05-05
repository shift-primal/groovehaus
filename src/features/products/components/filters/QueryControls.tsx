import { Button } from '#/components/shadcn/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '#/components/shadcn/sheet';
import {
    CategoryFilter,
    ConditionFilter,
    SearchFilter
} from '#/features/products/components/filters';
import { useCategories } from '#/features/products/hooks/useCategories';
import { SlidersHorizontal } from 'lucide-react';

export const QueryControls = () => {
    const { data: categories } = useCategories();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <SlidersHorizontal className="size-4" />
                    Filtre
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <SheetHeader className="border-b px-6 py-4">
                    <SheetTitle>Filtre</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6">
                    <SearchFilter />
                    <CategoryFilter categories={categories} />
                    <ConditionFilter />
                </div>
            </SheetContent>
        </Sheet>
    );
};
