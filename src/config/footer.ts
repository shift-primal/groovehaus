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
                { title: 'Vinyl-plater', url: '/products?category=vinyl-records' },
                { title: 'Gitarer', url: '/products?category=guitars' },
                { title: 'Platespillere', url: '/products?category=turntables' },
                { title: 'MIDI-kontrollere', url: '/products?category=midi-controllers' }
            ]
        },
        {
            title: 'Kundeservice',
            links: [
                { title: 'Frakt & retur', url: '/shipping-and-returns' },
                { title: 'Kontakt oss', url: '/kontakt' },
                { title: 'FAQ', url: '/faq' }
            ]
        }
    ],
    copyright: '© 2025 Groovehaus. Alle rettigheter forbeholdt.',
    legalLinks: [
        { title: 'Vilkår og betingelser', url: '/terms-of-service' },
        { title: 'Personvernerklæring', url: '/privacy' }
    ],
    maxSections: 4
};
