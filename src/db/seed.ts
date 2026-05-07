import { faker } from '@faker-js/faker';
import { db } from '.';
import { categories, products } from './schema';
import { getFakeRating, truncateDb } from '#/lib/dbUtils';
import { fetchInBatches, slugify } from '#/lib/utils';
import { getAlbumData, getSpotifyToken } from '#/lib/spotify';
import { guitars, midiControllers, turntables, type Gear } from './seedData.gear';
import { albumIds } from '#/db/seedData.albums';
import { prices } from '#/db/seedData.general';
import { CATEGORIES, PRODUCT_CONDITIONS } from '#/config/products';

async function seedRecords(albumIds: string[], categoryId: number, spotifyToken: string) {
    const values = await fetchInBatches(albumIds, 3, async (r) => {
        const album = await getAlbumData(r, spotifyToken);
        const condition = faker.helpers.arrayElement(PRODUCT_CONDITIONS);

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
            stock: faker.number.int({ min: 0, max: 20 }),
            condition,
            active: true,
            rating: getFakeRating({
                minRating: 2.5,
                maxRating: 5,
                minReviewers: 500,
                maxReviewers: 9999
            })
        };
    });

    await db.insert(products).values(values);
}

async function seedGear(items: Gear[], categoryId: number) {
    const values = items.map((i) => {
        const condition = faker.helpers.arrayElement(PRODUCT_CONDITIONS);
        return {
            name: i.name,
            slug: slugify(`${i.manufacturer} ${i.name}`),
            imageUrl: i.imageUrl,
            manufacturer: i.manufacturer,
            type: 'gear' as const,
            categoryId,
            price: faker.helpers.arrayElement(prices.gear[condition]),
            stock: faker.number.int({ min: 0, max: 10 }),
            condition,
            active: true,
            rating: getFakeRating({
                minRating: 2.5,
                maxRating: 5,
                minReviewers: 500,
                maxReviewers: 9999
            })
        };
    });

    await db.insert(products).values(values);
}

async function seed() {
    await truncateDb(db);

    const spotifyToken = await getSpotifyToken();

    const insertedCategories = await db
        .insert(categories)
        .values(CATEGORIES.map((c) => ({ ...c, type: c.type as 'vinyl' | 'gear' })))
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
