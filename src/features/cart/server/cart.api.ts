import {
    addCartItemSchema,
    getCartSchema,
    removeCartItemSchema,
    updateCartItemSchema
} from '#/features/cart/server/cart.schemas';
import {
    addCartItem,
    fetchCart,
    removeCartItem,
    updateCartItem
} from '#/features/cart/server/cart.server';
import { createServerFn } from '@tanstack/react-start';

export const getCartFn = createServerFn({ method: 'GET' })
    .inputValidator(getCartSchema)
    .handler(async ({ data }) => {
        return await fetchCart(data);
    });

export const addCartItemFn = createServerFn({ method: 'POST' })
    .inputValidator(addCartItemSchema)
    .handler(async ({ data }) => {
        return await addCartItem(data);
    });

export const updateCartItemFn = createServerFn({ method: 'POST' })
    .inputValidator(updateCartItemSchema)
    .handler(async ({ data }) => {
        return await updateCartItem(data);
    });

export const removeCartItemFn = createServerFn({ method: 'POST' })
    .inputValidator(removeCartItemSchema)
    .handler(async ({ data }) => {
        return await removeCartItem(data);
    });
