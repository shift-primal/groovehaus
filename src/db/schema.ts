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
    index
} from 'drizzle-orm/pg-core';

const tsvector = customType<{ data: string }>({
    dataType() {
        return 'tsvector';
    }
});

export const productTypes = ['vinyl', 'gear'] as const;
export const conditions = ['new', 'used_mint', 'used_good', 'used_fair', 'used_bad'] as const;
export const orderStatuses = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
] as const;

export const productTypeEnum = pgEnum('product_type', productTypes);
export const conditionEnum = pgEnum('condition', conditions);
export const orderStatusEnum = pgEnum('order_status', orderStatuses);

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

        // Gear Specific
        manufacturer: varchar('manufacturer', { length: 255 }),

        // Vinyl specific
        artistName: varchar('artist_name', { length: 255 }),
        spotifyAlbumId: varchar('spotify_album_id', { length: 255 }),
        releaseYear: integer('release_year'),

        active: boolean('active').default(true),
        createdAt: timestamp('created_at').defaultNow(),

        productSearch: tsvector('product_search')
            .notNull()
            .generatedAlwaysAs(
                (): SQL =>
                    sql`to_tsvector('english', coalesce(${products.name}, '') || ' ' || coalesce(${products.artistName}, '') || ' ' || coalesce(${products.manufacturer}, '') || ' ')`
            )
    },
    (t) => [index('idx_product_search').using('gin', t.productSearch)]
);

export const carts = pgTable('carts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const cartItems = pgTable('cart_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    cartId: uuid('cart_id')
        .references(() => carts.id)
        .notNull(),
    productId: uuid('product_id')
        .references(() => products.id)
        .notNull(),
    quantity: integer('quantity').notNull().default(1)
});

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
