import { priceRange } from '#/lib/dbUtils';

export const prices = {
    vinyl: {
        new: priceRange(599, 1049),
        used_mint: priceRange(449, 849),
        used_good: priceRange(299, 649),
        used_fair: priceRange(149, 449),
        used_bad: priceRange(99, 499)
    },
    gear: {
        new: priceRange(999, 14999),
        used_mint: priceRange(799, 11999),
        used_good: priceRange(599, 8999),
        used_fair: priceRange(499, 5999),
        used_bad: priceRange(499, 4999)
    }
};
