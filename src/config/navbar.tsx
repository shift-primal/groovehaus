import {
    Disc3,
    Guitar,
    HelpCircle,
    KeyboardMusic,
    Mail,
    Package,
    Truck,
    Turntable
} from 'lucide-react';

import logoIcon from '#/assets/groovehaus-logo-icon.svg?react';
import logoText from '#/assets/groovehaus-logo-text.svg?react';

export const navBarProps = {
    logo: {
        url: '/',
        icon: logoIcon,
        text: logoText,
        alt: 'logo',
        title: 'Groovehaus'
    },
    menu: [
        { title: 'Hjem', url: '/' },
        {
            title: 'Produkter',
            accordion: true,
            items: [
                {
                    title: 'Alle',
                    description: 'Bla gjennom hele vårt sortiment',
                    icon: <Package className="size-5 shrink-0" />,
                    url: '/products'
                },
                {
                    title: 'Vinyl-plater',
                    description: 'Nye og brukte plater fra ulike sjangre',
                    icon: <Disc3 className="size-5 shrink-0" />,
                    url: '/products?category=vinyl-records'
                },
                {
                    title: 'Gitarer',
                    description: 'Elektriske og akustiske gitarer for alle nivåer',
                    icon: <Guitar className="size-5 shrink-0" />,
                    url: '/products?category=guitars'
                },
                {
                    title: 'Platespillere',
                    description: 'Platespillere for vinyl-entusiaster',
                    icon: <Turntable className="size-5 shrink-0" />,
                    url: '/products?category=turntables'
                },
                {
                    title: 'MIDI-kontrollere',
                    description: 'Kontrollere for musikk-produksjon og live bruk',
                    icon: <KeyboardMusic className="size-5 shrink-0" />,
                    url: '/products?category=midi-controllers'
                }
            ]
        },
        {
            title: 'Kundeservice',
            accordion: true,
            items: [
                {
                    title: 'Kontakt oss',
                    description: 'Send oss en melding, vi svarer raskt',
                    icon: <Mail className="size-5 shrink-0" />,
                    url: '/kontakt'
                },
                {
                    title: 'Frakt & retur',
                    description: 'Leveringstid, kostnader og returpolitikk',
                    icon: <Truck className="size-5 shrink-0" />,
                    url: '/shipping-and-returns'
                },
                {
                    title: 'FAQ',
                    description: 'Svar på de vanligste spørsmålene',
                    icon: <HelpCircle className="size-5 shrink-0" />,
                    url: '/faq'
                }
            ]
        },

        {
            title: 'Info',
            accordion: false,
            items: [
                { title: 'Om oss', url: '/about' },
                { title: 'Vilkår', url: '/terms-of-service' },
                { title: 'Personvern', url: '/privacy' }
            ]
        }
    ],
    auth: {
        login: { title: 'Logg inn', url: '/auth/sign-in' },
        signup: { title: 'Registrer deg', url: '/auth/sign-up' }
    }
};
