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
        .where(eq(cartItems.cartId, cart.id))
        .orderBy(cartItems.createdAt);

    return cartItemsWithProducts;
}

export async function addCartItem(input: AddCartItemInput) {
    const cart = await getOrCreateCart(input.userId);

    const [product] = await db.select().from(products).where(eq(products.id, input.productId));
    const [existingItem] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, input.productId)));

    if ((existingItem?.quantity ?? 0) + 1 > product.stock) throw new Error('Not enough stock');

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

    const [item] = await db.select().from(cartItems).where(eq(cartItems.id, input.cartItemId));
    const [product] = await db.select().from(products).where(eq(products.id, item.productId));

    if (input.qty > product.stock) throw new Error('Not enough stock');

    if (input.qty <= 0) {
        await db.delete(cartItems).where(eq(cartItems.id, input.cartItemId));
        return;
    }

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
