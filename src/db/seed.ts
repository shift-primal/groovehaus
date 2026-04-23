import { faker } from '@faker-js/faker';
import { db } from '.';
import { categories, conditions, products } from './schema';
import { fetchInBatches, slugify, truncateDb } from '#/lib/dbUtils';
import { getAlbumCover, getSpotifyToken } from '#/lib/spotify';
import {
    gearImages,
    guitars,
    midiControllers,
    prices,
    records,
    turntables,
    type Gear,
    type VinylRecord
} from './seedData';

async function seedRecords(records: VinylRecord[], categoryId: number, spotifyToken: string) {
    const values = await fetchInBatches(records, 3, async (r) => {
        const condition = faker.helpers.arrayElement(conditions);
        return {
            name: r.name,
            slug: slugify(r.name),
            artistName: r.artist,
            spotifyAlbumId: r.spotifyAlbumId,
            imageUrl: await getAlbumCover(r.spotifyAlbumId, spotifyToken),
            releaseYear: r.releaseYear,
            type: 'vinyl' as const,
            categoryId,
            price: faker.helpers.arrayElement(prices.vinyl[condition]),
            stock: faker.number.int({ min: 1, max: 20 }),
            condition,
            active: true
        };
    });

    await db.insert(products).values(values);
}

async function seedGear(items: Gear[], categoryId: number) {
    const values = items.map((i) => {
        const condition = faker.helpers.arrayElement(conditions);
        return {
            name: i.name,
            slug: slugify(`${i.manufacturer} ${i.name}`),
            imageUrl: gearImages[i.name],
            manufacturer: i.manufacturer,
            type: 'gear' as const,
            categoryId,
            price: faker.helpers.arrayElement(prices.gear[condition]),
            stock: faker.number.int({ min: 1, max: 10 }),
            condition,
            active: true
        };
    });

    await db.insert(products).values(values);
}

async function seed() {
    // Reset DB for re-seed (dev)
    truncateDb(db);

    const spotifyToken = await getSpotifyToken();

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

    await seedRecords(records, vinylCat.id, spotifyToken);

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
