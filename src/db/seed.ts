import { faker } from '@faker-js/faker';
import { db } from '.';
import { categories, conditions, products } from './schema';
import { priceRange, slugify } from '#/lib/dbUtils';
import { sql } from 'drizzle-orm';

// Reset DB for re-seed (dev)
await db.execute(
    sql`TRUNCATE categories, products, carts, cart_items, orders, order_items RESTART IDENTITY CASCADE`
);

type Record = {
    name: string;
    artist: string;
    releaseYear: number;
};

type Gear = {
    name: string;
    manufacturer: string;
};

const records: Record[] = [
    {
        name: 'New World Depression',
        artist: '$uicideboy$',
        releaseYear: 2024
    },
    {
        name: 'Thy Kingdom Come',
        artist: '$uicideboy$',
        releaseYear: 2025
    },
    {
        name: 'I Want To Die In New Orleans',
        artist: '$uicideboy$',
        releaseYear: 2018
    },
    {
        name: 'Everybody',
        artist: 'Logic',
        releaseYear: 2017
    },
    {
        name: 'HYPERunPOPULAR',
        artist: 'Kaos Kapell',
        releaseYear: 2024
    },
    {
        name: 'coping strategies to combat the algorithm [vol. 7]',
        artist: 'DUCKBOY',
        releaseYear: 2025
    },
    {
        name: 'Post Human: Nex Gen',
        artist: 'Bring Me the Horizon',
        releaseYear: 2024
    }
];

const guitars: Gear[] = [
    { name: 'RG320EXZ-BKF', manufacturer: 'Ibanez' },
    { name: 'Superb J44 SB', manufacturer: 'Santana' },
    { name: 'Sonic Telecaster Laurel', manufacturer: 'Squier' },
    { name: 'Am Vtg II 1961 Stratocaster', manufacturer: 'Fender' },
    { name: 'Les Paul Modern Studio', manufacturer: 'Gibson' },
    { name: 'XJ-1 Hardtail', manufacturer: 'LTD' }
];

const turntables: Gear[] = [
    { name: 'TT-3 Plus', manufacturer: 'Argon Audio' },
    { name: 'DP-300F', manufacturer: 'Denon' },
    { name: 'PRO T1', manufacturer: 'Vestlyd' },
    { name: 'DP-450USB', manufacturer: 'Denon' }
];

const midiControllers: Gear[] = [
    {
        name: 'KeyStep 37 MK2',
        manufacturer: 'Arturia'
    },
    {
        name: 'Launchkey 49 MK4',
        manufacturer: 'Novation'
    },
    {
        name: 'FLKEY 61',
        manufacturer: 'Novation'
    },
    {
        name: 'nanoKEY Studio',
        manufacturer: 'Korg'
    },
    {
        name: 'Xkey 37 LE',
        manufacturer: 'CME'
    }
];

const prices = {
    vinyl: {
        new: priceRange(599, 1049),
        used_mint: priceRange(449, 849),
        used_good: priceRange(299, 649),
        used_fair: priceRange(149, 449),
        used_bad: priceRange(99, 499)
    },
    gear: {
        new: priceRange(999, 14999),
        used_mint: priceRange(799, 11999),
        used_good: priceRange(599, 8999),
        used_fair: priceRange(499, 5999),
        used_bad: priceRange(499, 4999)
    }
};

async function seedRecords(records: Record[], categoryId: number) {
    await db.insert(products).values(
        records.map((r) => {
            const condition = faker.helpers.arrayElement(conditions);
            return {
                name: r.name,
                slug: slugify(r.name),
                artistName: r.artist,
                releaseYear: r.releaseYear,
                type: 'vinyl' as const,
                categoryId,
                price: faker.helpers.arrayElement(prices.vinyl[condition]),
                stock: faker.number.int({ min: 1, max: 20 }),
                condition,
                active: true
            };
        })
    );
}

async function seedGear(items: Gear[], categoryId: number) {
    await db.insert(products).values(
        items.map((i) => {
            const condition = faker.helpers.arrayElement(conditions);
            return {
                name: i.name,
                slug: slugify(`${i.manufacturer} ${i.name}`),
                manufacturer: i.manufacturer,
                type: 'gear' as const,
                categoryId,
                price: faker.helpers.arrayElement(prices.gear[condition]),
                stock: faker.number.int({ min: 1, max: 10 }),
                condition,
                active: true
            };
        })
    );
}

async function seed() {
    const insertedCategories = await db
        .insert(categories)
        .values([
            { name: 'Vinyl Records', slug: 'vinyl-records', type: 'vinyl' },
            { name: 'Guitars', slug: 'guitars', type: 'gear' },
            { name: 'Turntables', slug: 'turntables', type: 'gear' },
            { name: 'MIDI-controllers', slug: 'midi-controllers', type: 'gear' }
        ])
        .returning();

    const vinylCat = insertedCategories.find((c) => c.slug === 'vinyl-records')!;
    const guitarCat = insertedCategories.find((c) => c.slug === 'guitars')!;
    const turntableCat = insertedCategories.find((c) => c.slug === 'turntables')!;
    const midiCat = insertedCategories.find((c) => c.slug === 'midi-controllers')!;

    await seedRecords(records, vinylCat.id);

    await seedGear(guitars, guitarCat.id);
    await seedGear(turntables, turntableCat.id);
    await seedGear(midiControllers, midiCat.id);
}

seed()
    .then(() => {
        console.log('Database seeded successfully');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
