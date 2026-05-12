import type { cartItems, categories, products } from '#/db/schema';
import type { fetchCart } from '#/features/cart/server/cart.server';
import type { InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;
export type Category = InferSelectModel<typeof categories>;
export type Cart = Awaited<ReturnType<typeof fetchCart>>;
export type CartItem = InferSelectModel<typeof cartItems>;

export type Rating = {
    rating: number;
    reviewers: number;
};
