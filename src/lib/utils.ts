import type { Cart } from '#/types/DbTypes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fmtPrice = (price: string | number): string => {
    const amt = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(amt);
};

export const calculateTotalCart = (cart: Cart): number =>
    cart.reduce((acc, item) => acc + item.products.price * item.cart_items.quantity, 0);

export const countTotalCartItems = (cart: Cart): number =>
    cart.reduce((acc, item) => acc + item.cart_items.quantity, 0) ?? 0;

function normalize(input: string): string {
    return input.trim().toLowerCase().replaceAll('$', 's').normalize('NFKD').replaceAll(/[̀-ͯ]/g, '');
}

export function slugify(input: string = ''): string {
    return normalize(input)
        .replaceAll(/[^\w\s-]/g, '')
        .replaceAll(/\s+/g, '-')
        .replaceAll(/-+/g, '-');
}

export function normalizeSearch(input: string = ''): string {
    return normalize(input)
        .replaceAll(/[^\w\s]/g, '')
        .replaceAll(/\s+/g, ' ')
        .trim();
}

export async function fetchInBatches<T, R>(
    items: T[],
    batchSize: number,
    fn: (item: T) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(fn));
        results.push(...batchResults);
    }
    return results;
}
