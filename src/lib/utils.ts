import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fmtPrice = (price: string | number): string => {
    const amt = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(amt);
};

export function slugify(string: string = ''): string {
    return string
        .toLowerCase() // Lower case all characters
        .replaceAll('$', 's') // Replace $ with s (for $uicideboy$)
        .normalize('NFKD') //for example è decomposes to as e +  ̀
        .replaceAll(/[\u0300-\u036F]/g, '') // removes combining marks
        .replaceAll(' ', '-') // replaces spaces with hyphens
        .replaceAll(/[^\w.-]+/g, ''); // removes all non-word characters except for dots and hyphens
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
