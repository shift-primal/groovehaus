import { Button } from '#/components/shadcn/button';
import { Sheet, SheetContent, SheetTrigger } from '#/components/shadcn/sheet';
import {
    CategoryFilter,
    ConditionFilter,
    SearchFilter
} from '#/features/products/components/filters';
import { PriceFilter } from '#/features/products/components/filters/PriceFilter';
import { SlidersHorizontal } from 'lucide-react';

export const QueryControls = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <SlidersHorizontal className="size-4" />
                    Filtre
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <div className="flex-1 overflow-y-auto px-5 mt-10">
                    <SearchFilter />
                    <CategoryFilter />
                    <ConditionFilter />
                    <PriceFilter />
                </div>
            </SheetContent>
        </Sheet>
    );
};
