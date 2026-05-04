import logoText from '#/assets/groovehaus-logo-text.svg?react';

export const footerProps = {
    logo: {
        url: '/',
        icon: undefined,
        text: logoText,
        alt: 'logo',
        title: 'Groovehaus'
    },
    description: 'Din destinasjon for vinyl, gitarer og musikk-utstyr.',
    sections: [
        {
            title: 'Butikk',
            links: [
                { name: 'Vinyl-plater', href: '/products?type=vinyl' },
                { name: 'Gitarer', href: '/products?type=gear&category=guitars' },
                { name: 'Platespillere', href: '/products?type=gear&category=turntables' },
                { name: 'MIDI-kontrollere', href: '/products?type=gear&category=midi-controllers' }
            ]
        },
        {
            title: 'Kundeservice',
            links: [
                { name: 'Frakt & retur', href: '#' },
                { name: 'Kontakt oss', href: '#' },
                { name: 'FAQ', href: '#' }
            ]
        }
    ],
    copyright: '© 2025 Groovehaus. Alle rettigheter forbeholdt.',
    legalLinks: [
        { name: 'Vilkår og betingelser', href: '#' },
        { name: 'Personvernerklæring', href: '#' }
    ],
    maxSections: 4
};
