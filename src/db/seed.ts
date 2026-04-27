import { faker } from '@faker-js/faker';
import { db } from '.';
import { categories, conditions, products } from './schema';
import { truncateDb } from '#/lib/dbUtils';
import { fetchInBatches, slugify } from '#/lib/utils';
import { getAlbumData, getSpotifyToken } from '#/lib/spotify';
import { guitars, midiControllers, turntables, type Gear } from './seedData.gear';
import { albumIds } from '#/db/seedData.albums';
import { prices } from '#/db/seedData.general';

async function seedRecords(albumIds: string[], categoryId: number, spotifyToken: string) {
    const values = await fetchInBatches(albumIds, 3, async (r) => {
        const album = await getAlbumData(r, spotifyToken);
        const condition = faker.helpers.arrayElement(conditions);

        return {
            name: album.name,
            slug: slugify(album.name),
            artistName: album.artist,
            spotifyAlbumId: album.spotifyAlbumId,
            imageUrl: album.imageUrl,
            releaseYear: album.releaseYear,
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
            imageUrl: i.imageUrl,
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
    await truncateDb(db);

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

    await seedRecords(Object.values(albumIds), vinylCat.id, spotifyToken);

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
