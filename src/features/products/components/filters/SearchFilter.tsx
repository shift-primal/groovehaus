import { Input } from '#/components/shadcn/input';
import { useProductsNavigate } from '#/features/products/hooks/useProductsNavigate';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const SearchFilter = () => {
    const navigate = useProductsNavigate();
    const { search } = useSearch({ from: '/products/' });
    const [searchValue, setSearchValue] = useState(search ?? '');

    const handleSearch = useDebouncedCallback(
        (val: string) =>
            navigate((prev) => ({
                ...prev,
                search: val || undefined
            })),
        300
    );

    return (
        <div>
            <Input
                placeholder="Fender"
                value={searchValue}
                onChange={(e) => {
                    const val = e.target.value;
                    setSearchValue(val);
                    handleSearch(val);
                }}
            />
        </div>
    );
};
