import type { categories, products } from '#/db/schema';
import type { InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;
export type Category = InferSelectModel<typeof categories>;
