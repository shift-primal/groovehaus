import { priceRange } from '#/lib/dbUtils';

export type VinylRecord = {
    name: string;
    artist: string;
    releaseYear: number;
    spotifyAlbumId: string;
};

export type Gear = {
    name: string;
    manufacturer: string;
};

export const records: VinylRecord[] = [
    {
        name: 'New World Depression',
        artist: '$uicideboy$',
        releaseYear: 2024,
        spotifyAlbumId: '1lKWIQuLHxdlifTuudutTl'
    },
    {
        name: 'Thy Kingdom Come',
        artist: '$uicideboy$',
        releaseYear: 2025,
        spotifyAlbumId: '7HxLze2RiYrM9f2un8HZUp'
    },
    {
        name: 'I Want To Die In New Orleans',
        artist: '$uicideboy$',
        releaseYear: 2018,
        spotifyAlbumId: '2ivOxIKDHxEo6WMD9m3ytn'
    },
    {
        name: 'Everybody',
        artist: 'Logic',
        releaseYear: 2017,
        spotifyAlbumId: '1HiN2YXZcc3EjmVZ4WjfBk'
    },
    {
        name: 'HYPERunPOPULAR',
        artist: 'Kaos Kapell',
        releaseYear: 2024,
        spotifyAlbumId: '3WO6pijPNIjopdNvBHlXFU'
    },
    {
        name: 'coping strategies to combat the algorithm [vol. 7]',
        artist: 'DUCKBOY',
        releaseYear: 2025,
        spotifyAlbumId: '0FXRIMbMyfu5Kz7A44Jx2O'
    },
    {
        name: 'Post Human: Nex Gen',
        artist: 'Bring Me the Horizon',
        releaseYear: 2024,
        spotifyAlbumId: '1k7OXnGQPV4zF3seDwRroD'
    }
];

export const guitars: Gear[] = [
    { name: 'RG320EXZ-BKF', manufacturer: 'Ibanez' },
    { name: 'Superb J44 SB', manufacturer: 'Santana' },
    { name: 'Sonic Telecaster Laurel', manufacturer: 'Squier' },
    { name: 'Am Vtg II 1961 Stratocaster', manufacturer: 'Fender' },
    { name: 'Les Paul Modern Studio', manufacturer: 'Gibson' },
    { name: 'XJ-1 Hardtail', manufacturer: 'LTD' }
];

export const turntables: Gear[] = [
    { name: 'TT-3 Plus', manufacturer: 'Argon Audio' },
    { name: 'DP-300F', manufacturer: 'Denon' },
    { name: 'PRO T1', manufacturer: 'Vestlyd' },
    { name: 'DP-450USB', manufacturer: 'Denon' }
];

export const midiControllers: Gear[] = [
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

export const prices = {
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

export const gearImages: Record<string, string> = {
    'RG320EXZ-BKF': 'https://r2.gear4music.com/media/62/629596/1200/preview.jpg',
    'Superb J44 SB': 'https://shop79671.sfstatic.io/upload_dir/shop/san-su-j44-sb-1.webp',
    'Sonic Telecaster Laurel':
        'https://evenstadmusikk.no/Media/Cache/Images/3/8/WEB_Image_Squier_Sonic_Telecaster__Laurel_White_Pi_11848461813132767_plid_397288.webp',
    'Am Vtg II 1961 Stratocaster':
        'https://evenstadmusikk.no/Media/Cache/Images/3/9/WEB_Image_Fender_Am_Vtg_II_1961_Stratocaster_Olymp_1175307-1029696120_plid_367489.webp',
    'Les Paul Modern Studio':
        'https://www.4sound.no/images/thumbs/0194921_gibson-electrics-les-paul-modern-studio-worn-white_625.png',
    'XJ-1 Hardtail':
        'https://evenstadmusikk.no/Media/Cache/Images/4/3/WEB_Image_LTD_XJ-1_Hardtail_Black_Blast__1196582-297113497_plid_434083.webp',
    'TT-3 Plus':
        'https://argonaudio.com/cdn/shop/files/ARGTT3PLUSBK_O_01.jpg?v=1727357705&width=800',
    'DP-300F':
        'https://www.denon.com/dw/image/v2/BGJH_PRD/on/demandware.static/-/Sites-master-catalog-soundunited/default/dw3ad6cff0/denon/PDP_images/Turntables/DP-300F-Black/DP-300F-Black_front-side.png?sw=1280',
    'PRO T1':
        'https://images.hifiklubben.com/image/ea460cdd-dd94-40a8-ae66-f4ecb2baba9c/yuge/vestprot1.jpg',
    'DP-450USB':
        'https://images.hifiklubben.com/image/b1d8ba2e-0198-45ad-acae-dd4609530222/yuge/dendp450.jpg',
    'KeyStep 37 MK2':
        'https://www.emnordic.no/storage/DF1344AFB63893F5F08B25789FD56C482E50EE8CC96B00E318E655A722A4D525/c7aab962b7cc4f21bd03df22e05d5c8c/800-800-0-jpg.Jpeg/media/7f8a37c0592d4684b294ba9f38ec1ee0/2404329%20KEYSTEP_37mk2_WHITE__LEFT.jpeg',
    'Launchkey 49 MK4':
        'https://www.4sound.no/images/thumbs/0194048_novation-launchkey-49-mk4_625.png',
    'FLKEY 61': 'https://r2.gear4music.com/media/95/956436/1200/preview.jpg',
    'nanoKEY Studio':
        'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_37/379581/11383194_800.jpg',
    'Xkey 37 LE':
        'https://evenstadmusikk.no/Media/Cache/Images/3/2/WEB_Image_CME_Xkey_37_LE__11771541534180566_plid_373082.webp'
};
