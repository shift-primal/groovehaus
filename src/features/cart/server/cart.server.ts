import { db } from '#/db';
import { cartItems, carts, products } from '#/db/schema';
import type {
    AddCartItemInput,
    GetCartInput,
    RemoveCartItemInput,
    UpdateCartItemInput
} from '#/features/cart/server/cart.schemas';
import { and, eq, sql } from 'drizzle-orm';

export async function fetchCart(input: GetCartInput) {
    const cart = await getOrCreateCart(input.userId);

    const cartItemsWithProducts = await db
        .select()
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.cartId, cart.id));

    return cartItemsWithProducts;
}

export async function addCartItem(input: AddCartItemInput) {
    const cart = await getOrCreateCart(input.userId);
    const [product] = await db.select().from(products).where(eq(products.id, input.productId));
    if (!product || product.stock < 1) throw new Error('Out of stock');

    const [newItem] = await db
        .insert(cartItems)
        .values({ cartId: cart.id, productId: input.productId })
        .onConflictDoUpdate({
            target: [cartItems.cartId, cartItems.productId],
            set: { quantity: sql`${cartItems.quantity} + 1` }
        })
        .returning();

    return newItem;
}

export async function updateCartItem(input: UpdateCartItemInput) {
    const cart = await getOrCreateCart(input.userId);

    await db
        .update(cartItems)
        .set({ quantity: input.qty })
        .where(and(eq(cartItems.id, input.cartItemId), eq(cartItems.cartId, cart.id)));
}

export async function removeCartItem(input: RemoveCartItemInput) {
    const cart = await getOrCreateCart(input.userId);

    await db
        .delete(cartItems)
        .where(and(eq(cartItems.id, input.cartItemId), eq(cartItems.cartId, cart.id)));
}

async function getOrCreateCart(userId: string) {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (cart) return cart;

    const [newCart] = await db.insert(carts).values({ userId }).returning();
    if (!newCart) throw new Error('Error creating cart');
    return newCart;
}
