export const PRODUCT_TYPES = ['vinyl', 'gear'] as const;

export const ORDER_STATUSES = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
] as const;

export const PRODUCT_CONDITIONS = [
    'new',
    'used_mint',
    'used_good',
    'used_fair',
    'used_bad'
] as const;
export const conditionLabels: Record<Condition, string> = {
    new: 'Ny',
    used_mint: 'Brukt – Mint',
    used_good: 'Brukt – God',
    used_fair: 'Brukt – OK',
    used_bad: 'Brukt – Dårlig'
};
export type Condition = (typeof PRODUCT_CONDITIONS)[number];
