import { categories, products } from '#/db/schema';
import { and, between, eq, inArray, sql, gte, lte, asc, desc } from 'drizzle-orm';
import { db } from '#/db';
import type { GetProductsInput } from './products.schemas';
import { normalizeSearch } from '#/lib/utils';

export async function fetchProductBySlug(slug: string) {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product ?? null;
}

export async function fetchProductsSearch(input: GetProductsInput) {
    const { search, type, category, minPrice, maxPrice, condition, page, limit, sortBy, sortDir } =
        input;

    const columnMap = {
        createdAt: products.createdAt,
        name: products.name,
        price: products.price,
        rating: products.rating
    };

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

    if (category) {
        where.push(
            eq(
                products.categoryId,
                db
                    .select({ id: categories.id })
                    .from(categories)
                    .where(eq(categories.slug, category))
            )
        );
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
        where.push(between(products.price, minPrice, maxPrice));
    } else if (minPrice !== undefined) {
        where.push(gte(products.price, minPrice));
    } else if (maxPrice !== undefined) {
        where.push(lte(products.price, maxPrice));
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
            .offset((page - 1) * limit)
            .orderBy(sortDir === 'desc' ? desc(columnMap[sortBy]) : asc(columnMap[sortBy])),
        db
            .select({ count: sql<number>`count(*)::int` })
            .from(products)
            .where(and(...where))
    ]);

    return { products: result, total: count, page, pageCount: Math.ceil(count / limit) };
}
