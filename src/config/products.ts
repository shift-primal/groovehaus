export const PRODUCT_TYPES = ['vinyl', 'gear'] as const;
export const PRODUCT_CONDITIONS = [
    'new',
    'used_mint',
    'used_good',
    'used_fair',
    'used_bad'
] as const;
export const ORDER_STATUSES = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
] as const;
