import { Input } from '#/components/shadcn/input';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const PriceFilter = () => {
    const navigate = useProductsNavigate();
    const { minPrice, maxPrice } = useSearch({ from: '/products/' });
    const [price, setPrice] = useState({ min: minPrice ?? '', max: maxPrice ?? '' });

    const handleChange = useDebouncedCallback(
        (field: 'minPrice' | 'maxPrice', val: string) =>
            navigate((prev) => ({
                ...prev,
                [field]: val ? Number(val) : undefined
            })),
        300
    );

    return (
        <div className="flex flex-col gap-2 pb-2">
            <span className="text-sm font-semibold py-4">Pris</span>
            <div id="price-inputs" className="flex items-center gap-2">
                <Input
                    className="text-sm"
                    id="min-price-input"
                    type="number"
                    placeholder="Min"
                    value={price.min}
                    onChange={(e) => {
                        const val = e.target.value;
                        setPrice((prev) => ({ ...prev, min: val }));
                        handleChange('minPrice', e.target.value);
                    }}
                />
                <span className="text-muted-foreground">-</span>
                <Input
                    className="text-sm"
                    id="max-price-input"
                    type="number"
                    placeholder="Max"
                    value={price.max}
                    onChange={(e) => {
                        const val = e.target.value;
                        setPrice((prev) => ({ ...prev, max: val }));
                        handleChange('maxPrice', e.target.value);
                    }}
                />
            </div>
        </div>
    );
};
