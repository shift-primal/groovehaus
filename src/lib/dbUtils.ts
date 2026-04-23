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

export const truncateDb = async (db: NeonHttpDatabase<typeof schema>) =>
    await db.execute(
        sql`TRUNCATE categories, products, carts, cart_items, orders, order_items RESTART IDENTITY CASCADE`
    );
