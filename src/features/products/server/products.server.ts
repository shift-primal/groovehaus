import { categories, products } from '#/db/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { db } from '#/db';
import type { GetProductsInput } from './products.schemas';
import { normalizeSearch } from '#/lib/utils';

export async function fetchCategories() {
    return await db.select().from(categories);
}

export async function fetchProductBySlug(slug: string) {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product ?? null;
}

export async function fetchProductsSearch(input: GetProductsInput) {
    const { search, type, categoryId, condition, page, limit } = input;
    const where = [eq(products.active, true)];

    if (search) {
        const tsQuery = normalizeSearch(search)
            .trim()
            .split(/\s+/)
            .map((w) => `${w}:*`)
            .join(' & ');
        where.push(sql`${products.productSearch} @@ to_tsquery('simple', ${tsQuery})`);
    }

    if (type) {
        where.push(eq(products.type, type));
    }

    if (categoryId) {
        where.push(eq(products.categoryId, categoryId));
    }

    if (condition && condition.length > 0) {
        where.push(inArray(products.condition, condition));
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
