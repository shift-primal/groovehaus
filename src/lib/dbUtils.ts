import { sql } from 'drizzle-orm';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import type * as schema from '#/db/schema';

export function priceRange(min: number, max: number): number[] {
    const result: number[] = [];
    for (let p = 49; p <= max; p += 50) {
        if (p >= min) result.push(p);
    }
    return result;
}

export const truncateDb = async (db: NeonHttpDatabase<typeof schema>) =>
    await db.execute(
        sql`TRUNCATE categories, products, carts, cart_items, orders, order_items RESTART IDENTITY CASCADE`
    );
