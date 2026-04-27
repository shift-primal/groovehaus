import { products } from '#/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '#/db';
import type { GetProductsInput } from './products.schemas';

export async function getProductBySlug(slug: string) {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product ?? null;
}

export async function searchProducts(input: GetProductsInput) {
    const { search, type, categoryId, page, limit } = input;
    const where = [eq(products.active, true)];

    if (search) {
        where.push(sql`${products.productSearch} @@ plainto_tsquery('english', ${search})`);
    }

    if (type) {
        where.push(eq(products.type, type));
    }

    if (categoryId) {
        where.push(eq(products.categoryId, categoryId));
    }

    const [result, [{ count }]] = await Promise.all([
        db
            .select()
            .from(products)
            .where(and(...where))
            .limit(limit)
            .offset((page - 1) * limit),
        db
            .select({ count: sql<number>`count(*)::int` })
            .from(products)
            .where(and(...where))
    ]);

    return { products: result, total: count, page, pageCount: Math.ceil(count / limit) };
}
