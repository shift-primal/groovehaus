import { ORDER_STATUSES, PRODUCT_CONDITIONS, PRODUCT_TYPES } from '#/config/products';
import type { Rating } from '#/types/DbTypes';
import { sql, type InferSelectModel, type SQL } from 'drizzle-orm';
import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
    customType,
    index,
    unique
} from 'drizzle-orm/pg-core';

const tsvector = customType<{ data: string }>({
    dataType() {
        return 'tsvector';
    }
});

export const productTypeEnum = pgEnum('product_type', PRODUCT_TYPES);
export const conditionEnum = pgEnum('condition', PRODUCT_CONDITIONS);
export const orderStatusEnum = pgEnum('order_status', ORDER_STATUSES);

export const categories = pgTable('categories', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 100 }).unique().notNull(),
    type: productTypeEnum('type')
});

export const products = pgTable(
    'products',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 255 }).notNull(),
        slug: varchar('slug', { length: 255 }).unique().notNull(),
        type: productTypeEnum('type'),
        price: integer('price').notNull(),
        stock: integer('stock').notNull(),
        condition: conditionEnum('condition'),
        categoryId: integer('category_id').references(() => categories.id),
        imageUrl: text('image_url'),
        rating: jsonb('rating').$type<Rating>(),
        active: boolean('active').default(true),
        createdAt: timestamp('created_at').defaultNow(),

        // Gear Specific
        manufacturer: varchar('manufacturer', { length: 255 }),

        // Vinyl specific
        artistName: varchar('artist_name', { length: 255 }),
        spotifyAlbumId: varchar('spotify_album_id', { length: 255 }),
        releaseYear: integer('release_year'),

        productSearch: tsvector('product_search')
            .notNull()
            .generatedAlwaysAs(
                (): SQL => sql`
			to_tsvector('simple', f_unaccent(regexp_replace(
				coalesce(${products.name}, '') || ' ' ||
				coalesce(${products.artistName}, '') || ' ' ||
				coalesce(${products.manufacturer}, ''),
				'\\$', 's', 'g'
			)))`
            )
    },
    (t) => [index('idx_product_search').using('gin', t.productSearch)]
);

export const carts = pgTable('carts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const cartItems = pgTable(
    'cart_items',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        cartId: uuid('cart_id')
            .references(() => carts.id)
            .notNull(),
        productId: uuid('product_id')
            .references(() => products.id)
            .notNull(),
        quantity: integer('quantity').notNull().default(1),
        createdAt: timestamp('created_at').defaultNow()
    },
    (t) => [unique().on(t.cartId, t.productId)]
);

export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    status: orderStatusEnum('order_status'),
    totalAmount: integer('total_amount').notNull(),
    stripePaymentIntentId: varchar('stripe_payment_id', { length: 255 }),
    shippingName: varchar('shipping_name', { length: 255 }),
    shippingEmail: varchar('shipping_email', { length: 255 }),
    shippingAddress: jsonb('shipping_address'),
    createdAt: timestamp('created_at').defaultNow()
});

export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => orders.id),
    productId: uuid('product_id').references(() => products.id),
    productName: varchar('product_name', { length: 255 }),
    unitPrice: integer('unit_price').notNull(),
    quantity: integer('quantity').notNull(),
    imageUrl: text('image_url')
});

export type Product = InferSelectModel<typeof products>;
