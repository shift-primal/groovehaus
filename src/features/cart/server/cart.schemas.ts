import { z } from 'zod';

export const getCartSchema = z.object({
    userId: z.string()
});

export const addCartItemSchema = getCartSchema.extend({ productId: z.uuid() });

export const updateCartItemSchema = getCartSchema.extend({
    cartItemId: z.uuid(),
    qty: z.number().int().min(1)
});

export const removeCartItemSchema = getCartSchema.extend({ cartItemId: z.uuid() });

export type GetCartInput = z.infer<typeof getCartSchema>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof removeCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
