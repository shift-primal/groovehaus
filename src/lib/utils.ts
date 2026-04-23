import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fmtPrice = (price: string | number): string => {
    const amt = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(amt);
};
